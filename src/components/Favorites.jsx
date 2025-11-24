export default function Favorites({ favorites }) {
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
