import React, { useState } from 'react';
import BattleArena from '../components/BattleArena';
import LeaderBoard from '../components/LeaderBoard';
import RaidTimer from '../components/RaidTimer';

const RaidPage: React.FC = () => {
  const [activeRaidIndex, setActiveRaidIndex] = useState<number>(0);
  const [timeUntilNextRaid, setTimeUntilNextRaid] = useState<number>(0);

  return (
    <div className="p-5 min-h-screen bg-gray-900">
      <div className="flex gap-5 max-w-[1400px] mx-auto">
        {/* Three battle arenas */}
        <div className="flex-1 flex flex-col gap-5">
          {[0, 1, 2].map((index) => (
            <BattleArena
              key={index}
              isActive={activeRaidIndex === index}
              arenaNumber={index + 1}
            />
          ))}
        </div>
        
        {/* Right side leaderboard */}
        <div className="w-[300px] bg-gray-800 rounded-lg p-4">
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