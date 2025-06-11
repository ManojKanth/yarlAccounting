import './VatCalculator.css';
import { useState } from 'react';

export default function VatCalculator() {
  const [amount, setAmount] = useState('');
  const [vat, setVat] = useState(null);
  const [type, setType] = useState('add');
  // Sri Lanka VAT: 18% (2024)
  function calculate() {
    let val = parseFloat(amount);
    if (isNaN(val) || val < 0) return setVat(null);
    if (type === 'add') {
      setVat((val * 0.18).toFixed(2));
    } else {
      setVat((val - (val / 1.18)).toFixed(2));
    }
  }
  return (
    <div className="vat-calc">
      <h2>VAT Calculator (Sri Lanka)</h2>
      <div className="vat-form">
        <label>Amount (LKR):
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 10000" />
        </label>
        <div className="vat-type">
          <label>
            <input type="radio" name="type" value="add" checked={type === 'add'} onChange={() => setType('add')} />
            Add VAT (Net → Gross)
          </label>
          <label>
            <input type="radio" name="type" value="remove" checked={type === 'remove'} onChange={() => setType('remove')} />
            Remove VAT (Gross → Net)
          </label>
        </div>
        <button onClick={calculate}>Calculate</button>
        {vat !== null && (
          <div className="vat-result">
            {type === 'add' ? (
              <>
                VAT Amount: <b>LKR {vat}</b><br />
                Gross Total: <b>LKR {(parseFloat(amount) + parseFloat(vat)).toFixed(2)}</b>
              </>
            ) : (
              <>
                VAT Portion: <b>LKR {vat}</b><br />
                Net Amount: <b>LKR {(parseFloat(amount) - parseFloat(vat)).toFixed(2)}</b>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
