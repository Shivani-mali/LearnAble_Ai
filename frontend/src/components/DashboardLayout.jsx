import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/student-home', icon: '🏠' },
    { name: 'Learning Modes', path: '/preferences', icon: '🧠' },
    { name: 'History', path: '#history', icon: '📜' },
    { name: 'Progress', path: '#progress', icon: '📈' },
  ];

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Left Sidebar */}
      <div style={{
        width: '260px',
        borderRight: '1px solid var(--border-color)',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--sidebar-color)'
      }}>
        <h2 style={{ paddingLeft: '1rem', color: 'var(--action-dark)', marginBottom: '3rem', fontSize: '1.8rem', fontWeight: 'bold' }}>CALP</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => (
            <button 
              key={item.name}
              onClick={() => !item.path.startsWith('#') && navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '1rem 1.2rem',
                backgroundColor: location.pathname === item.path ? 'var(--action-light)' : 'transparent',
                color: location.pathname === item.path ? 'var(--action-dark)' : 'var(--text-color)',
                border: 'none',
                borderRadius: '12px',
                textAlign: 'left',
                boxShadow: 'none',
                fontWeight: location.pathname === item.path ? '600' : '500',
                justifyContent: 'flex-start',
                transition: 'background-color 0.2s',
                opacity: item.path.startsWith('#') ? 0.6 : 1,
                cursor: item.path.startsWith('#') ? 'not-allowed' : 'pointer'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
