export default function Headers({ user, cart, onLogout }) {
  return (
    <header className="header">
      <div className="logo">🌸 Flower Shop</div>
      <nav>
        <a href="/">Главная</a>
        <a href="/cart">Корзина ({cart.length})</a>
        <a href="/favorites">Избранное</a>
        {user && (
          <button onClick={onLogout} className="btn-logout">
            Выйти
          </button>
        )}
      </nav>
    </header>
  );
}
