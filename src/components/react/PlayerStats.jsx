import React, { useState, useEffect } from 'react';

export default function PlayerStats({ playerId }) {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Aquí harías la llamada real a tu API de OptaPlayerStats
    // Por ahora, usamos datos de ejemplo
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        
        // Simular una llamada API
        setTimeout(() => {
          const mockData = {
            id: playerId,
            name: "Nombre Jugador",
            team: "Equipo FC",
            position: "Delantero",
            stats: {
              matches: 24,
              goals: 12,
              assists: 7,
              shotsOnTarget: 38,
              passAccuracy: 78,
              lastMatches: [
                { opponent: "Equipo A", goals: 1, assists: 1, shots: 4 },
                { opponent: "Equipo B", goals: 0, assists: 0, shots: 2 },
                { opponent: "Equipo C", goals: 2, assists: 0, shots: 5 },
                { opponent: "Equipo D", goals: 0, assists: 1, shots: 3 },
                { opponent: "Equipo E", goals: 1, assists: 0, shots: 3 },
              ]
            }
          };
          
          setPlayerData(mockData);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError("Error al cargar los datos del jugador");
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  if (loading) return <div>Cargando estadísticas del jugador...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!playerData) return <div>No se encontraron datos para este jugador</div>;

  return (
    <div className="player-stats-container">
      <div className="player-header">
        <h2>{playerData.name}</h2>
        <div className="player-meta">
          <span>{playerData.team}</span> • <span>{playerData.position}</span>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <div className="stat-value">{playerData.stats.goals}</div>
          <div className="stat-label">Goles</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{playerData.stats.assists}</div>
          <div className="stat-label">Asistencias</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{playerData.stats.shotsOnTarget}</div>
          <div className="stat-label">Tiros a puerta</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{playerData.stats.passAccuracy}%</div>
          <div className="stat-label">Precisión pases</div>
        </div>
      </div>

      <div className="recent-form">
        <h3>Últimos partidos</h3>
        <table className="matches-table">
          <thead>
            <tr>
              <th>Rival</th>
              <th>Goles</th>
              <th>Asist.</th>
              <th>Tiros</th>
            </tr>
          </thead>
          <tbody>
            {playerData.stats.lastMatches.map((match, index) => (
              <tr key={index}>
                <td>{match.opponent}</td>
                <td>{match.goals}</td>
                <td>{match.assists}</td>
                <td>{match.shots}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}