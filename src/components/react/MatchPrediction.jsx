import React, { useState, useEffect } from 'react';
import './MatchPrediction.css';

const MatchPrediction = ({ matchId, teams }) => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // En un caso real, aquí obtendríamos los datos de predicción desde una API
    const loadPrediction = () => {
      // Simulando carga de datos
      setTimeout(() => {
        // Datos ficticios de predicción
        setPrediction({
          homeWin: 45,
          draw: 25,
          awayWin: 30,
          expectedGoalsHome: 1.8,
          expectedGoalsAway: 1.3,
          homeForm: [
            { result: 'W', score: '2-0' },
            { result: 'W', score: '3-1' },
            { result: 'D', score: '1-1' },
            { result: 'L', score: '0-2' },
            { result: 'W', score: '2-1' }
          ],
          awayForm: [
            { result: 'W', score: '2-0' },
            { result: 'L', score: '1-3' },
            { result: 'W', score: '2-1' },
            { result: 'W', score: '1-0' },
            { result: 'D', score: '0-0' }
          ],
          h2h: [
            { winner: 'home', score: '2-1', date: '2022-11-15' },
            { winner: 'away', score: '0-3', date: '2022-05-08' },
            { winner: 'draw', score: '1-1', date: '2021-12-04' },
            { winner: 'home', score: '4-0', date: '2021-04-10' },
            { winner: 'away', score: '1-2', date: '2020-11-21' }
          ]
        });
        setLoading(false);
      }, 1000);
    };
    
    loadPrediction();
  }, [matchId]);
  
  if (loading) {
    return (
      <div className="prediction-loading">
        <div className="loader"></div>
        <p>Analizando datos y calculando predicción...</p>
      </div>
    );
  }
  
  if (!teams) {
    return (
      <div className="prediction-error">
        <p>No se pueden mostrar predicciones sin datos de equipos</p>
      </div>
    );
  }

  return (
    <div className="match-prediction-container">
      <div className="prediction-header">
        <h3>Predicción del partido</h3>
        <p className="prediction-disclaimer">
          Basada en estadísticas históricas y rendimiento reciente
        </p>
      </div>
      
      <div className="prediction-probabilities">
        <div className="probability-item">
          <div className="team-name">{teams.home.name}</div>
          <div className="probability-bar">
            <div className="probability home" style={{ width: `${prediction.homeWin}%` }}></div>
          </div>
          <div className="probability-value">{prediction.homeWin}%</div>
        </div>
        
        <div className="probability-item">
          <div className="team-name">Empate</div>
          <div className="probability-bar">
            <div className="probability draw" style={{ width: `${prediction.draw}%` }}></div>
          </div>
          <div className="probability-value">{prediction.draw}%</div>
        </div>
        
        <div className="probability-item">
          <div className="team-name">{teams.away.name}</div>
          <div className="probability-bar">
            <div className="probability away" style={{ width: `${prediction.awayWin}%` }}></div>
          </div>
          <div className="probability-value">{prediction.awayWin}%</div>
        </div>
      </div>
      
      <div className="expected-goals">
        <h4>Goles esperados (xG)</h4>
        <div className="xg-container">
          <div className="team-xg">
            <div className="team-name">{teams.home.name}</div>
            <div className="xg-value">{prediction.expectedGoalsHome}</div>
          </div>
          <div className="team-xg">
            <div className="team-name">{teams.away.name}</div>
            <div className="xg-value">{prediction.expectedGoalsAway}</div>
          </div>
        </div>
      </div>
      
      <div className="form-comparison">
        <h4>Forma reciente</h4>
        <div className="form-grid">
          <div className="team-form">
            <div className="team-name">{teams.home.name}</div>
            <div className="form-indicators">
              {prediction.homeForm.map((match, i) => (
                <div key={i} className={`form-indicator ${match.result.toLowerCase()}`} title={match.score}>
                  {match.result}
                </div>
              ))}
            </div>
          </div>
          
          <div className="team-form">
            <div className="team-name">{teams.away.name}</div>
            <div className="form-indicators">
              {prediction.awayForm.map((match, i) => (
                <div key={i} className={`form-indicator ${match.result.toLowerCase()}`} title={match.score}>
                  {match.result}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="head-to-head">
        <h4>Historial reciente entre equipos</h4>
        <div className="h2h-list">
          {prediction.h2h.map((match, i) => (
            <div key={i} className={`h2h-match ${match.winner}`}>
              <div className="h2h-date">
                {new Date(match.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
              <div className="h2h-result">
                {match.score}
              </div>
              <div className="h2h-winner">
                {match.winner === 'home' ? teams.home.name : 
                 match.winner === 'away' ? teams.away.name : 'Empate'}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .match-prediction-container {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 1rem 0;
        }

        .prediction-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .prediction-header h3 {
          margin-bottom: 0.5rem;
        }

        .prediction-disclaimer {
          color: #6c757d;
          font-size: 0.9rem;
          font-style: italic;
        }

        .prediction-probabilities {
          margin-bottom: 2.5rem;
        }

        .probability-item {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .probability-item .team-name {
          width: 120px;
          font-weight: 500;
          text-align: right;
          padding-right: 1rem;
        }

        .probability-bar {
          height: 25px;
          flex-grow: 1;
          background-color: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
          margin-right: 1rem;
        }

        .probability {
          height: 100%;
          transition: width 1s ease-in-out;
        }

        .probability.home {
          background-color: #1a2a6c;
        }

        .probability.draw {
          background-color: #4b5563;
        }

        .probability.away {
          background-color: #b21f1f;
        }

        .probability-value {
          width: 50px;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .expected-goals {
          background-color: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .expected-goals h4 {
          margin-bottom: 1rem;
          text-align: center;
        }

        .xg-container {
          display: flex;
          justify-content: space-around;
        }

        .team-xg {
          text-align: center;
        }

        .team-xg .team-name {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .xg-value {
          font-size: 2rem;
          font-weight: bold;
        }

        .form-comparison {
          margin-bottom: 2rem;
        }

        .form-comparison h4 {
          margin-bottom: 1rem;
          text-align: center;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .team-form {
          background-color: #fff;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .team-form .team-name {
          margin-bottom: 1rem;
          font-weight: 500;
          text-align: center;
        }

        .form-indicators {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .form-indicator {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: bold;
          font-size: 0.8rem;
          color: white;
        }

        .form-indicator.w {
          background-color: #10b981;
        }

        .form-indicator.d {
          background-color: #f59e0b;
        }

        .form-indicator.l {
          background-color: #ef4444;
        }

        .head-to-head h4 {
          margin-bottom: 1rem;
          text-align: center;
        }

        .h2h-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .h2h-match {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-radius: 4px;
          background-color: #f8f9fa;
        }

        .h2h-match.home {
          border-left: 3px solid #1a2a6c;
        }

        .h2h-match.away {
          border-left: 3px solid #b21f1f;
        }

        .h2h-match.draw {
          border-left: 3px solid #4b5563;
        }

        .h2h-date {
          width: 110px;
          font-size: 0.85rem;
          color: #6c757d;
        }

        .h2h-result {
          width: 60px;
          font-weight: bold;
          text-align: center;
        }

        .h2h-winner {
          flex-grow: 1;
        }

        .prediction-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 0;
        }

        .loader {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #1a2a6c;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .prediction-error {
          color: #721c24;
          background-color: #f8d7da;
          padding: 1rem;
          border-radius: 4px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .xg-container {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .probability-item .team-name {
            width: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default MatchPrediction;