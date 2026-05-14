import React, { useState } from 'react';

const QuestionBox = ({ question, options, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption) {
      onSubmit(selectedOption);
    }
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: 'var(--content-color)', borderRadius: '8px' }}>
      <h3 style={{ color: 'var(--text-color)' }}>{question}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        {options.map((opt, index) => (
          <label 
            key={index} 
            style={{ 
              padding: '1rem', 
              backgroundColor: selectedOption === opt ? 'white' : 'var(--sidebar-color)', 
              borderRadius: '8px', 
              cursor: 'pointer',
              border: selectedOption === opt ? '2px solid var(--action-color)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              fontWeight: selectedOption === opt ? 'bold' : 'normal'
            }}
          >
            <input 
              type="radio" 
              name="answer" 
              value={opt} 
              onChange={(e) => setSelectedOption(e.target.value)} 
              style={{ marginRight: '15px', transform: 'scale(1.5)' }}
            />
            {opt}
          </label>
        ))}
        <button 
          type="submit" 
          disabled={!selectedOption}
          style={{ marginTop: '1.5rem', fontSize: '1.2rem', padding: '1rem' }}
        >
          Submit Answer
          <span style={{ marginLeft: '15px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</span>
        </button>
      </form>
    </div>
  );
};

export default QuestionBox;
