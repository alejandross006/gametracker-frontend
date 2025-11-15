import React, { useState, useEffect } from 'react';
import axios from 'axios';

// La URL base de tu API (Render)
const API_BASE_URL = 'https://gametracker-backend-zrnt.onrender.com/api/reviews';

function ReviewSection({ gameId }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');

  // 1. Cargar las reseñas cuando el componente se monta
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Usamos la URL de Render
        const res = await axios.get(`${API_BASE_URL}/${gameId}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error al cargar reseñas:", error);
      }
    };
    fetchReviews();
  }, [gameId]);

  // 2. Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      // Hacemos el POST a la URL de Render
      const res = await axios.post(`${API_BASE_URL}/${gameId}`, { comment });
      
      // Añadimos la nueva reseña a la lista
      setReviews([res.data, ...reviews]);
      setComment(''); // Limpiamos el campo
    } catch (error) {
      console.error("Error al añadir reseña:", error);
    }
  };

  // 3. Renderizar (dibujar)
  return (
    <div className="review-section">
      <h4>Reseñas</h4>
      
      {/* Formulario para añadir reseña */}
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe tu reseña..."
          rows="3"
        ></textarea>
        <button type="submit">Publicar Reseña</button>
      </form>

      {/* Lista de reseñas */}
      <div className="review-list">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review._id} className="review-item">
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No hay reseñas para este juego todavía.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewSection;