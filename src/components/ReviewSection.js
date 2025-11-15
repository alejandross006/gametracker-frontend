import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Recibimos el ID del juego (gameId) desde App.js
function ReviewSection({ gameId }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState(''); // Estado para el formulario

  // 1. Cargar las reseñas cuando el componente se monta
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/reviews/${gameId}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error al cargar reseñas:", error);
      }
    };
    fetchReviews();
  }, [gameId]); // Se ejecuta cada vez que el gameId cambie

  // 2. Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return; // No enviar reseñas vacías

    try {
      const res = await axios.post(`http://localhost:4000/api/reviews/${gameId}`, { comment });
      
      // Añadimos la nueva reseña a la lista (la más nueva primero)
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