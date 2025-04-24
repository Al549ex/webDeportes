import React, { useState } from 'react';
import MatchStats from './MatchStats';
import MatchLineups from './MatchLineups';
import MatchSummary from './MatchSummary';
import MatchPrediction from './MatchPrediction';
import './MatchTabs.css';

const MatchTabs = ({ matchId, match }) => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="match-tabs-container">
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Resumen
        </button>
        <button
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Estadísticas
        </button>
        <button
          className={`tab-button ${activeTab === 'lineups' ? 'active' : ''}`}
          onClick={() => setActiveTab('lineups')}
        >
          Alineaciones
        </button>
        <button
          className={`tab-button ${activeTab === 'prediction' ? 'active' : ''}`}
          onClick={() => setActiveTab('prediction')}
        >
          Predicción
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'summary' && <MatchSummary match={match} />}
        {activeTab === 'stats' && <MatchStats matchId={matchId} />}
        {activeTab === 'lineups' && <MatchLineups matchId={matchId} match={match} />}
        {activeTab === 'prediction' && <MatchPrediction matchId={matchId} teams={match?.teams} />}
      </div>
    </div>
  );
};

export default MatchTabs;