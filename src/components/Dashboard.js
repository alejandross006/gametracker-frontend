import React from 'react';

function Dashboard({ games }) {


  // 1. Total de Juegos
  const totalGames = games.length;

  // 2. Juegos Completados
  const completedGames = games.filter(game => game.completed).length;

  // 3. Total de Horas Jugadas
  const totalHours = games.reduce((acc, game) => acc + game.hoursPlayed, 0);

  // 4. Puntuación Promedio
  const totalRating = games.reduce((acc, game) => acc + game.rating, 0);
  const averageRating = totalGames > 0 ? (totalRating / totalGames).toFixed(1) : 0;


  // --- Renderizado ---
  return (
    <div className="dashboard">
      <h3>Mis Estadísticas</h3>
      <div className="stats-container">
        <div className="stat-box">
          <span className="stat-value">{totalGames}</span>
          <span className="stat-label">Juegos Totales</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{completedGames}</span>
          <span className="stat-label">Juegos Completados</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{totalHours}</span>
          <span className="stat-label">Horas Totales</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{averageRating} ⭐</span>
          <span className="stat-label">Puntuación Promedio</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;