const db = require('../db');
const rentcastClient = require('./rentcastClient');

const GREATER_HOUSTON_CITIES = [
  { city: 'Houston', state: 'TX' },
  { city: 'Katy', state: 'TX' },
  { city: 'Sugar Land', state: 'TX' },
  { city: 'The Woodlands', state: 'TX' },
  { city: 'Pearland', state: 'TX' },
];

const REQUESTS_PER_SYNC = GREATER_HOUSTON_CITIES.length * 2; // sale + rental per city
// RentCast's free tier is 50 requests/month before $0.20/request overage billing kicks in.
// Stay under a conservative budget and enforce a cooldown so a bug or accidental
// double-trigger can never rack up real charges.
const MONTHLY_REQUEST_BUDGET = 45;
const SYNC_COOLDOWN_HOURS = 20;

async function getSyncState() {
  const { rows } = await db.query(
    `INSERT INTO sync_state (id) VALUES (1) ON CONFLICT (id) DO NOTHING`
  );
  const { rows: current } = await db.query('SELECT * FROM sync_state WHERE id = 1');
  return current[0];
}

async function assertSyncAllowed() {
  const state = await getSyncState();
  const now = new Date();

  if (state.last_synced_at) {
    const hoursSinceLastSync = (now - new Date(state.last_synced_at)) / (1000 * 60 * 60);
    if (hoursSinceLastSync < SYNC_COOLDOWN_HOURS) {
      const hoursLeft = (SYNC_COOLDOWN_HOURS - hoursSinceLastSync).toFixed(1);
      throw new Error(`Sync ran recently. Try again in ${hoursLeft}h to conserve RentCast quota.`);
    }
  }

  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const isNewMonth = state.month_start?.toISOString?.().slice(0, 10) !== currentMonthStart;
  const requestsUsed = isNewMonth ? 0 : state.requests_this_month;

  if (requestsUsed + REQUESTS_PER_SYNC > MONTHLY_REQUEST_BUDGET) {
    throw new Error(
      `Monthly RentCast budget reached (${requestsUsed}/${MONTHLY_REQUEST_BUDGET} used). Sync blocked to avoid overage charges.`
    );
  }

  return { currentMonthStart, requestsUsed };
}

async function recordSync(currentMonthStart, requestsUsed) {
  await db.query(
    `UPDATE sync_state
     SET last_synced_at = now(), month_start = $1, requests_this_month = $2
     WHERE id = 1`,
    [currentMonthStart, requestsUsed + REQUESTS_PER_SYNC]
  );
}

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600',
];

function pickPlaceholderImage(externalId) {
  let hash = 0;
  for (let i = 0; i < externalId.length; i++) {
    hash = (hash * 31 + externalId.charCodeAt(i)) >>> 0;
  }
  return PLACEHOLDER_IMAGES[hash % PLACEHOLDER_IMAGES.length];
}

function normalizeListing(raw, listingType) {
  const streetAddress = raw.formattedAddress.split(',')[0].trim();
  const description = `${raw.bedrooms}-bed, ${raw.bathrooms}-bath ${
    (raw.propertyType || 'home').toLowerCase()
  } in ${raw.city}, ${raw.state}${raw.squareFootage ? ` — ${raw.squareFootage.toLocaleString()} sqft` : ''}.`;

  return {
    external_id: raw.id,
    address: streetAddress,
    city: raw.city,
    state: raw.state,
    zip: raw.zipCode || null,
    price: raw.price ?? null,
    bedrooms: raw.bedrooms ?? null,
    bathrooms: raw.bathrooms ?? null,
    sqft: raw.squareFootage ?? null,
    year_built: raw.yearBuilt ?? null,
    property_type: raw.propertyType || null,
    listing_type: listingType,
    description,
    image_url: pickPlaceholderImage(raw.id),
    listed_date: raw.listedDate || null,
    days_on_market: raw.daysOnMarket ?? null,
  };
}

async function upsertProperty(row) {
  await db.query(
    `INSERT INTO properties (
       external_id, address, city, state, zip, price, bedrooms, bathrooms,
       sqft, year_built, property_type, listing_type, description, image_url,
       listed_date, days_on_market, updated_at
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, now())
     ON CONFLICT (external_id) DO UPDATE SET
       address = EXCLUDED.address,
       city = EXCLUDED.city,
       state = EXCLUDED.state,
       zip = EXCLUDED.zip,
       price = EXCLUDED.price,
       bedrooms = EXCLUDED.bedrooms,
       bathrooms = EXCLUDED.bathrooms,
       sqft = EXCLUDED.sqft,
       year_built = EXCLUDED.year_built,
       property_type = EXCLUDED.property_type,
       listing_type = EXCLUDED.listing_type,
       description = EXCLUDED.description,
       image_url = EXCLUDED.image_url,
       listed_date = EXCLUDED.listed_date,
       days_on_market = EXCLUDED.days_on_market,
       updated_at = now()`,
    [
      row.external_id, row.address, row.city, row.state, row.zip, row.price,
      row.bedrooms, row.bathrooms, row.sqft, row.year_built, row.property_type,
      row.listing_type, row.description, row.image_url, row.listed_date, row.days_on_market,
    ]
  );
}

async function syncFromProvider() {
  const { currentMonthStart, requestsUsed } = await assertSyncAllowed();

  let count = 0;

  for (const { city, state } of GREATER_HOUSTON_CITIES) {
    const [saleListings, rentalListings] = await Promise.all([
      rentcastClient.fetchSaleListings({ city, state }),
      rentcastClient.fetchRentalListings({ city, state }),
    ]);

    for (const raw of saleListings) {
      await upsertProperty(normalizeListing(raw, 'sale'));
      count++;
    }
    for (const raw of rentalListings) {
      await upsertProperty(normalizeListing(raw, 'rent'));
      count++;
    }
  }

  await recordSync(currentMonthStart, requestsUsed);

  return count;
}

function toApiShape(row) {
  return {
    id: row.id,
    address: row.address,
    city: `${row.city}, ${row.state}`,
    zip: row.zip,
    description: row.description,
    price: row.price !== null ? Number(row.price) : null,
    bedrooms: row.bedrooms !== null ? Number(row.bedrooms) : null,
    bathrooms: row.bathrooms !== null ? Number(row.bathrooms) : null,
    sqft: row.sqft,
    stories: null,
    garage: null,
    yearBuilt: row.year_built,
    type: row.listing_type,
    image: row.image_url,
    daysOnMarket: row.days_on_market,
  };
}

async function getAll() {
  const { rows } = await db.query('SELECT * FROM properties ORDER BY listed_date DESC NULLS LAST, id DESC');
  return rows.map(toApiShape);
}

async function getById(id) {
  const { rows } = await db.query('SELECT * FROM properties WHERE id = $1', [id]);
  return rows[0] ? toApiShape(rows[0]) : null;
}

module.exports = { syncFromProvider, getAll, getById, normalizeListing };
