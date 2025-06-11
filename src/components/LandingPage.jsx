import './LandingPage.css';
import heroImg from '../assets/images.png'; // Add a creative SVG or PNG to assets
import serviceIcon from '../assets/images.png'; // Add a service icon to assets
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  // Collapsible FAQ state
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: 'How do I register a company?',
      a: 'We handle all paperwork and guide you through the process.'
    },
    {
      q: 'What documents are needed for tax filing?',
      a: 'We’ll provide a checklist and help you gather everything.'
    },
    {
      q: 'How long does company registration take?',
      a: 'Usually 3-5 working days after document submission.'
    },
    {
      q: 'Do you offer business consulting?',
      a: 'Yes, we offer a range of consulting services for new and existing businesses.'
    }
  ];

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (showModal && modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
        navigate('/');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    // Elfsight widget loader (only runs in browser)
    if (!window.elfsightWidgetScriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.onload = () => { window.elfsightWidgetScriptLoaded = true; };
      document.body.appendChild(script);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal, navigate]);

  return (
    <section className="landing-page">
      <header className="hero hero-grid">
        <div className="hero-content">
          <h1>Yarl Accounting</h1>
          <p>Your trusted partner for tax filing & company registration in Sri Lanka</p>
          <button className="get-started-btn" onClick={() => navigate('/get-started')}>Get Started</button>
        </div>
        <div className="hero-img">
          <img src={heroImg} alt="Accounting illustration" />
        </div>
      </header>
      <section className="services large-services">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service-card">
            <img src={serviceIcon} alt="Tax" />
            <div>
              <h3>Income Tax Filing</h3>
              <p>Fast, accurate, and compliant tax filing for individuals and businesses.</p>
            </div>
          </div>
          <div className="service-card">
            <img src={serviceIcon} alt="Company" />
            <div>
              <h3>New Company Registration</h3>
              <p>End-to-end company registration with expert legal and business advice.</p>
            </div>
          </div>
          <div className="service-card">
            <img src={serviceIcon} alt="Consulting" />
            <div>
              <h3>Business Consulting</h3>
              <p>Strategic consulting to help your business grow and stay compliant.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <ul>
          {faqs.map((item, idx) => (
            <li key={idx}>
              <button className="faq-question" onClick={() => setOpen(open === idx ? null : idx)}>
                {item.q}
                <span>{open === idx ? '-' : '+'}</span>
              </button>
              {open === idx && <div className="faq-answer">{item.a}</div>}
            </li>
          ))}
        </ul>
      </section>
      <section className="google-reviews">
        <h2>What Our Clients Say</h2>
        {/* Free Elfsight Google Reviews widget embed (replace with your own widget ID if needed) */}
        <div className="reviews-placeholder">
          {/* Elfsight widget for Google Reviews (React-compatible) */}
          <div id="elfsight-widget"></div>
          <div style={{fontSize: '0.9em', color: '#6366f1', marginTop: '1em'}}>
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ3V7mS6FV_joRwsMQn-DAbmw" target="_blank" rel="noopener noreferrer">See all reviews on Google</a>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <h2>Modal Title</h2>
            <p>Modal content goes here.</p>
            <button onClick={() => { setShowModal(false); navigate('/'); }}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
