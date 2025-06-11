import { useState } from 'react';
import './ApitCalculator.css';

const APIT_TABS = [
  { key: 'local', label: 'Local APIT' },
  { key: 'foreign', label: 'Foreign APIT' },
  { key: 'cumulative', label: 'Cumulative APIT' },
  { key: 'bonus', label: 'Bonus APIT' },
];

export default function ApitCalculator() {
  const [tab, setTab] = useState('local');

  return (
    <div className="apit-calc">
      <h2>APIT Calculator (Sri Lanka)</h2>
      <div className="apit-tabs">
        {APIT_TABS.map(t => (
          <button
            key={t.key}
            className={tab === t.key ? 'active' : ''}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="apit-tab-view">
        {tab === 'local' && <LocalApit />}
        {tab === 'foreign' && <ForeignApit />}
        {tab === 'cumulative' && <CumulativeApit />}
        {tab === 'bonus' && <BonusApit />}
      </div>
    </div>
  );
}

function LocalApit() {
  const [income, setIncome] = useState('');
  const [tax, setTax] = useState(null);
  // 2024/25: 0% up to 1.2M, 6% next 500k, 12% next 500k, 18% next 500k, 24% above
  function calculate() {
    let val = parseFloat(income);
    let result = 0;
    if (isNaN(val) || val < 0) return setTax(null);
    let brackets = [1200000, 500000, 500000, 500000];
    let rates = [0, 0.06, 0.12, 0.18, 0.24];
    let left = val;
    for (let i = 0; i < brackets.length; i++) {
      let used = Math.min(left, brackets[i]);
      result += used * rates[i];
      left -= used;
      if (left <= 0) break;
    }
    if (left > 0) result += left * rates[4];
    setTax(result.toFixed(2));
  }
  return (
    <div className="apit-form">
      <label>Annual Employment Income (LKR):
        <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 2500000" />
      </label>
      <button onClick={calculate}>Calculate</button>
      {tax !== null && <div className="apit-result">Estimated APIT: <b>LKR {tax}</b></div>}
    </div>
  );
}

function ForeignApit() {
  const [income, setIncome] = useState('');
  const [tax, setTax] = useState(null);
  // Flat 14% for foreign income
  function calculate() {
    let val = parseFloat(income);
    if (isNaN(val) || val < 0) return setTax(null);
    setTax((val * 0.14).toFixed(2));
  }
  return (
    <div className="apit-form">
      <label>Annual Foreign Employment Income (LKR):
        <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 2000000" />
      </label>
      <button onClick={calculate}>Calculate</button>
      {tax !== null && <div className="apit-result">Estimated Foreign APIT: <b>LKR {tax}</b></div>}
    </div>
  );
}

function CumulativeApit() {
  const [months, setMonths] = useState('');
  const [monthly, setMonthly] = useState('');
  const [tax, setTax] = useState(null);
  const [error, setError] = useState('');
  // Cumulative: sum up monthly income, apply brackets, then show monthly breakdown
  function calculate() {
    setError('');
    let m = parseInt(months);
    let mon = parseFloat(monthly);
    if (isNaN(m) || m < 1) {
      setError('Number of months must be at least 1');
      setTax(null);
      return;
    }
    if (isNaN(mon) || mon < 0) {
      setError('Monthly income must be a positive number');
      setTax(null);
      return;
    }
    let total = m * mon;
    let brackets = [1200000, 500000, 500000, 500000];
    let rates = [0, 0.06, 0.12, 0.18, 0.24];
    let left = total;
    let result = 0;
    for (let i = 0; i < brackets.length; i++) {
      let used = Math.min(left, brackets[i] * (m / 12));
      result += used * rates[i];
      left -= used;
      if (left <= 0) break;
    }
    if (left > 0) result += left * rates[4];
    // Show monthly tax breakdown as in simplebooks
    let monthlyTax = (result / m).toFixed(2);
    setTax({ total: result.toFixed(2), monthly: monthlyTax });
  }
  return (
    <div className="apit-form">
      <label>Number of Months:
        <input type="number" min="1" value={months} onChange={e => setMonths(e.target.value)} placeholder="e.g. 6" />
      </label>
      <label>Monthly Income (LKR):
        <input type="number" min="0" value={monthly} onChange={e => setMonthly(e.target.value)} placeholder="e.g. 200000" />
      </label>
      <button onClick={calculate}>Calculate</button>
      {error && <div style={{color:'#e11d48',marginTop:'0.5em'}}>{error}</div>}
      {tax !== null && (
        <div className="apit-result">
          Total Tax for Period: <b>LKR {tax.total}</b><br />
          Avg. Monthly APIT: <b>LKR {tax.monthly}</b>
        </div>
      )}
    </div>
  );
}

function BonusApit() {
  const [bonus, setBonus] = useState('');
  const [tax, setTax] = useState(null);
  // Bonus: 12% flat (example, adjust as per latest rules)
  function calculate() {
    let val = parseFloat(bonus);
    if (isNaN(val) || val < 0) return setTax(null);
    setTax((val * 0.12).toFixed(2));
  }
  return (
    <div className="apit-form">
      <label>Bonus Amount (LKR):
        <input type="number" value={bonus} onChange={e => setBonus(e.target.value)} placeholder="e.g. 100000" />
      </label>
      <button onClick={calculate}>Calculate</button>
      {tax !== null && <div className="apit-result">Bonus APIT: <b>LKR {tax}</b></div>}
    </div>
  );
}
