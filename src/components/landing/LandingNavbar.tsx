import { Link } from 'react-router-dom';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Brand } from '../layout/Brand';
import { Button } from '../ui/Button';

export function LandingNavbar() {
  const { theme, toggleTheme } = usePortal();

  return (
    <header className="landing-nav">
      <div className="landing-container">
        <div className="landing-nav-inner">
          <Link to="/" aria-label="UniFlow Home">
            <Brand />
          </Link>

          <nav className="landing-nav-links" aria-label="Landing Navigation">
            <a href="#features" className="landing-nav-link">
              Modules
            </a>
            <a href="#bylaws" className="landing-nav-link">
              Smart Bylaws
            </a>
            <a href="#roles" className="landing-nav-link">
              Role Workspaces
            </a>
            <a href="#overview" className="landing-nav-link">
              Overview
            </a>
          </nav>

          <div className="landing-nav-actions">
            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? <Moon size={18} strokeWidth={1.8} /> : <Sun size={18} strokeWidth={1.8} />}
            </button>

            <Link to="/login">
              <Button variant="secondary" size="small">
                Sign In
              </Button>
            </Link>

            <Link to="/student/dashboard">
              <Button variant="primary" size="small">
                Open Portal
                <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
