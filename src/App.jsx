import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TaxCalculator from './components/TaxCalculator';
import CompanySearch from './components/CompanySearch';
import CurrencyConverter from './components/CurrencyConverter';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import GetStartedForm from './components/GetStartedForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-root">
        <TopBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tax-calculator" element={<TaxCalculator />} />
            <Route path="/company-search" element={<CompanySearch />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/get-started" element={<GetStartedForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
