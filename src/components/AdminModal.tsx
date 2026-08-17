import { useState, FormEvent } from 'react';
import { KeyRound, Lock, ShieldCheck, User, X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string, user: any) => void;
}

export function AdminModal({ isOpen, onClose, onLoginSuccess }: AdminModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onLoginSuccess(data.token, data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed. Try username "admin", password "admin123"');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card admin-login-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="admin-login-header">
          <div className="admin-icon-badge">
            <ShieldCheck size={28} className="text-accent" />
          </div>
          <h2>Portfolio Admin Portal</h2>
          <p>Sign in to manage projects, skills, certificates, messages, and profile data.</p>
        </div>

        {error && <div className="form-feedback error">{error}</div>}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-field">
            <label htmlFor="admin-user">Username or Email</label>
            <div className="input-with-icon">
              <User size={16} />
              <input
                id="admin-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="admin-pass">Password</label>
            <div className="input-with-icon">
              <Lock size={16} />
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="button"
            className="demo-fill-btn"
            onClick={handleFillDemo}
          >
            <KeyRound size={13} /> Auto-fill Demo Credentials (admin / admin123)
          </button>

          <button type="submit" className="button primary admin-submit-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
