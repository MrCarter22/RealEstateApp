const express = require('express');
const propertyService = require('../services/propertyService');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const properties = await propertyService.getAll();
  res.json(properties);
});

router.get('/:id', async (req, res) => {
  const property = await propertyService.getById(req.params.id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  res.json(property);
});

router.post('/sync', requireAuth, async (req, res) => {
  try {
    const count = await propertyService.syncFromProvider();
    res.json({ synced: count });
  } catch (err) {
    const isGuardBlock = err.message.includes('Sync ran recently') || err.message.includes('budget reached');
    res.status(isGuardBlock ? 429 : 502).json({ error: err.message });
  }
});

module.exports = router;
