import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Headers from "./components/header";
import Main from "./components/mainnew";
import Cart from "./components/cart";
import Favorites from "./components/Favorites";
import Footer from "./components/footer";
import LoginRegister from "./components/LoginRegister";
import "./App.css";

const API_URL = "https://untheistically-solidillu-leif.ngrok-free.dev/api";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  // Функция выхода
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCart([]);
    setFavorites([]);
    setHistory([]);

    navigate("/login"); // <-- Переход на страницу логина
  };

  useEffect(() => {
    if (user?.user_id) fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/get_cart/${user.user_id}/`);
      setCart(res.data.cart || []);
      setFavorites(res.data.favorites || []);
      setHistory(res.data.orders || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (item) => {
    const newCart = [...cart, item];
    setCart(newCart);

    if (user?.user_id) {
      try {
        await axios.post(`${API_URL}/update_cart/${user.user_id}/`, { cart: newCart });
        if (!favorites.includes(item.name)) {
          await axios.post(`${API_URL}/favorites/${user.user_id}/`, { tag: item.name });
          setFavorites((prev) => [...prev, item.name]);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const removeFromCart = async (idx) => {
    const newCart = cart.filter((_, i) => i !== idx);
    setCart(newCart);

    if (user?.user_id) {
      try {
        await axios.post(`${API_URL}/update_cart/${user.user_id}/`, { cart: newCart });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const placeOrder = async () => {
    if (!cart.length) return alert("Корзина пуста!");
    try {
      await axios.post(`${API_URL}/update_cart/${user.user_id}/`, {
        cart: [],
        orders: [...history, ...cart],
      });
      setHistory((prev) => [...prev, ...cart]);
      setCart([]);
      alert("Заказ успешно оформлен!");
    } catch (err) {
      alert(err.response?.data?.error || "Ошибка оформления заказа");
    }
  };

  // Если пользователь не авторизован — показываем страничку логина
  if (!user) {
    return <LoginRegister setUser={setUser} />;
  }

  return (
    <div className="app min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      <Headers user={user} cart={cart} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Main addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              userId={user.user_id}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          }
        />
        <Route path="/favorites" element={<Favorites user={user} favorites={favorites} />} />

        {/* Страница входа */}
        <Route path="/login" element={<LoginRegister />} />
      </Routes>

      <Footer />
    </div>
  );
}
