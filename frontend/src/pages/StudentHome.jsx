import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const StudentHome = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="animate-in" style={{ padding: '4rem 3rem', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-color)' }}>Welcome back! 👋</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', marginBottom: '3rem' }}>Ready to continue your learning journey?</p>

        <div className="card" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '2.5rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          borderRadius: '20px'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🎯 Today's Learning Goal
            </h2>
            <p style={{ color: 'var(--text-light)', margin: '0.5rem 0 0 0', fontSize: '1.1rem', paddingLeft: '38px' }}>
              Master the basics of Addition
            </p>
          </div>
          <button onClick={() => navigate('/learning')} style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', borderRadius: '50px' }}>
            Start Learning
            <span style={{ marginLeft: '10px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</span>
          </button>
        </div>
        
        <div style={{ marginTop: '3rem' }}>
           <h3 style={{ fontSize: '1.2rem', color: 'var(--text-color)', marginBottom: '1rem' }}>Previous Topics</h3>
           <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '16px', color: 'var(--text-light)', textAlign: 'center' }}>
             No topics learned yet.
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentHome;
