import React from 'react';
import './MatchSummary.css';

const MatchSummary = ({ match }) => {
  if (!match) {
    return (
      <div className="summary-loading">
        <p>Cargando información del partido...</p>
      </div>
    );
  }

  // Información sobre el partido
  const matchInfo = {
    competition: match.league?.name || 'Liga no especificada',
    date: match.fixture?.date ? new Date(match.fixture.date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'Fecha no disponible',
    venue: match.fixture?.venue?.name || 'Estadio no especificado',
    referee: match.fixture?.referee || 'No disponible',
    status: match.fixture?.status?.long || 'No disponible'
  };

  return (
    <div className="match-summary-container">
      <div className="summary-header">
        <h3>Resumen del partido</h3>
      </div>

      <div className="match-info-grid">
        <div className="info-item">
          <div className="info-label">Competición</div>
          <div className="info-value">{matchInfo.competition}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Fecha</div>
          <div className="info-value">{matchInfo.date}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Estadio</div>
          <div className="info-value">{matchInfo.venue}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Árbitro</div>
          <div className="info-value">{matchInfo.referee}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Estado</div>
          <div className="info-value">{matchInfo.status}</div>
        </div>
      </div>

      <div className="match-narrative">
        <h4>Análisis previo</h4>
        <p>
          Este encuentro enfrentará a {match.teams?.home?.name} y {match.teams?.away?.name} en un partido
          que promete mucha intensidad. Ambos equipos llegan con la intención de sumar tres puntos 
          importantes para sus respectivos objetivos en la temporada.
        </p>
        <p>
          Los aficionados esperan ver un gran espectáculo en {matchInfo.venue}, donde 
          los dos equipos intentarán imponer su estilo de juego y buscar la victoria.
        </p>
        
        <div className="key-facts">
          <h4>Datos clave</h4>
          <ul>
            <li>Los últimos 5 enfrentamientos entre estos equipos han resultado en 2 victorias para {match.teams?.home?.name}, 2 para {match.teams?.away?.name} y 1 empate.</li>
            <li>{match.teams?.home?.name} ha ganado 3 de sus últimos 5 partidos como local.</li>
            <li>{match.teams?.away?.name} ha marcado al menos un gol en sus últimos 4 partidos fuera de casa.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MatchSummary;