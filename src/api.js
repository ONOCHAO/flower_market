const API_URL = "https://untheistically-solidillu-leif.ngrok-free.dev/api";


// Получение всех цветов
export const getFlowers = async () => {
  const res = await fetch(`${API_URL}/flowers/`);
  if (!res.ok) throw new Error("Ошибка загрузки цветов");
  return res.json();
};

// Регистрация пользователя
export const registerUser = async (login, password) => {
  const res = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });
  if (!res.ok) throw new Error("Ошибка регистрации");
  return res.json();
};

// Вход пользователя
export const loginUser = async (login, password) => {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });
  if (!res.ok) throw new Error("Неверный логин или пароль");
  return res.json();
};

// Добавление favorite
export const addFavorite = async (userId, tag) => {
  const res = await fetch(`${API_URL}/favorites/${userId}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tag }),
  });
  if (!res.ok) throw new Error("Ошибка добавления в favorites");
  return res.json();
};

// Получение favorites
export const getFavorites = async (userId) => {
  const res = await fetch(`${API_URL}/favorites/${userId}/`);
  if (!res.ok) throw new Error("Ошибка получения favorites");
  const data = await res.json();
  return data.favorites || [];
};

// Добавление заказа
export const addOrder = async (cart, total, userId) => {
  const res = await fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart, total, userId }),
  });
  if (!res.ok) throw new Error("Ошибка добавления заказа");
  return res.json();
};

// Получение всех заказов
export const getOrders = async () => {
  const res = await fetch(`${API_URL}/orders/`);
  if (!res.ok) throw new Error("Ошибка получения заказов");
  return res.json();
};
