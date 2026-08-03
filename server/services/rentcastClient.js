const BASE_URL = 'https://api.rentcast.io/v1';

async function request(endpoint, params) {
  const apiKey = process.env.RENTCAST_API_KEY;
  if (!apiKey) {
    throw new Error('RENTCAST_API_KEY is not set in server/.env');
  }

  const url = new URL(BASE_URL + endpoint);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    headers: { 'X-Api-Key': apiKey },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`RentCast request failed (${response.status}): ${body}`);
  }

  return response.json();
}

function fetchSaleListings({ city, state, limit = 200 }) {
  return request('/listings/sale', { city, state, status: 'Active', limit });
}

function fetchRentalListings({ city, state, limit = 200 }) {
  return request('/listings/rental/long-term', { city, state, status: 'Active', limit });
}

module.exports = { fetchSaleListings, fetchRentalListings };
