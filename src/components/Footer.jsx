import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>Yarl Accounting</h2>
          <p>Empowering Sri Lankan businesses with expert tax, registration, and consulting services. Trusted by hundreds of clients islandwide.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/tax-calculator">Income Tax Calculator</a></li>
            <li><a href="/company-search">Company Name Search</a></li>
            <li><a href="/currency-converter">Currency Conversion</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Connect</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i> Facebook</a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i> Twitter</a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i> LinkedIn</a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i> Instagram</a>
          </div>
        </div>
        <div className="footer-locations">
          <h3>Our Offices</h3>
          <ul>
            <li>Jaffna: 123 Main St, Jaffna</li>
            <li>Colombo: 456 Galle Rd, Colombo</li>
            <li>Kandy: 789 Peradeniya Rd, Kandy</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Yarl Accounting. All rights reserved.
      </div>
    </footer>
  );
}
