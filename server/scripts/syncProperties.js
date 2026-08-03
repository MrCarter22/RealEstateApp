require('dotenv').config();
const db = require('../db');
const propertyService = require('../services/propertyService');

propertyService
  .syncFromProvider()
  .then((count) => {
    console.log(`Synced ${count} listings from RentCast.`);
    return db.pool.end();
  })
  .catch((err) => {
    console.error('Property sync failed:', err);
    process.exit(1);
  });
