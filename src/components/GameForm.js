import React, { useState } from 'react';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
const API_URL = 'https://gametracker-backend-zrnt.onrender.com/api';

function GameForm({ onGameAdded }) {
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [rating, setRating] = useState(5);
  const [hoursPlayed, setHoursPlayed] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGame = {
      title: title,
      cover: cover,
      rating: rating,
      hoursPlayed: parseInt(hoursPlayed) || 0,
    };

    try {
      const response = await axios.post(API_URL, newGame);
      
      onGameAdded(response.data);

      setTitle('');
      setCover('');
      setRating(5);
      setHoursPlayed(0);

    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <h3>Añadir Nuevo Juego</h3>
      
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>URL de la Portada:</label>
        <input
          type="text"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Horas Jugadas:</label>
        <input
          type="number"
          value={hoursPlayed}
          onChange={(e) => setHoursPlayed(e.target.value)}
          min="0"
        />
      </div>

      <div>
        <label>Puntuación:</label>
        <Rating
          onClick={handleRating}
          initialValue={rating}
          size={25}
        />
      </div>

      <button type="submit">Añadir Juego</button>
    </form>
  );
}

export default GameForm;