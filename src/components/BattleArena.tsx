import React, { useState } from 'react';

interface Fighter {
  id: string;
  name: string;
  avatar: string;
  isAlive: boolean;
}

interface BattleArenaProps {
  isActive: boolean;
  arenaNumber: number;
}

const BattleArena: React.FC<BattleArenaProps> = ({ isActive, arenaNumber }) => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [eliminatedFighters, setEliminatedFighters] = useState<Fighter[]>([]);

  return (
    <div className={`bg-gray-800 rounded-lg p-4 h-[200px] relative ${isActive ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-lg font-bold">Arena {arenaNumber}</h3>
        {isActive && (
          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
            LIVE
          </span>
        )}
      </div>

      <div className="flex h-[calc(100%-40px)]">
        {/* Active fighters */}
        <div className="flex flex-wrap gap-2.5 p-2.5">
          {fighters.map((fighter) => (
            <div 
              key={fighter.id} 
              className={`w-[50px] h-[50px] relative transition-all duration-300
                ${fighter.isAlive ? '' : 'opacity-50 grayscale'}`}
            >
              <img 
                src={fighter.avatar} 
                alt={fighter.name}
                className="w-full h-full rounded-full" 
              />
              <span className="text-white text-xs absolute bottom-0 left-0 right-0 text-center">
                {fighter.name}
              </span>
            </div>
          ))}
        </div>

        {/* Eliminated section */}
        <div className="flex flex-col gap-2">
          {eliminatedFighters.map((fighter) => (
            <div key={fighter.id} className="flex items-center gap-2">
              <img 
                src={fighter.avatar} 
                alt={fighter.name} 
                className="w-8 h-8 rounded-full grayscale"
              />
              <span className="text-red-500 text-xs">ELIMINATED</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleArena; 