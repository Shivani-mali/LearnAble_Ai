import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in" style={{ padding: '2rem', textAlign: 'center', width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', margin: 0, fontWeight: '800', color: 'var(--text-color)' }}>CALP</h1>
        <h3 style={{ margin: 0, color: 'var(--action-dark)', fontWeight: '600' }}>Cognitive Adaptive Learning Platform</h3>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', fontStyle: 'italic', marginBottom: '1rem' }}>
          "Learn in the way your mind understands"
        </p>

        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'var(--action-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-color)',
          fontSize: '4.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          marginBottom: '1rem',
          animation: 'pulse 2s infinite'
        }}>
          🧠
        </div>

        <button onClick={() => navigate('/login')} style={{ width: '100%', maxWidth: '300px', fontSize: '1.2rem', padding: '1rem' }}>
          Start Learning Now
          <span style={{ marginLeft: '15px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</span>
        </button>
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
          50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15); }
          100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
