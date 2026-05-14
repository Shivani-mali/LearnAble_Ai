import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import QuestionBox from '../components/QuestionBox';
import EmotionBar from '../components/EmotionBar';
import { askAi } from '../services/api';
import { saveProgress } from '../services/progressService';

const Learning = () => {
  const [topic, setTopic] = useState('Addition');
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('explain'); // 'explain', 'question', 'feedback'
  const [attempts, setAttempts] = useState(0);

  const handleStart = async () => {
    setLoading(true);
    setAttempts(0);
    try {
      // Mocked API Call for now
      const res = await askAi(topic, 'Student needs simple step-by-step learning.');
      if (res && res.data) {
        setExplanation(res.data);
      } else {
        // Fallback for mocked UI if backend is not running
        setExplanation({
          explanation: "Addition is putting things together. If you have 1 apple and you get 1 more, you have 2 apples.",
          example: "🍎 + 🍎 = 🍎🍎",
          question: "How many apples do you have if you add 2 apples to 1 apple?",
          options: ["1", "2", "3", "4"],
          correctAnswer: "3"
        });
      }
    } catch (error) {
      console.error(error);
      setExplanation({
        explanation: "Addition is putting things together.",
        example: "1 + 1 = 2",
        question: "What is 1 + 2?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3"
      });
    }
    setLoading(false);
  };

  const handleAnswerSubmit = async (answer) => {
    const isCorrect = answer === explanation.correctAnswer;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (isCorrect) {
      alert('Correct! 🎉 Moving to next concept.');
      await saveProgress(topic.toLowerCase(), {
        topic: topic,
        correctAnswers: 1, // increment logic in real app, but for now simple 1
        attempts: newAttempts,
        understandingScore: Math.round((1 / newAttempts) * 100),
        lastUpdated: new Date().toISOString()
      });
      // Proceed logic
    } else {
      alert('Oops! Let me explain it differently.');
      await saveProgress(topic.toLowerCase(), {
        topic: topic,
        attempts: newAttempts,
        lastUpdated: new Date().toISOString()
      });
      // Simplify logic
    }
  };

  return (
    <div className="animate-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>Learning: {topic}</h1>
      
      {!explanation ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <button onClick={handleStart} disabled={loading} style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
            {loading ? 'Loading...' : 'Generate Lesson'}
            {!loading && <span style={{ marginLeft: '15px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</span>}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card animate-in">
            <ChatBox text={explanation.explanation} />
            <div style={{ margin: '2rem 0', fontSize: '2.5rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--action-dark)' }}>
              {explanation.example}
            </div>
          </div>
          
          <div className="card animate-in" style={{ animationDelay: '0.2s' }}>
            <QuestionBox 
              question={explanation.question} 
              options={explanation.options} 
              onSubmit={handleAnswerSubmit} 
            />
          </div>

          <div className="card animate-in" style={{ backgroundColor: 'var(--sidebar-color)', animationDelay: '0.4s' }}>
            <EmotionBar topic={topic} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;
