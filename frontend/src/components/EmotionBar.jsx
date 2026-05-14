import React, { useState } from 'react';
import { saveProgress } from '../services/progressService';

const EmotionBar = ({ topic }) => {
  const [emotion, setEmotion] = useState(null);

  const handleFeedback = async (val) => {
    setEmotion(val);
    await saveProgress((topic || 'general').toLowerCase(), {
      emotionFeedback: val,
      lastUpdated: new Date().toISOString()
    });
    alert(`Feedback recorded: ${val}. The system will adapt to this.`);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h3 style={{ color: 'var(--text-color)', marginBottom: '1.5rem' }}>How was this lesson?</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '3rem' }}>
        <button onClick={() => handleFeedback('Easy')} style={{ ...btnStyle, backgroundColor: emotion === 'Easy' ? 'white' : 'transparent' }}>😊</button>
        <button onClick={() => handleFeedback('Okay')} style={{ ...btnStyle, backgroundColor: emotion === 'Okay' ? 'white' : 'transparent' }}>😐</button>
        <button onClick={() => handleFeedback('Confused')} style={{ ...btnStyle, backgroundColor: emotion === 'Confused' ? 'white' : 'transparent' }}>😕</button>
      </div>
      {emotion && <p style={{ marginTop: '1.5rem', color: 'var(--text-color)', fontWeight: 'bold' }}>You felt: {emotion}</p>}
    </div>
  );
};

const btnStyle = {
  border: '2px solid var(--action-color)',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0'
};

export default EmotionBar;
