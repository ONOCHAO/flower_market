import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFlowers } from "../api";

function FlowerDetail() {
  const { id } = useParams();
  const [flower, setFlower] = useState(null);

  useEffect(() => {
    getFlowers().then(data => {
      const f = data.find(f => f.id === Number(id));
      setFlower(f);
    });
  }, [id]);

  if (!flower) return <p>Цветок не найден 😔</p>;

  return (
    <main className="main">
      <div className="flower-detail">
        <img src={flower.img} alt={flower.name} className="detail-img" />
        <div className="detail-info">
          <h2>{flower.name}</h2>
          <p>{flower.description}</p>
          <h3>{flower.price} ₽</h3>
        </div>
      </div>
    </main>
  );
}

export default FlowerDetail;
