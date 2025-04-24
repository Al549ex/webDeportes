import React, { useState, useEffect } from 'react';
import './MatchStats.css'; // Crearemos este archivo CSS a continuación

// Componente para visualizar las estadísticas del partido
function MatchStats({ matchId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMatchStats() {
      try {
        setLoading(true);
        
        // Aquí normalmente llamarías a tu API para obtener las estadísticas
        // Por ahora usaremos datos de muestra
        const demoStats = [
          {
            type: 'Posesión (%)',
            home: 58,
            away: 42
          },
          {
            type: 'Tiros',
            home: 15,
            away: 10
          },
          {
            type: 'Tiros a puerta',
            home: 7,
            away: 3
          },
          {
            type: 'Corners',
            home: 6,
            away: 4
          },
          {
            type: 'Faltas',
            home: 8,
            away: 12
          },
          {
            type: 'Tarjetas amarillas',
            home: 2,
            away: 3
          },
          {
            type: 'Tarjetas rojas',
            home: 0,
            away: 0
          },
          {
            type: 'Fueras de juego',
            home: 3,
            away: 2
          }
        ];
        
        // Simular un retraso en la carga para mostrar el estado de cargando
        setTimeout(() => {
          setStats(demoStats);
          setLoading(false);
        }, 800);
        
      } catch (err) {
        console.error("Error al cargar las estadísticas:", err);
        setError("No se pudieron cargar las estadísticas del partido");
        setLoading(false);
      }
    }
    
    fetchMatchStats();
  }, [matchId]);
  
  if (loading) {
    return (
      <div className="stats-loading">
        <div className="loader"></div>
        <p>Cargando estadísticas...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="stats-error">
        <p>{error}</p>
      </div>
    );
  }
  
  if (!stats || stats.length === 0) {
    return (
      <div className="stats-empty">
        <p>No hay estadísticas disponibles para este partido</p>
      </div>
    );
  }

  return (
    <div className="match-stats-container">
      <h3>Estadísticas del partido</h3>
      
      <div className="stats-list">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <div className="stat-home">{stat.home}</div>
            <div className="stat-type">{stat.type}</div>
            <div className="stat-away">{stat.away}</div>
            
            <div className="stat-bars">
              <div className="stat-bar home" style={{ width: `${stat.home / (stat.home + stat.away) * 100}%` }}></div>
              <div className="stat-bar away" style={{ width: `${stat.away / (stat.home + stat.away) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchStats;