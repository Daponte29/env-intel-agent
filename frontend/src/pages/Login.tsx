import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth
    if (email && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'var(--bg-base)' }}>
      <div style={{ width: '400px', backgroundColor: 'var(--bg-surface)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', gap: '10px' }}>
          <Shield size={32} color="var(--accent)" />
          <h1 style={{ fontSize: '24px', fontWeight: 600 }}>EnviroLens</h1>
        </div>
        
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Sign in to generate auditable environmental compliance risk reports.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@construction.com"
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
