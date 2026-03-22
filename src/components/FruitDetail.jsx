import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, AlertTriangle, BarChart2, Lightbulb } from 'lucide-react';
import { fruitsData } from '../data/fruits.js';
import './AppStyles.css';

export default function FruitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fruit = fruitsData.find(f => f.id === id);

  if (!fruit) {
    return (
      <div className="app-container" style={{ textAlign: 'center', paddingTop: '20vh' }}>
        <h2 style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Fruit not found</h2>
        <button className="back-btn" onClick={() => navigate('/app')}>
          <ArrowLeft size={18} /> Back to Finder
        </button>
      </div>
    );
  }

  return (
    <div className="app-container detail-container page-enter">
      <button className="back-btn" onClick={() => navigate('/app')}>
        <ArrowLeft size={16} /> Back to Explorer
      </button>

      {/* Header: Image + Title + Season tags */}
      <div className="detail-header">
        <div className="detail-image-wrapper">
          <img src={fruit.image} alt={fruit.name} />
        </div>
        <div className="detail-title">
          <h1>{fruit.name}</h1>
          <div className="detail-tags">
            {fruit.seasons.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
          <div className="detail-tags" style={{ marginTop: '0.75rem' }}>
            {fruit.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
          </div>
        </div>
      </div>

      {/* Quick Tip Banner */}
      <div className="quick-tip-banner">
        <div className="quick-tip-label"><Lightbulb size={11} style={{ display: 'inline', marginRight: 4 }} />Quick Tip</div>
        <p className="quick-tip-text">{fruit.quickTip}</p>
      </div>

      {/* Content Grid */}
      <div className="detail-content">
        {/* Benefits */}
        <div className="detail-section">
          <h2>Core Benefits</h2>
          <ul className="detail-list">
            {fruit.benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>

        {/* Best Time to Eat */}
        <div className="detail-section">
          <h2><Clock size={11} style={{ display: 'inline', marginRight: 4 }} />Best Time to Eat</h2>
          <p className="detail-info-highlight">{fruit.bestTime}</p>
        </div>

        {/* Daily Intake */}
        <div className="detail-section">
          <h2><BarChart2 size={11} style={{ display: 'inline', marginRight: 4 }} />Daily Intake</h2>
          <p className="detail-info-highlight">{fruit.dailyIntake}</p>
        </div>

        {/* Who Should Avoid */}
        <div className="detail-section">
          <h2><AlertTriangle size={11} style={{ display: 'inline', marginRight: 4 }} />Who Should Avoid</h2>
          <p className="detail-info-text">{fruit.avoidIf}</p>
        </div>

        {/* Nutrition */}
        <div className="nutrition-card">
          <h2>Nutritional Value <span style={{ color: 'var(--text-muted)', fontWeight: 400, letterSpacing: 0 }}>per 100g</span></h2>
          <div className="nutrition-grid">
            <div className="nutrition-item">
              <span className="nutrition-label">Calories</span>
              <span className="nutrition-value">{fruit.nutrition.calories}</span>
              <span className="nutrition-unit">kcal</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-label">Sugar</span>
              <span className="nutrition-value">{fruit.nutrition.sugar}</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-label">Fiber</span>
              <span className="nutrition-value">{fruit.nutrition.fiber}</span>
            </div>
            <div className="nutrition-item">
              <span className="nutrition-label">Vitamin C</span>
              <span className="nutrition-value">{fruit.nutrition.vitC}</span>
              <span className="nutrition-unit">daily value</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
