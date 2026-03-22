import { getTodayFruit } from '../data/fruits.js';
import { useNavigate } from 'react-router-dom';

export default function DailyRecommendation() {
  const fruit = getTodayFruit();
  const navigate = useNavigate();

  return (
    <div className="daily-card" onClick={() => navigate(`/fruit/${fruit.id}`)} style={{ cursor: 'pointer' }}>
      <img src={fruit.image} alt={fruit.name} className="daily-image" />
      <div className="daily-content">
        <h2>Fruit of the Day</h2>
        <h3>{fruit.name}</h3>
        <p>{fruit.benefits[0]} • Best in {fruit.seasons[0]}</p>
      </div>
    </div>
  );
}
