import React, { useState } from 'react';
import './MatchLineups.css';

const MatchLineups = ({ matchId, match }) => {
  const [activeTeam, setActiveTeam] = useState('home');
  
  if (!match) {
    return <div className="no-lineup-message">No hay datos disponibles para mostrar alineaciones</div>;
  }
  
  // Datos de ejemplo para alineaciones - en un caso real, estos vendrían de la API
  const lineups = {
    home: {
      formation: "4-3-3",
      startXI: [
        { number: 1, name: "Courtois", position: "GK" },
        { number: 2, name: "Carvajal", position: "RB" },
        { number: 4, name: "Ramos", position: "CB" },
        { number: 5, name: "Varane", position: "CB" },
        { number: 12, name: "Marcelo", position: "LB" },
        { number: 14, name: "Casemiro", position: "CDM" },
        { number: 8, name: "Kroos", position: "CM" },
        { number: 10, name: "Modric", position: "CM" },
        { number: 7, name: "Hazard", position: "LW" },
        { number: 9, name: "Benzema", position: "ST" },
        { number: 11, name: "Asensio", position: "RW" }
      ],
      substitutes: [
        { number: 13, name: "Lunin", position: "GK" },
        { number: 3, name: "Militão", position: "CB" },
        { number: 23, name: "Mendy", position: "LB" },
        { number: 15, name: "Valverde", position: "CM" },
        { number: 22, name: "Isco", position: "CAM" },
        { number: 20, name: "Vinicius Jr.", position: "LW" },
        { number: 24, name: "Mariano", position: "ST" }
      ],
      coach: "Carlo Ancelotti"
    },
    away: {
      formation: "4-2-3-1",
      startXI: [
        { number: 1, name: "Ter Stegen", position: "GK" },
        { number: 2, name: "Dest", position: "RB" },
        { number: 3, name: "Piqué", position: "CB" },
        { number: 15, name: "Lenglet", position: "CB" },
        { number: 18, name: "Alba", position: "LB" },
        { number: 5, name: "Busquets", position: "CDM" },
        { number: 8, name: "De Jong", position: "CM" },
        { number: 10, name: "Messi", position: "CAM" },
        { number: 7, name: "Griezmann", position: "RW" },
        { number: 9, name: "Depay", position: "ST" },
        { number: 17, name: "Trincão", position: "LW" }
      ],
      substitutes: [
        { number: 13, name: "Neto", position: "GK" },
        { number: 4, name: "Araujo", position: "CB" },
        { number: 24, name: "Garcia", position: "CB" },
        { number: 20, name: "Roberto", position: "RB" },
        { number: 16, name: "Pedri", position: "CM" },
        { number: 19, name: "Aguero", position: "ST" },
        { number: 11, name: "Dembélé", position: "RW" }
      ],
      coach: "Xavi Hernández"
    }
  };
  
  const currentLineup = lineups[activeTeam];
  const teamName = activeTeam === 'home' ? match.teams.home.name : match.teams.away.name;

  return (
    <div className="match-lineups-container">
      <div className="lineups-selector">
        <button
          className={`team-selector ${activeTeam === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTeam('home')}
        >
          {match.teams.home.name}
        </button>
        <button
          className={`team-selector ${activeTeam === 'away' ? 'active' : ''}`}
          onClick={() => setActiveTeam('away')}
        >
          {match.teams.away.name}
        </button>
      </div>
      
      <div className="lineup-details">
        <div className="lineup-header">
          <h3>{teamName}</h3>
          <div className="formation">{currentLineup.formation}</div>
        </div>
        
        <div className="lineup-field">
          {currentLineup.startXI.map((player, index) => (
            <div className="player-marker" key={index} style={{
              gridColumn: getPlayerColumn(player.position, currentLineup.formation, index),
              gridRow: getPlayerRow(player.position, currentLineup.formation)
            }}>
              <div className="player-number">{player.number}</div>
              <div className="player-name">{player.name}</div>
            </div>
          ))}
        </div>
        
        <div className="bench-players">
          <h4>Suplentes</h4>
          <div className="bench-list">
            {currentLineup.substitutes.map((player, index) => (
              <div className="bench-player" key={index}>
                <div className="bench-player-number">{player.number}</div>
                <div>{player.name} <span className="player-position">({player.position})</span></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="coach-info">
          <span className="coach-title">Entrenador:</span>
          <span className="coach-name">{currentLineup.coach}</span>
        </div>
      </div>
    </div>
  );
};

// Funciones auxiliares para posicionar jugadores en la formación
function getPlayerRow(position, formation) {
  if (position === 'GK') return 4;
  if (position === 'CB' || position === 'RB' || position === 'LB') return 3;
  if (position === 'CDM' || position === 'CM' || position === 'CAM') return 2;
  return 1; // FW, ST, LW, RW
}

function getPlayerColumn(position, formation, index) {
  // Posicionamiento simplificado para el ejemplo
  if (position === 'GK') return 2;
  if (position === 'LB' || position === 'LW') return 1;
  if (position === 'RB' || position === 'RW') return 4;
  if (position === 'CB') {
    // Distribuir los centrales
    return index % 2 === 0 ? 2 : 3;
  }
  // Distribuir mediocampistas
  if (position.includes('CM') || position.includes('DM') || position.includes('AM')) {
    if (index % 3 === 0) return 1;
    if (index % 3 === 1) return 2;
    return 4;
  }
  // Delanteros
  return index % 2 === 0 ? 2 : 3;
}

export default MatchLineups;