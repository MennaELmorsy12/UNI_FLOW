
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';

const studentPreset = {
  email: 'alex.morgan@modern-academy.edu.eg',
  id: '202301084',
};

export function LoginForm() {
  const navigate = useNavigate();
  const { notify } = usePortal();

  const [identifier, setIdentifier] = useState(studentPreset.email);
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleQuickFill = () => {
    setIdentifier(studentPreset.email);
    setPassword('password123');
    setError('');
    notify('Demo student credentials filled.');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!identifier.trim()) {
      setError('Please enter your Student ID or Email.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setError('');
    setBusy(true);

    // Demo authentication only. Replace with the backend login API later.
    setTimeout(() => {
      setBusy(false);
      notify('Welcome back! Signed in successfully.');
      navigate('/student/dashboard');
    }, 600);
  };

  return (
    <div className="auth-panel-form">
      <div className="auth-form-header">
        <h1>Sign In to UniFlow</h1>
        <p>Enter your academic credentials to access your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        {error && (
          <div
            className="inline-notice"
            style={{ margin: '0 0 12px', color: 'var(--red-ink)' }}
            role="alert"
          >
            {error}
          </div>
        )}

        <TextField
          label="Student ID or Email"
          placeholder="e.g., 202301084 or student@modern-academy.edu.eg"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="username"
        />

        <div className="form-field">
          <label htmlFor="auth-password">Password</label>

          <div className="auth-password-wrap">
            <input
              id="auth-password"
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="auth-meta-row">
          <label className="auth-remember-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember this device</span>
          </label>

          <button
            type="button"
            className="auth-forgot-link"
            onClick={() =>
              notify(
                'Password recovery: please contact academic IT support at it@modern-academy.edu.eg'
              )
            }
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="auth-submit-btn"
          busy={busy}
        >
          <KeyRound size={16} />
          Sign In
        </Button>
      </form>

      <div className="auth-demo-hint">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="var(--green)" />
          Quick test demo credentials
        </span>

        <button type="button" onClick={handleQuickFill}>
          Auto-fill credentials
        </button>
      </div>
    </div>
  );
}