import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFlowers } from "../api";

function Main({ addToCart }) {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    getFlowers().then(data => setFlowers(data));
  }, []);

  return (
    <main className="main">
      <h2>🌼 Каталог цветов</h2>
      <div className="flower-list">
        {flowers.map(flower => (
          <div key={flower.id} className="flower-card">
            <Link to={`/flower/${flower.id}`}>
              <img src={flower.img} alt={flower.name} />
            </Link>
            <h3>{flower.name}</h3>
            <p className="price">{flower.price} ₽</p>
            <button onClick={() => addToCart(flower)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Main;
