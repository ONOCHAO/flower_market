import { useState } from "react";
import axios from "axios";
import './loginregister.css';

export default function LoginRegister({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ login: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "https://untheistically-solidillu-leif.ngrok-free.dev/api/login/"
        : "https://untheistically-solidillu-leif.ngrok-free.dev/api/register/";

      const res = await axios.post(url, {
        login: form.login,
        password: form.password,
      });

      console.log("Ответ сервера:", res.data); // <-- проверяем что приходит

      if (res.data.user_id) {
        // Сохраняем пользователя
        setUser({ user_id: res.data.user_id, login: form.login });
        localStorage.setItem(
          "user",
          JSON.stringify({ user_id: res.data.user_id, login: form.login })
        );
        alert(isLogin ? "Вход выполнен!" : "Регистрация успешна!");
      } else if (res.data.error) {
        alert(res.data.error); // показываем ошибку от сервера
      }

    } catch (err) {
      console.error("Ошибка запроса:", err);
      alert(err.response?.data?.error || "Ошибка сервера");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
        <input
          type="text"
          name="login"
          placeholder="Логин"
          value={form.login}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</button>
        <p className="switch-mode" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
        </p>
      </form>
    </div>
  );
}
