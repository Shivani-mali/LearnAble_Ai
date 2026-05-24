import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { askAi } from '../services/api';

const Learning = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const mode = localStorage.getItem('learning_preference') || 'Step-by-Step Mode';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userText = inputValue;
    const userMsg = { role: 'user', content: userText };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await askAi(userText, 'Student is exploring concepts.', mode);
      if (res && res.data) {
        const aiMsg = { role: 'ai', content: res.data };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (e) {
      console.error(e);
      // Fallback if backend fails
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: { explanation: "I'm sorry, I couldn't process that right now.", quiz: "Try asking again?" } 
      }]);
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', backgroundColor: '#FFFFFF' }}>
        
        {/* Top Header - Mode Indicator */}
        <div style={{ 
          padding: '1rem 2rem', 
          borderBottom: '1px solid var(--border-color)', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          zIndex: 10
        }}>
          <div style={{ 
            padding: '0.6rem 1.2rem', 
            backgroundColor: 'var(--action-light)', 
            color: 'var(--action-dark)',
            borderRadius: '50px',
            fontSize: '0.95rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--action-dark)', borderRadius: '50%' }}></span>
            Active: {mode}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '750px', display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>
            
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-color)', marginTop: '10vh', animation: 'slideUpFade 0.5s ease-out' }}>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/calpLogo.png" alt="CALP Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>What would you like to learn today?</h2>
                <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginTop: '0.5rem' }}>I will adapt my teaching style to match your preferences.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'slideUpFade 0.3s ease-out'
                }}>
                  <div style={{
                    backgroundColor: msg.role === 'user' ? 'var(--action-color)' : '#F8FAFC',
                    color: msg.role === 'user' ? '#FFFFFF' : 'var(--text-color)',
                    padding: '1.2rem 1.5rem',
                    borderRadius: '16px',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '16px',
                    maxWidth: '85%',
                    border: msg.role === 'ai' ? '1px solid var(--border-color)' : 'none',
                    fontSize: '1.05rem',
                    lineHeight: '1.6'
                  }}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content.explanation}</div>
                        
                        {/* Dynamic Image from Unsplash */}
                        {msg.content.imageUrl && (
                          <img 
                            src={msg.content.imageUrl} 
                            alt="Educational Illustration" 
                            style={{ width: '100%', borderRadius: '12px', marginTop: '0.5rem', objectFit: 'cover', maxHeight: '300px' }} 
                          />
                        )}

                        {/* Dynamic Video from YouTube */}
                        {msg.content.videoId && (
                          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', marginTop: '0.5rem' }}>
                            <iframe 
                              src={`https://www.youtube.com/embed/${msg.content.videoId}`} 
                              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                              allowFullScreen 
                              title="Educational Video"
                            />
                          </div>
                        )}

                        {msg.content.example && (
                          <div style={{ padding: '1.2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
                            <strong style={{ color: 'var(--action-dark)', display: 'block', marginBottom: '0.5rem' }}>Example:</strong>
                            {msg.content.example}
                          </div>
                        )}
                        
                        {msg.content.quiz && (
                          <div style={{ padding: '1.2rem', backgroundColor: 'var(--action-light)', borderRadius: '12px', color: 'var(--action-dark)' }}>
                            <strong>Quick Quiz:</strong> {msg.content.quiz}
                          </div>
                        )}
                        
                        {/* Feedback Buttons */}
                        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                          {['Clear', 'Okay', 'Confused'].map(fb => (
                            <button key={fb} style={{ 
                              padding: '0.5rem 1rem', 
                              fontSize: '0.9rem', 
                              backgroundColor: '#FFFFFF',
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-light)',
                              boxShadow: 'none',
                              borderRadius: '50px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              fontWeight: '500'
                            }}
                            onMouseEnter={e => { e.target.style.borderColor = 'var(--action-color)'; e.target.style.color = 'var(--action-color)'; }}
                            onMouseLeave={e => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.color = 'var(--text-light)'; }}
                            >
                              {fb}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px', padding: '1rem', color: 'var(--text-light)' }}>
                <div className="loader-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Input Area */}
        <div style={{ padding: '1.5rem 2rem 2.5rem', display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '750px', 
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <input 
              type="text" 
              placeholder="Ask anything..." 
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              style={{
                width: '100%',
                padding: '1.2rem 4rem 1.2rem 1.8rem',
                borderRadius: '30px',
                border: '1px solid var(--border-color)',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                fontSize: '1.05rem',
                outline: 'none'
              }}
            />
            <button 
              onClick={handleSend}
              disabled={loading || !inputValue.trim()}
              style={{
                position: 'absolute',
                right: '10px',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: inputValue.trim() ? 'var(--action-color)' : '#E2E8F0',
                color: '#FFFFFF',
                boxShadow: 'none',
                border: 'none',
                transition: 'background-color 0.2s'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        <style>{`
          .loader-dots span {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: var(--action-color);
            border-radius: 50%;
            margin: 0 2px;
            animation: bounce 1.4s infinite ease-in-out both;
          }
          .loader-dots span:nth-child(1) { animation-delay: -0.32s; }
          .loader-dots span:nth-child(2) { animation-delay: -0.16s; }
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default Learning;
