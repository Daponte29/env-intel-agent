import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

const headlines = [
  {
    id: 1,
    location: 'Cherokee County GA',
    text: 'Watershed proximity alerts up 34% this quarter',
    status: 'red',
  },
  {
    id: 2,
    location: 'Harris County TX',
    text: '3 new stormwater violations issued this month',
    status: 'yellow',
  },
  {
    id: 3,
    location: 'Travis County TX',
    text: 'Water quality improving for third consecutive month',
    status: 'green',
  }
];

export default function Headlines() {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Live Environmental Intelligence
      </h2>
      <div style={{ display: 'flex', gap: '16px' }}>
        {headlines.map(headline => {
          let color = '';
          let bgColor = '';
          let Icon = AlertCircle;

          if (headline.status === 'red') {
            color = 'var(--alert-red)';
            bgColor = 'rgba(239, 68, 68, 0.1)';
            Icon = AlertCircle;
          } else if (headline.status === 'yellow') {
            color = 'var(--alert-yellow)';
            bgColor = 'rgba(245, 158, 11, 0.1)';
            Icon = AlertTriangle;
          } else if (headline.status === 'green') {
            color = 'var(--alert-green)';
            bgColor = 'rgba(16, 185, 129, 0.1)';
            Icon = CheckCircle2;
          }

          return (
            <div key={headline.id} style={{ 
              flex: 1, 
              backgroundColor: 'var(--bg-elevated)', 
              border: `1px solid ${bgColor}`,
              borderLeft: `4px solid ${color}`,
              padding: '16px', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <Icon size={20} color={color} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {headline.location}
                </div>
                <div style={{ fontSize: '13px', color: color, lineHeight: '1.4' }}>
                  {headline.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
