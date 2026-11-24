
import { useEffect, useState } from "react";
import api from "../api/api";

function Promos() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const getPromos = async () => {
      try {
        const response = await api.get("/api/promos");
        setPromos(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPromos();
  }, []);

  return (
    <div>
      <h1>Promotional Videos</h1>

      {promos.length === 0 ? (
        <p>No promotional videos available.</p>
      ) : (
        promos.map((promo) => (
          <div key={promo.id}>
            <h2>{promo.title}</h2>
            <p>{promo.description}</p>

            <video width="400" controls>
              <source src={promo.video_url} type="video/mp4" />
              Your browser does not support video.
            </video>

            <p><strong>Captions:</strong> {promo.caption_text}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Promos;
