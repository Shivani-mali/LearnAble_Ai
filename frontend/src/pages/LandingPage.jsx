import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)', /* Reset any parent constraints */
      backgroundColor: '#f8fafc',
      backgroundImage: 'radial-gradient(circle at 50% -20%, #e0e7ff 0%, #f8fafc 50%)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0,
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0,
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      {/* Main Content */}
      <div className="animate-in" style={{ 
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '800px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem'
      }}>
        {/* Top Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
          <h1 style={{ 
            fontSize: '5rem', 
            margin: 0, 
            fontWeight: '800', 
            background: 'linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            CALP
          </h1>
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.6rem',
            color: '#334155', 
            fontWeight: '600',
            letterSpacing: '-0.01em'
          }}>
            Cognitive Adaptive Learning Platform
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#64748b', 
            fontWeight: '400',
            marginTop: '0.5rem',
            maxWidth: '500px'
          }}>
            Learn in the way your mind understands.
          </p>
        </div>

        {/* Center Section: Logo with glow */}
        <div style={{
          position: 'relative',
          width: '180px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Glowing Aura */}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(167,139,250,0.3) 100%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            animation: 'pulseGlow 3s infinite alternate'
          }} />
          
          {/* Glassmorphism Logo Panel */}
          <div style={{
            position: 'relative',
            width: '140px',
            height: '140px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255,255,255,0.5) inset',
            transform: 'rotate(-3deg)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(0deg) scale(1.08)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(-3deg) scale(1)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
          }}
          >
            <img src="/calpLogo.png" alt="CALP Logo" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
          </div>
        </div>

        {/* CTA Section */}
        <button 
          onClick={() => navigate('/login')} 
          style={{ 
            marginTop: '1.5rem',
            padding: '1.2rem 3rem',
            fontSize: '1.25rem',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            borderRadius: '50px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'Inter', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(15, 23, 42, 0.4)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(15, 23, 42, 0.3)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
          }}
        >
          Start Learning Now
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.9); opacity: 0.5; }
          100% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
