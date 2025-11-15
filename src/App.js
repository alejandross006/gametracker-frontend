import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import GameForm from './components/GameForm';
import ReviewSection from './components/ReviewSection';
import { Rating } from 'react-simple-star-rating';
import Dashboard from './components/Dashboard';
function App() {
  const [games, setGames] = useState([]);


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://gametracker-backend-zrnt.onrender.com');
        setGames(response.data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
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
        `https://gametracker-backend-zrnt.onrender.com/${game._id}`,
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
      await axios.delete(`https://gametracker-backend-zrnt.onrender.com/${id}`);
      setGames(games.filter(game => game._id !== id));
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
    }
  };

  // Función para CAMBIAR PUNTUACIÓN 
  const handleRatingChange = async (game, newRating) => {
    try {
      const response = await axios.put(
        `https://gametracker-backend-zrnt.onrender.com/${game._id}`,
        { rating: newRating }
      );
      
      setGames(games.map(g => 
        g._id === game._id ? response.data : g 
      ));
    } catch (error) {
      console.error("Error al actualizar la puntuación:", error);
    }
  };

  // 3. Renderizamos 
  return (
    <div className="App">
      <h1>Mi Biblioteca de Juegos </h1>
      
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
            

            <ReviewSection gameId={game._id} />
            
          </div>
        ))}
 

      </div>
    </div>
  );
}

export default App;