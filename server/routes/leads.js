const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const { rows } = await db.query(
    `INSERT INTO leads (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, phone || null, message || null]
  );

  res.status(201).json(rows[0]);
});

router.get('/', requireAuth, async (req, res) => {
  const { rows } = await db.query('SELECT * FROM leads ORDER BY created_at DESC');
  res.json(rows);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { rowCount } = await db.query('DELETE FROM leads WHERE id = $1', [req.params.id]);
  if (rowCount === 0) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  res.status(204).end();
});

module.exports = router;
