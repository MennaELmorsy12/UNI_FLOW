import { Link } from 'react-router-dom';
import { School } from 'lucide-react';
import { Brand } from '../layout/Brand';

export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <div className="landing-footer-top">
          <Link to="/" aria-label="UniFlow Home">
            <Brand />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <School size={16} />
            <span style={{ fontSize: '11px', fontWeight: 500 }}>Modern Academy — Westbridge Campus</span>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <span>&copy; {new Date().getFullYear()} UniFlow. Engineered for Modern Academy. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '18px' }}>
            <Link to="/login">Student & Staff Login</Link>
            <a href="#bylaws">Bylaws Specification</a>
            <a href="#features">Core Modules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
