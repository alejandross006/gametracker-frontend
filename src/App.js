import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import GameForm from './components/GameForm';
import ReviewSection from './components/ReviewSection';
import { Rating } from 'react-simple-star-rating';
import Dashboard from './components/Dashboard';

function App() {
  const [games, setGames] = useState([]);

  // URL de la API de Render
  const API_URL = 'https://gametracker-backend-zrnt.onrender.com/api/games';

  // Se ejecuta una vez para cargar los juegos iniciales
  useEffect(() => {
    const fetchGames = async () => {
      try {
        
        const response = await axios.get(API_URL);
        setGames(response.data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };
    fetchGames();
  }, []);

  // Función para AÑADIR un juego (viene del formulario)
  const handleGameAdded = (newGame) => {
    setGames([newGame, ...games]);
  };

  // Función para ACTUALIZAR un juego (completado/no completado)
  const handleToggleComplete = async (game) => {
    try {
      const response = await axios.put(
        `${API_URL}/${game._id}`, 
        { completed: !game.completed }
      );

      setGames(games.map(g => 
        g._id === game._id ? response.data : g 
      ));
    } catch (error) {
      console.error("Error al actualizar el juego:", error);
    }
  };

  // Función para ELIMINAR un juego
  const handleDeleteGame = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); 
      setGames(games.filter(game => game._id !== id));
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
    }
  };

  // Función para CAMBIAR PUNTUACIÓN (rating)
  const handleRatingChange = async (game, newRating) => {
    try {
      const response = await axios.put(
        `${API_URL}/${game._id}`, 
        { rating: newRating }
      );
      
      setGames(games.map(g => 
        g._id === game._id ? response.data : g 
      ));
    } catch (error) {
      console.error("Error al actualizar la puntuación:", error);
    }
  };

  // 3. Renderizamos (dibujamos) la página
  return (
    <div className="App">
      <h1>Mi Biblioteca de Juegos</h1>
      
      {/* Dashboard (Estadísticas) */}
      <Dashboard games={games} />
 
      {/* Formulario */}
      <GameForm onGameAdded={handleGameAdded} />
      
      <div className="game-list">

        {/* --- Este es el ÚNICO bucle .map que debe haber --- */}
        {/* CORREGIDO: Faltaban los paréntesis en games.map */}
        {games.map(game => ( 
          
          <div key={game._id} className="game-card">
            
            <img src={game.cover} alt={game.title} className="game-cover" />
            <h2>{game.title}</h2>
            
            <p className="game-hours">{game.hoursPlayed} horas jugadas</p>

            <div className="rating-container">
              <Rating
                onClick={(rate) => handleRatingChange(game, rate)}
                initialValue={game.rating}
                size={20}
                readonly={false}
              />
            </div>
            
            <button 
              onClick={() => handleToggleComplete(game)}
              className="complete-btn"
            >
              {game.completed ? 'Completado' : 'Marcar como Completado'}
            </button>
            
            <button 
              onClick={() => handleDeleteGame(game._id)}
              className="delete-btn"
            >
              Eliminar
            </button>
            
            <ReviewSection gameId={game._id} />
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
