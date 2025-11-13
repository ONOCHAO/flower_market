import { useEffect, useState } from "react";
import { API_URL } from "../api";

function Favorites({ user }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/favorites/${user.user_id}/`)
      .then(res => res.json())
      .then(data => setFavorites(data.favorites || []))
      .catch(err => console.error(err));
  }, [user]);

  // Функция для добавления тега в favorites
  const addFavorite = async (tag) => {
    if (!user) return;

    try {
      await fetch(`${API_URL}/favorites/${user.user_id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag }),
      });

      // Обновляем локальный state после добавления
      setFavorites(prev => prev.includes(tag) ? prev : [...prev, tag]);
    } catch (err) {
      console.error("Ошибка добавления в favorites", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ваши любимые товары / теги</h2>
      {favorites.length === 0 ? (
        <p>Пока нет любимых тегов</p>
      ) : (
        <ul>
          {favorites.map((tag, idx) => (
            <li key={idx}>{tag}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
