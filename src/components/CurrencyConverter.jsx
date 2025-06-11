import { useEffect, useState } from 'react';
import './CurrencyConverter.css';

export default function CurrencyConverter() {
  const [rates, setRates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/currency-rates')
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(() => setError('Failed to fetch rates'));
  }, []);

  return (
    <section className="currency-converter">
      <h2>Live Currency Conversion</h2>
      {error && <p>{error}</p>}
      {rates ? (
        <ul>
          <li>1 LKR = {rates.USD} USD</li>
          <li>1 LKR = {rates.EUR} EUR</li>
          <li>1 LKR = {rates.INR} INR</li>
        </ul>
      ) : !error && <p>Loading rates...</p>}
    </section>
  );
}
