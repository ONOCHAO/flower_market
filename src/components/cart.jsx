function Cart({ cart = [], removeFromCart, history = [], placeOrder }) {
  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <main className="main">
      <h2>🛒 Ваша корзина</h2>
      {cart.length === 0 && <p>Корзина пуста 😔</p>}

      {cart.length > 0 && (
        <div className="cart-list">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.img || ""} alt={item.name || "Товар"} />
              <div className="cart-info">
                <h3>{item.name || "Название не указано"}</h3>
                <p>{item.price ?? 0} ₽</p>
              </div>
              <button onClick={() => removeFromCart(index)}>Удалить</button>
            </div>
          ))}
          <h3 className="total">Итого: {total} ₽</h3>
          <button onClick={placeOrder}>Оформить заказ</button>
        </div>
      )}

      <h2>📜 История покупок</h2>
      {(!history || history.length === 0) ? (
        <p>Вы ещё ничего не покупали</p>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <p>
                {(item.items || []).map(f => f.name || "Без названия").join(", ")} — {item.total ?? 0} ₽ —{" "}
                {item.date ? new Date(item.date).toLocaleString() : "Дата неизвестна"}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Cart;
