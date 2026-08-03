CREATE TABLE IF NOT EXISTS agents (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  external_id TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT,
  price NUMERIC,
  bedrooms NUMERIC,
  bathrooms NUMERIC,
  sqft INTEGER,
  year_built INTEGER,
  property_type TEXT,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  description TEXT,
  image_url TEXT,
  listed_date TIMESTAMPTZ,
  days_on_market INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS consultations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  meeting_type TEXT NOT NULL,
  property_type TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Single-row table tracking RentCast API usage so syncs can never exceed the
-- free-tier monthly budget and start incurring $0.20/request overage charges.
CREATE TABLE IF NOT EXISTS sync_state (
  id INTEGER PRIMARY KEY DEFAULT 1,
  last_synced_at TIMESTAMPTZ,
  month_start DATE,
  requests_this_month INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT sync_state_single_row CHECK (id = 1)
);
