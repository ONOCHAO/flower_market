import React from "react";
import { Link } from "react-router-dom";

function Headers({ cart }) {
  return (
    <header className="header">
      <h1>Цветочный магазин</h1>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/cart">Корзина ({cart.length})</Link>
      </nav>
    </header>
  );
}

export default Headers;
