import { useState } from 'react';
import './TaxCalculator.css';
import VatCalculator from './VatCalculator';
import ApitCalculator from './ApitCalculator';
import WhtCalculator from './WhtCalculator';
import whatsappIcon from '../assets/images.png';
import callIcon from '../assets/images.png';
import emailIcon from '../assets/images.png';

const CALC_OPTIONS = [
  { key: 'vat', label: 'VAT Calculator' },
  { key: 'apit', label: 'APIT Calculator' },
  { key: 'wht', label: 'WHT Calculator' },
];

export default function TaxCalculator() {
  const [selected, setSelected] = useState('vat');

  return (
    <section className="tax-calculator-page">
      <h1>Income Tax Calculators</h1>
      <div className="tax-calc-tabs">
        {CALC_OPTIONS.map(opt => (
          <button
            key={opt.key}
            className={selected === opt.key ? 'active' : ''}
            onClick={() => setSelected(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="tax-calc-view">
        {selected === 'vat' && <VatCalculator />}
        {selected === 'apit' && <ApitCalculator />}
        {selected === 'wht' && <WhtCalculator />}
      </div>
      <div className="expert-assist-grid">
        <h2>Need Expert APIT Assistance?</h2>
        <div className="assist-options">
          <a href="https://wa.me/94XXXXXXXXX" target="_blank" rel="noopener noreferrer">
            <img src={whatsappIcon} alt="WhatsApp" />
            <span>WhatsApp</span>
          </a>
          <a href="tel:+94XXXXXXXXX">
            <img src={callIcon} alt="Call" />
            <span>Call</span>
          </a>
          <a href="mailto:info@yarlaccounting.lk">
            <img src={emailIcon} alt="Email" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}
