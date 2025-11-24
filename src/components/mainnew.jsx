import React, { useEffect, useState } from "react";
import { getFlowers } from "../api";
import "./Flowers.css"; // стили здесь

export default function Main({ addToCart }) {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    getFlowers()
      .then((data) => setFlowers(data))
      .catch((err) => console.error("Ошибка загрузки цветов:", err));
  }, []);

  return (
    <main className="flowers-page">
      <section className="hero">
        <h1 className="hero-title">Свежие цветы каждый день</h1>
        <p className="hero-subtitle">
          Выберите идеальный букет для любого случая 🌸
        </p>
      </section>

      <div className="flowers-grid">
        {flowers.map((flower) => (
          <div key={flower.id} className="flower-card">
            <div className="flower-image-wrapper">
              <img
                src={flower.image}
                alt={flower.name}
                className="flower-image"
              />
            </div>

            <div className="flower-content">
              <h3>{flower.name}</h3>
              <p className="flower-description">{flower.description}</p>

              <div className="flower-footer">
                <span className="flower-price">{flower.price} ₽</span>
                <button className="btn-buy" onClick={() => addToCart(flower)}>
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
