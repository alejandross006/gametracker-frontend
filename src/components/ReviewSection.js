import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewSection({ gameId }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState(''); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://gametracker-backend-zrnt.onrender.com/${gameId}`);
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
      const res = await axios.post(`https://gametracker-backend-zrnt.onrender.com/${gameId}`, { comment });
      
      
      setReviews([res.data, ...reviews]);
      setComment(''); 
    } catch (error) {
      console.error("Error al añadir reseña:", error);
    }
  };

  // 3. Renderizar 
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