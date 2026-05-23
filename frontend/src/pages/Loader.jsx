import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate system preparation / loading
    const timer = setTimeout(() => {
      navigate('/preferences');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="animate-in" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh',
      textAlign: 'center',
      width: '100%'
    }}>
      <div className="loader-spinner" style={{ marginBottom: '2.5rem' }}></div>
      <h2 style={{ color: 'var(--action-dark)', fontSize: '2rem', marginBottom: '1rem' }}>Setting up your learning environment...</h2>
      <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Loading user data and personalization modules 🧠</p>

      <style>{`
        .loader-spinner {
          width: 80px;
          height: 80px;
          border: 8px solid var(--sidebar-color);
          border-top: 8px solid var(--action-color);
          border-radius: 50%;
          animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
