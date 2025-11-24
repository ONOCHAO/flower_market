import './cart.css';
import axios from "axios";

export default function Cart({ cart, setCart, userId, placeOrder }) {

  const total = cart.reduce((acc, item) => acc + Number(item?.price || 0), 0);

  const removeFromCart = async (idx) => {
    const newCart = [...cart];
    newCart.splice(idx, 1);
    setCart(newCart);

    try {
      await axios.post(`https://untheistically-solidillu-leif.ngrok-free.dev/api/update_cart/${userId}/`, { cart: newCart });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder(); // оставляем существующую функцию оформления заказа
      await axios.post(`https://untheistically-solidillu-leif.ngrok-free.dev/api/update_cart/${userId}/`, { cart: [] }); // очищаем корзину в базе
      setCart([]);
      alert("Заказ успешно оформлен!");
    } catch (err) {
      alert(err.response?.data?.error || "Ошибка оформления заказа");
    }
  };

  return (
    <div className="flowers-page">
      <div className="hero">
        <h2 className="hero-title">🛒 Ваша корзина</h2>
        <p className="hero-subtitle">Здесь вы видите выбранные товары</p>
      </div>

      {(!cart || cart.length === 0) ? (
        <p className="empty-cart">Корзина пуста</p>
      ) : (
        <>
          <div className="flowers-grid">
            {cart.map((item, idx) => (
              <div key={idx} className="flower-card">
                <div className="flower-image-wrapper">
                  <img src={item.image || 'https://via.placeholder.com/300'} alt={item.name || 'Товар'} className="flower-image"/>
                </div>
                <div className="flower-content">
                  <h3>{item.name}</h3>
                  <p className="flower-description">{item.description}</p>
                  <div className="flower-footer">
                    <span className="flower-price">{Number(item.price).toFixed(2)} ₽</span>
                    <button className="btn-buy" onClick={() => removeFromCart(idx)}>Удалить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h3 className="flower-price">Итого: {total.toFixed(2)} ₽</h3>
            <button className="btn-buy order-btn" onClick={handlePlaceOrder}>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
}
