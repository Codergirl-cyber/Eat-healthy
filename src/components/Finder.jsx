import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fruitsData, seasons, goals, getTodayFruit } from '../data/fruits.js';
import { Search, ArrowLeft, Sparkles, ChevronRight, X } from 'lucide-react';
import './AppStyles.css';

const SORT_OPTIONS = [
  { key: 'default', label: 'Default' },
  { key: 'low-sugar', label: 'Low Sugar' },
  { key: 'high-fiber', label: 'High Fiber' },
  { key: 'low-cal', label: 'Low Calorie' },
  { key: 'az', label: 'A → Z' },
];

const goalKeywords = {
  'Immunity':     ['immun', 'vitamin c', 'boost'],
  'Digestion':    ['digest', 'fiber', 'gut'],
  'Skin Health':  ['skin'],
  'Heart Health': ['heart'],
  'Hydration':    ['hydrat'],
  'Antioxidants': ['antioxidant'],
};

function parseSugar(s) { return parseFloat(s); }
function parseFiber(s) { return parseFloat(s); }

export default function Finder() {
  const navigate = useNavigate();
  const todayFruit = getTodayFruit();

  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [seasonFilter, setSeasonFilter] = useState(null);
  const [goalFilter, setGoalFilter] = useState(null);
  const [sortKey, setSortKey] = useState('default');
  const searchRef = useRef(null);

  // Autocomplete suggestions
  const suggestions = search.length > 0
    ? fruitsData.filter(f => f.name.toLowerCase().startsWith(search.toLowerCase()) && f.name.toLowerCase() !== search.toLowerCase()).slice(0, 5)
    : [];

  // Filter + sort
  const filtered = fruitsData
    .filter(fruit => {
      const matchesSearch = fruit.name.toLowerCase().includes(search.toLowerCase());
      const matchesSeason = !seasonFilter || fruit.seasons.includes(seasonFilter);
      const matchesGoal = !goalFilter || (() => {
        const kw = goalKeywords[goalFilter] || [goalFilter.toLowerCase()];
        return fruit.benefits.some(b => kw.some(k => b.toLowerCase().includes(k)));
      })();
      return matchesSearch && matchesSeason && matchesGoal;
    })
    .sort((a, b) => {
      if (sortKey === 'low-sugar') return parseSugar(a.nutrition.sugar) - parseSugar(b.nutrition.sugar);
      if (sortKey === 'high-fiber') return parseFiber(b.nutrition.fiber) - parseFiber(a.nutrition.fiber);
      if (sortKey === 'low-cal') return a.nutrition.calories - b.nutrition.calories;
      if (sortKey === 'az') return a.name.localeCompare(b.name);
      return 0;
    });

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const clearFilters = () => { setSeasonFilter(null); setGoalFilter(null); setSortKey('default'); setSearch(''); };
  const hasFilters = seasonFilter || goalFilter || sortKey !== 'default' || search;

  return (
    <div className="app-container page-enter">
      {/* Nav */}
      <header className="app-header">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> <Sparkles size={20} /> Fruit Guide
        </div>
      </header>

      {/* Fruit of the Day */}
      <div className="fotd-card" onClick={() => navigate(`/fruit/${todayFruit.id}`)}>
        <img src={todayFruit.image} alt={todayFruit.name} className="fotd-card-img" />
        <div className="fotd-card-body">
          <span className="fotd-badge"><Sparkles size={11} /> Fruit of the Day</span>
          <h2 className="fotd-card-name">{todayFruit.name}</h2>
          <p className="fotd-card-tip">"{todayFruit.quickTip}"</p>
          <div className="fotd-card-tags">
            {todayFruit.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
          </div>
        </div>
        <div className="fotd-card-cta">
          View Details <ChevronRight size={16} />
        </div>
      </div>

      <main>
        <h1 className="page-title">Discover Fruits</h1>

        {/* Search */}
        <div className="search-wrap" ref={searchRef}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search fruits..."
            value={search}
            onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
          />
          {search && (
            <button className="search-clear" onClick={() => { setSearch(''); setShowSuggestions(false); }}>
              <X size={15} />
            </button>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="autocomplete-list">
              {suggestions.map(f => (
                <li key={f.id} onMouseDown={() => { setSearch(f.name); setShowSuggestions(false); }}>
                  <img src={f.image} alt={f.name} className="ac-img" />
                  <span>{f.name}</span>
                  <span className="ac-season">{f.seasons[0]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filter Chips Row */}
        <div className="filter-row">
          <div className="chip-group">
            <span className="chip-label">Season</span>
            {seasons.map(s => (
              <button
                key={s}
                className={`chip ${seasonFilter === s ? 'chip-active' : ''}`}
                onClick={() => setSeasonFilter(seasonFilter === s ? null : s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="chip-group">
            <span className="chip-label">Goal</span>
            {goals.map(g => (
              <button
                key={g}
                className={`chip ${goalFilter === g ? 'chip-active' : ''}`}
                onClick={() => setGoalFilter(goalFilter === g ? null : g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Bar */}
        <div className="sort-bar">
          <span className="sort-label">Sort:</span>
          {SORT_OPTIONS.map(o => (
            <button
              key={o.key}
              className={`sort-btn ${sortKey === o.key ? 'sort-active' : ''}`}
              onClick={() => setSortKey(o.key)}
            >
              {o.label}
            </button>
          ))}
          {hasFilters && (
            <button className="clear-btn" onClick={clearFilters}>
              <X size={13} /> Clear all
            </button>
          )}
          <span className="results-count">{filtered.length} fruit{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Fruits Grid */}
        <div className="fruits-grid">
          {filtered.length > 0 ? filtered.map(fruit => (
            <div
              key={fruit.id}
              className="fruit-app-card"
              onClick={() => navigate(`/fruit/${fruit.id}`)}
            >
              <img src={fruit.image} alt={fruit.name} className="image" />
              <div className="fruit-app-info">
                <h3>{fruit.name}</h3>
                <p className="fruit-app-seasons">{fruit.seasons.join(' · ')}</p>
                <div className="fruit-card-tags">
                  {fruit.tags.slice(0, 2).map(t => (
                    <span key={t} className="tag-chip tag-chip-sm">{t}</span>
                  ))}
                </div>
              </div>
              <div className="fruit-card-calories">
                {fruit.nutrition.calories}<span>kcal</span>
              </div>
            </div>
          )) : (
            <div className="empty-state">
              <p>No fruits match your filters.</p>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear filters</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
