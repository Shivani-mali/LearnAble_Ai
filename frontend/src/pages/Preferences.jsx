import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
  const [pref, setPref] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (pref) {
      localStorage.setItem('learning_preference', pref);
      navigate('/student-home');
    }
  };

  return (
    <div className="animate-in" style={{ padding: '2rem', textAlign: 'center', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <div className="card">
        <h1 style={{ marginBottom: '1rem' }}>How do you like to learn?</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Select your favorite way to learn new things.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            'Step-by-step learning',
            'Audio + simple text',
            'Short & quick learning',
            'Story-based learning'
          ].map(p => (
            <button 
              key={p}
              onClick={() => setPref(p)}
              style={{
                background: pref === p ? 'var(--action-color)' : 'white',
                color: pref === p ? 'white' : 'var(--text-color)',
                border: `2px solid ${pref === p ? 'var(--action-color)' : 'var(--border-color)'}`,
                boxShadow: 'none',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '100px'
              }}
            >
              {p}
            </button>
          ))}
        </div>
        
        <button onClick={handleSave} disabled={!pref} style={{ width: '100%' }}>
          Continue to Dashboard
          <span style={{ marginLeft: '15px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</span>
        </button>
      </div>
    </div>
  );
};

export default Preferences;
