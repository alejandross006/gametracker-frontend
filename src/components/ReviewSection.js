import React, { useState, useEffect } from 'react';
import axios from 'axios';

// El componente ahora recibe la URL base
function ReviewSection({ gameId, API_BASE_URL }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');

  // 1. Cargar las reseñas cuando el componente se monta
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Usamos la URL base + el endpoint /reviews
        const res = await axios.get(`${API_BASE_URL}/reviews/${gameId}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [gameId, API_BASE_URL]);

  // 2. Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      // Hacemos el POST a la URL de Render
      const res = await axios.post(`${API_BASE_URL}/reviews/${gameId}`, { comment });
      
      setReviews([res.data, ...reviews]);
      setComment('');
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // 3. Renderizar (dibujar)
  return (
    <div className="review-section">
      <h4>Reseñas</h4>
      
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe tu reseña..."
          rows="3"
        ></textarea>
        <button type="submit">Publicar Reseña</button>
      </form>

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