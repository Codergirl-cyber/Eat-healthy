import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MagicRings from '../MagicRings.jsx';
import { ArrowRight, Zap, Leaf, Heart, Droplets, ChevronRight } from 'lucide-react';
import './Landing.css';
import { fruitsData, getTodayFruit } from '../data/fruits.js';

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Landing() {
  const navigate = useNavigate();
  const todayFruit = getTodayFruit();
  const previewFruits = fruitsData.slice(0, 6);
  useScrollReveal();

  return (
    <div className="landing-container page-enter">
      {/* Background */}
      <div className="bg-rings">
        <MagicRings />
        <div className="rings-overlay" />
      </div>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Zap size={14} />
            Powered by seasonal science
          </div>
          <h1 className="hero-heading">
            Find what to eat<br />
            <span className="gradient-text">today</span>
          </h1>
          <p className="hero-subtext">
            Discover the right fruits for your season, health goals, and daily routine.
            Real nutrition. Zero guesswork.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary hero-btn" onClick={() => navigate('/app')}>
              Explore Fruits <ArrowRight size={18} />
            </button>
            {/* <button className="btn btn-secondary hero-btn-sec" onClick={() => navigate('/app')}>
              Browse All <ChevronRight size={18} />
            </button> */}
          </div>
          {/* Fruit of the Day pill */}
          <div className="fotd-pill" onClick={() => navigate(`/fruit/${todayFruit.id}`)}>
            <img src={todayFruit.image} alt={todayFruit.name} className="fotd-img" />
            <span className="fotd-label">Today's Pick</span>
            <span className="fotd-name">{todayFruit.name}</span>
            <span className="fotd-tip">{todayFruit.quickTip.slice(0, 48)}…</span>
            <ChevronRight size={16} className="fotd-arrow" />
          </div>
        </div>
      </section>

      {/* ── How It Works (interactive cards) ── */}
      <section className="how-it-works reveal">
        <p className="section-eyebrow">Simple by design</p>
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          {[
            { icon: <Leaf size={28} />, step: '01', title: 'Find Your Season', desc: 'Know which fruits are naturally ripe right now — no imports, no guessing.' },
            { icon: <Droplets size={28} />, step: '02', title: 'Check Nutrition', desc: 'Understand real benefits, best eating times, and optimal daily intake.' },
            { icon: <Heart size={28} />, step: '03', title: 'Achieve Your Goal', desc: 'Filter by Immunity, Skin, Heart, Digestion, and more.' },
          ].map(({ icon, step, title, desc }) => (
            <div key={step} className="step-card">
              <div className="step-number">{step}</div>
              <div className="step-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fruit Preview ── */}
      <section className="preview-section reveal">
        <p className="section-eyebrow">What's fresh</p>
        <h2 className="section-title">Seasonal Picks</h2>
        <div className="preview-grid">
          {previewFruits.map(fruit => (
            <div
              key={fruit.id}
              className="preview-card"
              onClick={() => navigate(`/fruit/${fruit.id}`)}
            >
              <div className="preview-img-wrap">
                <img loading="lazy" src={fruit.image} alt={fruit.name} className="preview-image" />
                <div className="preview-hover-overlay">
                  <span className="preview-quick-tip">{fruit.quickTip}</span>
                </div>
              </div>
              <div className="preview-info">
                <h4>{fruit.name}</h4>
                <p className="preview-seasons">{fruit.seasons.join(' · ')}</p>
                <div className="preview-tags">
                  {fruit.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="tag-chip">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="preview-cta">
          <button className="btn btn-secondary" onClick={() => navigate('/app')}>
            View All Fruits <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Seasonal Fruit Guide — eat with intention.</p>
      </footer>
    </div>
  );
}
