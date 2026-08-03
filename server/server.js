require('dotenv').config();
const express = require('express');
const cors = require('cors');

const propertiesRouter = require('./routes/properties');
const leadsRouter = require('./routes/leads');
const consultationsRouter = require('./routes/consultations');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/properties', propertiesRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/consultations', consultationsRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(port, () => console.log(`API listening on port ${port}`));
}

module.exports = app;
