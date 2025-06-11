import { useState } from 'react';
import './CompanySearch.css';

export default function CompanySearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [formStatus, setFormStatus] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setShowForm(false);
    try {
      // Call backend API for company search
      const res = await fetch(`/api/company-search?name=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.found) {
        setResult({ found: true, name: query });
        setShowForm(false);
      } else {
        setResult({ found: false, name: query });
        setShowForm(true);
      }
    } catch (err) {
      setError('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setFormStatus(null);
    try {
      const res = await fetch('/api/register-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: query,
          ...formData
        })
      });
      if (res.ok) {
        setFormStatus('Registration request submitted!');
        setFormData({ name: '', email: '' });
      } else {
        setFormStatus('Failed to submit registration.');
      }
    } catch {
      setFormStatus('Failed to submit registration.');
    }
  }

  return (
    <section className="company-search">
      <h2>Company Name Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter company name"
          value={query}
          onChange={e => setQuery(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
      </form>
      {error && <p style={{ color: '#e11d48' }}>{error}</p>}
      {result && result.found && <p>Company "{result.name}" already exists in registry.</p>}
      {result && !result.found && (
        <div>
          <p>Company "{result.name}" not found. You can register with us!</p>
          {showForm && (
            <form onSubmit={handleRegister} className="register-form">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                required
              />
              <button type="submit">Request Registration</button>
              {formStatus && <p>{formStatus}</p>}
            </form>
          )}
        </div>
      )}
    </section>
  );
}
