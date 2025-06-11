// server/index.js
// Node.js/Express backend for Yarl Accounting

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Yarl Accounting backend is running');
});

// Company name search (mock integration)
app.get('/api/company-search', async (req, res) => {
  const { name } = req.query;
  // TODO: Integrate with real Sri Lanka registry API
  // For now, mock: if name is 'example', found; else not found
  if (name && name.toLowerCase() === 'example') {
    res.json({ found: true });
  } else {
    res.json({ found: false });
  }
});

// Company registration (mock integration)
app.post('/api/register-company', async (req, res) => {
  const { companyName, name, email } = req.body;
  // TODO: Integrate with real registration API or email service
  if (companyName && name && email) {
    // Simulate success
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Missing fields' });
  }
});

// Currency rates endpoint (proxy to exchangerate-api)
app.get('/api/currency-rates', async (req, res) => {
  try {
    // Replace with your real API key if needed
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/LKR';
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json({ rates: {
      USD: data.rates.USD,
      EUR: data.rates.EUR,
      INR: data.rates.INR
    }});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch currency rates' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
