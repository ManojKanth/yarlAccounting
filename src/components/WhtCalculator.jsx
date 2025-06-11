import './WhtCalculator.css';
import { useState } from 'react';

const WHT_RATES = [
  { label: 'Interest (2.5%)', value: 0.025 },
  { label: 'Dividend (14%)', value: 0.14 },
  { label: 'Contract Payment (5%)', value: 0.05 },
  { label: 'Rent (10%)', value: 0.10 },
  { label: 'Royalty (14%)', value: 0.14 },
  { label: 'Service Fee (14%)', value: 0.14 },
];

export default function WhtCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(WHT_RATES[0].value);
  const [tax, setTax] = useState(null);
  function calculate() {
    let val = parseFloat(amount);
    if (isNaN(val) || val < 0) return setTax(null);
    setTax((val * rate).toFixed(2));
  }
  return (
    <div className="wht-calc">
      <h2>WHT Calculator (Sri Lanka)</h2>
      <div className="wht-form">
        <label>Payment Amount (LKR):
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 100000" />
        </label>
        <label>WHT Type:
          <select value={rate} onChange={e => setRate(Number(e.target.value))}>
            {WHT_RATES.map(r => (
              <option key={r.label} value={r.value} style={{color: 'black'}}>{r.label}</option>
            ))}
          </select>
        </label>
        <button onClick={calculate}>Calculate</button>
        {tax !== null && (
          <div className="wht-result">
            WHT Amount: <b>LKR {tax}</b>
          </div>
        )}
      </div>
    </div>
  );
}
