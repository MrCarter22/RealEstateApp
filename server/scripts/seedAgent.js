require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../db');

async function seedAgent() {
  const email = process.env.AGENT_EMAIL;
  const password = process.env.AGENT_PASSWORD;

  if (!email || !password) {
    throw new Error('AGENT_EMAIL and AGENT_PASSWORD must be set in server/.env before seeding.');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.query(
    `INSERT INTO agents (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [email, passwordHash]
  );

  console.log(`Agent account ready for ${email}`);
  await db.pool.end();
}

seedAgent().catch((err) => {
  console.error('Seeding agent failed:', err);
  process.exit(1);
});
