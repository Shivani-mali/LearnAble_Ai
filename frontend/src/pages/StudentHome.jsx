import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listenToProgress } from '../services/progressService';
import { auth } from '../services/firebase';
import { isGuest } from '../services/authService';

const StudentHome = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (auth.currentUser) {
      unsubscribe = listenToProgress(auth.currentUser.uid, (data) => {
        setProgress(data);
      });
    } else if (isGuest()) {
      const guestData = JSON.parse(localStorage.getItem('guestProgress')) || {};
      const arr = Object.keys(guestData).map(key => ({ id: key, ...guestData[key] }));
      setProgress(arr);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <div className="animate-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>👋 Welcome back!</h1>
      
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ marginBottom: '0.5rem' }}>🎯 Today’s Learning Goal</h2>
          <p style={{ color: 'var(--text-light)' }}>Master the basics of Addition</p>
        </div>
        <button 
          onClick={() => navigate('/learning')}
          style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
        >
          Start Learning
          <span style={{ marginLeft: '10px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</span>
        </button>
      </div>

      <div className="card" style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}>
        <h3>📘 Previous Topics</h3>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {progress.length === 0 ? <li style={{ padding: '1rem', backgroundColor: 'var(--sidebar-color)', borderRadius: '12px' }}>No topics learned yet.</li> : progress.map(p => (
            <li key={p.id} style={{ padding: '1.5rem', backgroundColor: 'var(--sidebar-color)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.1rem' }}><strong>{p.topic}</strong> (Score: {p.understandingScore || 0}%)</span>
              <span className={p.understandingScore >= 80 ? 'success-text' : 'error-text'} style={{ padding: '0.5rem 1rem', backgroundColor: 'white', borderRadius: '50px' }}>
                {p.understandingScore >= 80 ? '✅ Mastered' : '🔄 Needs practice'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentHome;
