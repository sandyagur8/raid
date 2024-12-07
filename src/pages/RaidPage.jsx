import React, { useState, useEffect } from 'react';
import BattleArena from '../components/BattleArena';
import LeaderBoard from '../components/LeaderBoard';
import RaidTimer from '../components/RaidTimer';
import '../styles/RaidPage.css';

const RaidPage = () => {
  const [activeRaidIndex, setActiveRaidIndex] = useState(0);
  const [timeUntilNextRaid, setTimeUntilNextRaid] = useState(0);

  return (
    <div className="raid-page">
      <div className="raid-container">
        {/* Three battle arenas */}
        <div className="battle-arenas">
          {[0, 1, 2].map((index) => (
            <BattleArena
              key={index}
              isActive={activeRaidIndex === index}
              arenaNumber={index + 1}
            />
          ))}
        </div>
        
        {/* Right side leaderboard */}
        <div className="raid-sidebar">
          <RaidTimer 
            timeUntilNextRaid={timeUntilNextRaid}
          />
          <LeaderBoard />
        </div>
      </div>
    </div>
  );
};

export default RaidPage; 