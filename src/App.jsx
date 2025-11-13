import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Headers from "./components/header";
import Main from "./components/mainnew";
import Cart from "./components/cart";
import Favorites from "./components/Favorites";
import Footer from "./components/footer";
import LoginRegister from "./components/LoginRegister";
import { addOrder, getOrders, addFavorite } from "./api";
import "./App.css";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Загружаем историю заказов и favorites после входа
  useEffect(() => {
    if (user) {
      getOrders(user.user_id).then((data) => setHistory(data));
      // Загрузка favorites
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/favorites/${user.user_id}/`);
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.favorites || []);
      }
    } catch (err) {
      console.error("Ошибка загрузки favorites:", err);
    }
  };

  // Добавление товара в корзину и запись тега в favorites (аналитика кликов)
  const addToCart = async (flower) => {
    setCart((prev) => [...prev, flower]);

    if (user && user.user_id) {
      try {
        const data = await addFavorite(user.user_id, flower.name);
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error("Ошибка добавления в favorites:", err);
      }
    }
  };

  const removeFromCart = (index) => setCart((prev) => prev.filter((_, i) => i !== index));

  // Оформление заказа
  const placeOrder = async () => {
    if (cart.length === 0) return alert("Корзина пуста!");

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    const order = await addOrder(user.user_id, cart, total);

    // Добавляем купленные товары как теги в favorites
    for (let item of cart) {
      try {
        const data = await addFavorite(user.user_id, item.name);
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error("Ошибка добавления купленного товара в favorites:", err);
      }
    }

    setHistory((prev) => [order, ...prev]);
    setCart([]);
    alert("Заказ успешно оформлен!");
  };

  // Если пользователь не залогинен — показываем страницу входа/регистрации
  if (!user) {
    return <LoginRegister setUser={setUser} />;
  }

  return (
    <Router>
      <div className="app min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
        <Headers user={user} cart={cart} />

        <Routes>
          <Route path="/" element={<Main addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                history={history}
                placeOrder={placeOrder}
              />
            }
          />
          <Route path="/favorites" element={<Favorites user={user} favorites={favorites} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
