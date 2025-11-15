import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import GameForm from './components/GameForm';
import ReviewSection from './components/ReviewSection';
import { Rating } from 'react-simple-star-rating';
import Dashboard from './components/Dashboard';

function App() {
  const [games, setGames] = useState([]);

  // Render API URL
  const API_URL = 'https://gametracker-backend-zrnt.onrender.com/api';

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${API_URL}/games`);
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  const handleGameAdded = (newGame) => {
    setGames([newGame, ...games]);
  };

  const handleToggleComplete = async (game) => {
    try {
      const response = await axios.put(
        `${API_URL}/games/${game._id}`,
        { completed: !game.completed }
      );

      setGames(games.map(g => 
        g._id === game._id ? response.data : g 
      ));
    } catch (error) {
      console.error("Error updating game status:", error);
    }
  };

  const handleDeleteGame = async (id) => {
    try {
      await axios.delete(`${API_URL}/games/${id}`);
      setGames(games.filter(game => game._id !== id));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleRatingChange = async (game, newRating) => {
    try {
      const response = await axios.put(
        `${API_URL}/games/${game._id}`,
        { rating: newRating }
      );
      
      setGames(games.map(g => 
        g._id === game._id ? response.data : g 
      ));
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className="App">
      <h1>Mi Biblioteca de Juegos</h1>
      
      <Dashboard games={games} />
      
      <GameForm onGameAdded={handleGameAdded} /> 
      
      <div className="game-list">

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
            
            <ReviewSection gameId={game._id} API_URL={API_URL} />
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;