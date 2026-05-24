import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail, loginWithEmail, loginWithGoogle, enableGuestMode } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, role);
      }
      navigate(role === 'student' ? '/loader' : '/parent-dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(role);
      navigate(role === 'student' ? '/loader' : '/parent-dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuestMode = () => {
    enableGuestMode();
    navigate('/loader');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', width: '100%', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="card animate-in" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>LearnAble AI</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>A safe and simple space to learn.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {error && <div className="error-text" style={{ padding: '0.8rem', backgroundColor: 'var(--sidebar-color)', borderRadius: '8px', border: '1px solid var(--error-color)' }}>{error}</div>}

          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            <span style={{ marginLeft: 'auto', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</span>
          </button>
        </form>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <button onClick={handleGoogleLogin} className="secondary-btn" style={{ width: '100%' }}>
            Login with Google
          </button>

          <button onClick={handleGuestMode} className="secondary-btn" style={{ width: '100%', borderStyle: 'dashed' }}>
            Continue as Guest
          </button>

          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', textDecoration: 'underline', boxShadow: 'none', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
