import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import type { Role } from '../../types/portal';

const rolePresets: Record<Role, { label: string; email: string; id: string }> = {
  student: {
    label: 'Student',
    email: 'alex.morgan@modern-academy.edu.eg',
    id: '202301084',
  },
  doctor: {
    label: 'Faculty',
    email: 'sarah.jenkins@modern-academy.edu.eg',
    id: 'DOC-102',
  },
  registration: {
    label: 'Registration',
    email: 'affairs@modern-academy.edu.eg',
    id: 'REG-501',
  },
  admin: {
    label: 'IT Admin',
    email: 'admin@modern-academy.edu.eg',
    id: 'ADM-001',
  },
};

export function LoginForm() {
  const navigate = useNavigate();
  const { notify } = usePortal();

  const [role, setRole] = useState<Role>('student');
  const [identifier, setIdentifier] = useState('alex.morgan@modern-academy.edu.eg');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleRoleChange = (nextRole: Role) => {
    setRole(nextRole);
    setIdentifier(rolePresets[nextRole].email);
    setPassword('password123');
    setError('');
  };

  const handleQuickFill = () => {
    setIdentifier(rolePresets[role].email);
    setPassword('password123');
    notify(`Filled ${rolePresets[role].label} credentials.`);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    // Simulate authentication delay
    setTimeout(() => {
      setBusy(false);
      notify(`Welcome back! Signed in as ${rolePresets[role].label}.`);
      navigate(`/${role}/dashboard`);
    }, 600);
  };

  return (
    <div className="auth-panel-form">
      <div className="auth-form-header">
        <h1>Sign In to UniFlow</h1>
        <p>Select your workspace role and enter your academic credentials.</p>
      </div>

      {/* Role Selector Tabs */}
      <div className="auth-role-tabs" role="tablist" aria-label="Select role">
        {(Object.keys(rolePresets) as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            role="tab"
            aria-selected={role === r}
            className={`auth-role-btn ${role === r ? 'active' : ''}`}
            onClick={() => handleRoleChange(r)}
          >
            {rolePresets[r].label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        {error && (
          <div className="inline-notice" style={{ margin: '0 0 12px', color: 'var(--red-ink)' }}>
            {error}
          </div>
        )}

        <TextField
          label={role === 'student' ? 'Student ID or Email' : 'Staff Email Address'}
          placeholder={role === 'student' ? 'e.g., 202301084 or alex@modern-academy.edu.eg' : 'staff@modern-academy.edu.eg'}
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
              onClick={() => setShowPassword(!showPassword)}
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
            onClick={() => notify('Password recovery: please contact academic IT support at it@modern-academy.edu.eg')}
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" variant="primary" className="auth-submit-btn" busy={busy}>
          <KeyRound size={16} />
          Sign In to {rolePresets[role].label} Workspace
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
