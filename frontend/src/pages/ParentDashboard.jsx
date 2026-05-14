import React, { useEffect, useState } from 'react';
import { listenToProgress } from '../services/progressService';
import { db, auth } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ParentDashboard = () => {
  const [childProgress, setChildProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    const fetchChildProgress = async () => {
      if (!auth.currentUser) return;
      
      try {
        const parentDoc = await getDoc(doc(db, 'parent_child', auth.currentUser.uid));
        if (parentDoc.exists() && parentDoc.data().childId) {
          const childId = parentDoc.data().childId;
          unsubscribe = listenToProgress(childId, (data) => {
            setChildProgress(data);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    
    fetchChildProgress();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const overallProgress = childProgress.length > 0 
    ? Math.round(childProgress.reduce((acc, curr) => acc + (curr.understandingScore || 0), 0) / childProgress.length)
    : 0;

  const weakTopics = childProgress.filter(p => (p.understandingScore || 0) < 80);

  return (
    <div className="animate-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>👨‍👩‍👧 Parent Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>📈 Child's Progress</h2>
            <h2 style={{ color: 'var(--action-color)' }}>{overallProgress}%</h2>
          </div>
          
          {loading ? <p>Loading progress...</p> : (
            <>
              {childProgress.length === 0 ? <p>No progress data yet.</p> : (
                <ul style={{ lineHeight: '1.8', listStyleType: 'none', padding: 0 }}>
                  {childProgress.map(p => (
                    <li key={p.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--content-color)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{p.topic}</strong>
                      <span className={p.understandingScore >= 80 ? 'success-text' : 'error-text'}>
                        {p.understandingScore >= 80 ? '✅ Mastered' : '🔄 Needs Practice'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        <div className="card" style={{ backgroundColor: 'var(--sidebar-color)' }}>
          <h2>💡 AI Insights & Suggestions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {weakTopics.length > 0 && (
              <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '12px' }}>
                <strong style={{ color: 'var(--error-color)' }}>Needs Focus:</strong> {weakTopics.map(t => t.topic).join(', ')}
              </div>
            )}
            
            <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '12px' }}>
              <p><strong>Suggestion:</strong> <em>"Try switching to visual or story-based learning for difficult topics to improve retention."</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
