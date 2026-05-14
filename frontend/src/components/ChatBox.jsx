import React from 'react';

const ChatBox = ({ text }) => {
  const handlePlayAudio = () => {
    // Mock audio playback for the demo
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--content-color)', 
      padding: '2rem', 
      borderRadius: '12px',
      fontSize: '1.4rem',
      lineHeight: '1.8',
      borderLeft: '8px solid var(--action-light)',
      color: 'var(--text-color)',
      position: 'relative'
    }}>
      <p>{text}</p>
      <button 
        onClick={handlePlayAudio}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '0.5rem',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--action-color)'
        }}
        title="Play Audio"
      >
        🔊
      </button>
    </div>
  );
};

export default ChatBox;
