const { Pool } = require('pg');

// max: 1 is Neon's recommendation for serverless environments (e.g. Vercel functions),
// where each cold start can otherwise open its own connection and exhaust the DB's limit.
// Use Neon's pooled ("-pooler") connection string in production so this stays cheap.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
