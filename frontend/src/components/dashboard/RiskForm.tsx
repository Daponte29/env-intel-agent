import React, { useState } from 'react';

interface RiskFormProps {
  onSubmit: () => void;
}

export default function RiskForm({ onSubmit }: RiskFormProps) {
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: 'Warehouse',
    streetAddress: '',
    city: '',
    state: 'TX',
    county: '',
    projectSize: '',
    estimatedCost: '',
    breakingGround: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-populate mock county based on state for demo
    let newCounty = formData.county;
    if (name === 'state') {
      if (value === 'TX') newCounty = 'Harris';
      if (value === 'GA') newCounty = 'Cherokee';
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { county: newCounty } : {})
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '24px', color: 'var(--text-primary)' }}>
        Project Details
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Row 1 */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Project Name</label>
          <input 
            type="text" 
            name="projectName"
            className="form-input" 
            value={formData.projectName}
            onChange={handleChange}
            placeholder="e.g. Baytown Logistics Center"
            required 
          />
        </div>

        {/* Row 2 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Project Type</label>
          <select name="projectType" className="form-input" value={formData.projectType} onChange={handleChange} required>
            <option value="Warehouse">Warehouse</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Breaking Ground Date</label>
           <input 
            type="date" 
            name="breakingGround"
            className="form-input" 
            value={formData.breakingGround}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Row 3 - Location */}
        <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Street Address</label>
            <input type="text" name="streetAddress" className="form-input" value={formData.streetAddress} onChange={handleChange} placeholder="123 Industrial Pkwy" required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>City</label>
            <input type="text" name="city" className="form-input" value={formData.city} onChange={handleChange} placeholder="Baytown" required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>State</label>
            <select name="state" className="form-input" value={formData.state} onChange={handleChange} required>
              <option value="TX">TX</option>
              <option value="GA">GA</option>
              <option value="FL">FL</option>
              <option value="CA">CA</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>County</label>
            <input type="text" name="county" className="form-input" value={formData.county} onChange={handleChange} placeholder="Harris" />
          </div>
        </div>

        {/* Row 4 - Metrics */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Project Size (sq ft)</label>
          <input type="number" name="projectSize" className="form-input" value={formData.projectSize} onChange={handleChange} placeholder="150000" required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Estimated Cost ($)</label>
          <input type="number" name="estimatedCost" className="form-input" value={formData.estimatedCost} onChange={handleChange} placeholder="25000000" required />
        </div>

        {/* Submit */}
        <div style={{ gridColumn: 'span 2', marginTop: '16px' }}>
          <button type="submit" className="btn-primary" style={{ padding: '16px', fontSize: '16px' }}>
            Generate Risk Report
          </button>
        </div>
      </form>
    </div>
  );
}
