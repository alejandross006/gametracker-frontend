import React, { useState } from 'react';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';

// Este componente recibe una función 'onGameAdded' desde App.js
function GameForm({ onGameAdded }) {
  // Creamos un estado para cada campo del formulario
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
const [rating, setRating] = useState(1);
const [hoursPlayed, setHoursPlayed] = useState(0);
  // Esta función se ejecuta cuando el usuario envía el formulario

  const handleRating = (rate) => {
  setRating(rate);
};
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Creamos el objeto del nuevo juego
    const newGame = {
      title: title,
      cover: cover,
      rating: rating,
      hoursPlayed: hoursPlayed
    };

    try {
      // Hacemos un POST a nuestra API del backend
      const response = await axios.post('http://localhost:4000/api/games', newGame);
      
      // Si todo sale bien, llamamos a la función que nos pasó App.js
      // para añadir el nuevo juego (response.data) a la lista
      onGameAdded(response.data);

      // Limpiamos el formulario
      setTitle('');
      setCover('');
      setRating(1);
      setHoursPlayed(0);

    } catch (error) {
      console.error("Error al añadir el juego:", error);
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
      type="number" // El tipo "number" es importante
      value={hoursPlayed}
      onChange={(e) => setHoursPlayed(e.target.value)}
      min="0" // No permitir horas negativas
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
