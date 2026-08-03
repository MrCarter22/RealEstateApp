const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, date, time, meetingType, propertyType, message } = req.body;
  if (!name || !email || !date || !time || !meetingType || !propertyType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { rows } = await db.query(
    `INSERT INTO consultations (name, email, phone, date, time, meeting_type, property_type, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, email, phone || null, date, time, meetingType, propertyType, message || null]
  );

  res.status(201).json(rows[0]);
});

router.get('/', requireAuth, async (req, res) => {
  const { rows } = await db.query('SELECT * FROM consultations ORDER BY created_at DESC');
  res.json(rows);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { rowCount } = await db.query('DELETE FROM consultations WHERE id = $1', [req.params.id]);
  if (rowCount === 0) {
    return res.status(404).json({ error: 'Consultation not found' });
  }
  res.status(204).end();
});

module.exports = router;
