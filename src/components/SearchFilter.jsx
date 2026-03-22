import { seasons, goals } from '../data/fruits.js';

export default function SearchFilter({ search, setSearch, seasonFilter, setSeasonFilter, goalFilter, setGoalFilter }) {
  return (
    <div className="filters-section">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search fruits..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select 
        className="filter-select"
        value={seasonFilter}
        onChange={(e) => setSeasonFilter(e.target.value)}
      >
        <option value="All Seasons">All Seasons</option>
        {seasons.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <select 
        className="filter-select"
        value={goalFilter}
        onChange={(e) => setGoalFilter(e.target.value)}
      >
        <option value="All Goals">All Goals</option>
        {goals.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
    </div>
  );
}
