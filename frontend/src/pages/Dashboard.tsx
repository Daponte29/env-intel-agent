import React, { useState } from 'react';
import Headlines from '../components/dashboard/Headlines';
import RiskForm from '../components/dashboard/RiskForm';
import LoadingSteps from '../components/dashboard/LoadingSteps';
import { FileText } from 'lucide-react';

export default function Dashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitting(true);
  };

  const handleLoadingComplete = () => {
    setIsComplete(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto', backgroundColor: 'var(--bg-base)' }}>
      {/* Premium Header */}
      <header style={{
        padding: '20px 40px',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🌍</span>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
              EnviroLens Intelligence
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Commercial Property Risk Assessor
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', height: '36px', 
            borderRadius: '50%', backgroundColor: 'var(--accent)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 600, fontSize: '14px'
          }}>
            DC
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Live Headlines Matrix */}
        {!isSubmitting && !isComplete && <Headlines />}

        {/* Dynamic Content Area */}
        <div style={{ marginTop: '20px' }}>
          {!isSubmitting && !isComplete && (
            <RiskForm onSubmit={handleFormSubmit} />
          )}

          {isSubmitting && !isComplete && (
            <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '60px' }}>
              <LoadingSteps onComplete={handleLoadingComplete} />
            </div>
          )}

          {isComplete && (
            <div style={{ 
              backgroundColor: 'var(--bg-elevated)', padding: '40px', 
              borderRadius: '12px', border: '1px solid var(--border)',
              textAlign: 'center', marginTop: '40px'
            }}>
               <FileText size={48} color="var(--accent)" style={{ margin: '0 auto', marginBottom: '20px' }} />
               <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '16px' }}>
                 Risk Report Generated
               </h2>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px auto' }}>
                 Our AI agents have finished aggregating EPA active violation proximity, evaluating environmental sentiment, and preparing your auditable report.
               </p>
               <button 
                onClick={() => { setIsSubmitting(false); setIsComplete(false); }}
                className="btn-primary" 
                style={{ width: 'auto', padding: '12px 32px' }}
               >
                 View Report
               </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
