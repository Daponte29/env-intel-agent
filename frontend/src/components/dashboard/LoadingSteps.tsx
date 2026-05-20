import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface LoadingStepsProps {
  onComplete: () => void;
}

const steps = [
  "Resolving county from address...",
  "Pulling regional environmental headlines...",
  "Analyzing EPA active violations...",
  "Generating preliminary risk report..."
];

export default function LoadingSteps({ onComplete }: LoadingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(() => onComplete(), 800);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5s and 2.5s per step

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '24px', color: 'var(--text-primary)' }}>
        Generating Insight Matrix
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          let color = 'var(--text-muted)';
          let Icon = () => <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--text-muted)' }} />;

          if (isCompleted) {
            color = 'var(--alert-green)';
            Icon = () => <CheckCircle size={20} color={color} />;
          } else if (isActive) {
            color = 'var(--accent)';
            Icon = () => <Loader2 size={20} color={color} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />;
          }

          return (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              opacity: isPending ? 0.5 : 1,
              transition: 'opacity 0.3s ease'
            }}>
              <Icon />
              <span style={{ fontSize: '14px', color: isCompleted ? 'var(--text-primary)' : color }}>{step}</span>
            </div>
          );
        })}
      </div>
      
      {/* Basic keyframes for spinner */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
