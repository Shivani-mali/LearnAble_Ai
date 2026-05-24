import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isGuest');
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getIcon = (name) => {
    switch (name) {
      case 'Home': return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
      case 'Learning Modes': return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><line x1="2" y1="12" x2="22" y2="12"></line></svg>;
      case 'History': return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
      case 'Progress': return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
      default: return null;
    }
  };

  const menuItems = [
    { name: 'Home', path: '/student-home' },
    { name: 'Learning Modes', path: '/preferences' },
    { name: 'History', path: '#history' },
    { name: 'Progress', path: '#progress' },
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
        backgroundColor: 'var(--sidebar-color)',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ paddingLeft: '1rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/calpLogo.png" alt="CALP Logo" style={{ height: '35px', objectFit: 'contain' }} />
            <h2 style={{ color: 'var(--action-dark)', margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>CALP</h2>
          </div>

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
                <span style={{ display: 'flex', alignItems: 'center' }}>{getIcon(item.name)}</span>
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        {user && (
          <div style={{
            marginTop: 'auto',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <img
              src={user.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.email}
              alt="Profile"
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: 'var(--text-color)' }}>
                {user.displayName || 'Student'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-light)',
                padding: '5px',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Logout"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
