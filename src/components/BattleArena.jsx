import React, { useState, useEffect } from 'react';
import '../styles/BattleArena.css';

const BattleArena = ({ isActive, arenaNumber }) => {
  const [fighters, setFighters] = useState([]);
  const [eliminatedFighters, setEliminatedFighters] = useState([]);

  return (
    <div className={`battle-arena ${isActive ? 'active' : ''}`}>
      <div className="arena-header">
        <h3>Arena {arenaNumber}</h3>
        {isActive && <span className="live-badge">LIVE</span>}
      </div>

      <div className="battle-ground">
        {/* Active fighters */}
        <div className="fighters-container">
          {fighters.map((fighter) => (
            <div 
              key={fighter.id} 
              className={`fighter ${fighter.isAlive ? 'alive' : 'dead'}`}
            >
              <img src={fighter.avatar} alt={fighter.name} />
              <span className="fighter-name">{fighter.name}</span>
            </div>
          ))}
        </div>

        {/* Eliminated section */}
        <div className="eliminated-section">
          {eliminatedFighters.map((fighter) => (
            <div key={fighter.id} className="eliminated-fighter">
              <img src={fighter.avatar} alt={fighter.name} />
              <span className="eliminated-text">ELIMINATED</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleArena; 