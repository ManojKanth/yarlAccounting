import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './TopBar.css';
import logo from '../assets/images.png';

export default function TopBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Dismiss drawer if click outside
  function handleOverlayClick(e) {
    if (e.target.classList.contains('drawer-overlay')) {
      setDrawerOpen(false);
    }
  }

  const isMobile = window.innerWidth <= 700;

  return (
    <nav className="topbar">
      <div className="topbar-left" style={{cursor: 'pointer'}} onClick={() => { setDrawerOpen(false); navigate('/'); }}>
        <img src={logo} alt="Yarl Accounting Logo" className="company-logo" />
        <span className="company-name">Yarl Accounting</span>
      </div>
      {isMobile ? (
        <>
          <button className="drawer-toggle" onClick={() => setDrawerOpen(!drawerOpen)}>
            <span className="drawer-icon">☰</span>
          </button>
          {drawerOpen && (
            <div className="drawer-overlay" onClick={handleOverlayClick}>
              <div className="drawer-menu">
                <Link to="/tax-calculator" onClick={() => setDrawerOpen(false)} className={location.pathname === '/tax-calculator' ? 'active' : ''}>Income Tax Calculator</Link>
                <Link to="/company-search" onClick={() => setDrawerOpen(false)} className={location.pathname === '/company-search' ? 'active' : ''}>Company Name Search</Link>
                <Link to="/currency-converter" onClick={() => setDrawerOpen(false)} className={location.pathname === '/currency-converter' ? 'active' : ''}>Live Currency Conversion</Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="topbar-links">
          <Link to="/tax-calculator" className={location.pathname === '/tax-calculator' ? 'active' : ''}>Income Tax Calculator</Link>
          <Link to="/company-search" className={location.pathname === '/company-search' ? 'active' : ''}>Company Name Search</Link>
          <Link to="/currency-converter" className={location.pathname === '/currency-converter' ? 'active' : ''}>Live Currency Conversion</Link>
        </div>
      )}
    </nav>
  );
}
