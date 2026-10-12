import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { AuthBanner, LoginForm } from '../../components/auth';

export default function LoginPage() {
  const { theme, toggleTheme } = usePortal();

  return (
    <div className="auth-page">
      <Link to="/" className="auth-nav-back" aria-label="Back to home page">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>

      <div className="auth-nav-theme">
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Dark mode' : 'Light mode'}
        >
          {theme === 'light' ? <Moon size={18} strokeWidth={1.8} /> : <Sun size={18} strokeWidth={1.8} />}
        </button>
      </div>

      <motion.div
        className="auth-shell"
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <AuthBanner />
        <LoginForm />
      </motion.div>
    </div>
  );
}
