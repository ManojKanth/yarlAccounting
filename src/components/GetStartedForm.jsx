import { useState } from 'react';
import './GetStartedForm.css';

export default function GetStartedForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: '',
    language: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.company.trim()) errs.company = 'Company name is required';
    if (!/^([0-9+\- ]{7,})$/.test(form.phone)) errs.phone = 'Valid contact number required';
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Valid email required';
    if (!form.language) errs.language = 'Select a language';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/get-started', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('Thank you! We have received your request.');
        setForm({ firstName: '', lastName: '', company: '', phone: '', email: '', language: '', message: '' });
        setErrors({});
      } else {
        setStatus('Failed to submit. Please try again.');
      }
    } catch {
      setStatus('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="get-started-form-section creative-bg">
      <div className="get-started-form-card">
        <h2 className="get-started-title">
          <span className="brand-accent">Get Started</span> with Yarl Accounting
        </h2>
        <p className="get-started-subtext">Let us help you with tax, registration, and business growth. Fill out the form and our experts will contact you soon!</p>
        <form className="get-started-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label style={{flex:1}}>First Name
              <input type="text" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} required />
              {errors.firstName && <span className="form-error">{errors.firstName}</span>}
            </label>
            <label style={{flex:1, marginLeft:'1em'}}>Last Name
              <input type="text" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} required />
              {errors.lastName && <span className="form-error">{errors.lastName}</span>}
            </label>
          </div>
          <label>Company Name
            <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} required />
            {errors.company && <span className="form-error">{errors.company}</span>}
          </label>
          <label>Contact Number
            <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required pattern="[0-9+\- ]{7,}" />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </label>
          <label>Contact Email
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </label>
          <label>Preferred Language
            <select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} required>
              <option value="">Select</option>
              <option value="English">English</option>
              <option value="Sinhala">Sinhala</option>
              <option value="Tamil">Tamil</option>
            </select>
            {errors.language && <span className="form-error">{errors.language}</span>}
          </label>
          <label>Your Message
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={4} placeholder="How can we help you?" />
            {errors.message && <span className="form-error">{errors.message}</span>}
          </label>
          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          {status && <div className="form-status">{status}</div>}
        </form>
      </div>
    </section>
  );
}
