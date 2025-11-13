import React, { useState } from "react";

export default function LoginRegister({ setUser }) {
  const [isLogin, setIsLogin] = useState(true); // переключение между входом и регистрацией
  const [form, setForm] = useState({ login: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const url = isLogin
      ? "http://127.0.0.1:8000/api/login/"
      : "http://127.0.0.1:8000/api/register/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.user_id) {
        // Сохраняем пользователя в App.jsx через setUser
        setUser({ login: form.login, id: data.user_id });
      } else {
        // Выводим ошибку
        setMessage(data.error || data.message || "Ошибка");
      }
    } catch (err) {
      setMessage("Ошибка сервера");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-2xl shadow-xl w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Вход" : "Регистрация"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="login"
            placeholder="Логин"
            value={form.login}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-sm text-red-500">{message}</p>
        )}

        <p
          className="mt-4 text-blue-500 text-center cursor-pointer"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage(""); // очищаем сообщение при смене формы
          }}
        >
          {isLogin
            ? "Нет аккаунта? Зарегистрироваться"
            : "Уже есть аккаунт? Войти"}
        </p>
      </div>
    </div>
  );
}
