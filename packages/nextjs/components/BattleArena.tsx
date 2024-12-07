'use client'
import React, { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

interface Fighter {
  id: string;
  name: string;
  avatar: string;
  isAlive: boolean;
  position: Position;
  velocity: Velocity;
  health: number;
  power: number;
  direction: 'left' | 'right';
  isAttacking: boolean;
}

interface VotingModal {
  isOpen: boolean;
  tokens: Array<{
    symbol: string;
    name: string;
    balance: string;
    logo: string;
  }>;
}

const BattleArena: React.FC = () => {
  const [fighters, setFighters] = useState<Fighter[]>([
    {
      id: '1',
      name: 'PEPE',
      avatar: '/pepe-logo.png',
      isAlive: true,
      position: { x: 20, y: 30 },
      velocity: { x: 2, y: 1.5 },
      health: 100,
      power: 80,
      direction: 'right',
      isAttacking: false
    },
    {
      id: '2',
      name: 'DOGE',
      avatar: '/doge-logo.png',
      isAlive: true,
      position: { x: 80, y: 70 },
      velocity: { x: -2, y: -1.5 },
      health: 100,
      power: 75,
      direction: 'left',
      isAttacking: false
    },
    {
      id: '3',
      name: 'SHIB',
      avatar: '/shib-logo.png',
      isAlive: true,
      position: { x: 50, y: 50 },
      velocity: { x: 1.5, y: -2 },
      health: 100,
      power: 70,
      direction: 'right',
      isAttacking: false
    },
  ]);

  const [votingModal, setVotingModal] = useState<VotingModal>({
    isOpen: false,
    tokens: [
      { symbol: 'PEPE', name: 'Pepe Token', balance: '1000', logo: '/pepe-logo.png' },
      { symbol: 'DOGE', name: 'Doge Token', balance: '500', logo: '/doge-logo.png' },
      { symbol: 'SHIB', name: 'Shiba Token', balance: '2000', logo: '/shib-logo.png' },
      // Add more tokens as needed
    ]
  });

  // Constants for physics
  const BOUNCE_FACTOR = 0.9;
  const FIGHTER_SIZE = 24;
  const ARENA_BOUNDS = {
    minX: 5,
    maxX: 95,
    minY: 5,
    maxY: 95
  };

  // Check collision between two fighters
  const checkCollision = (pos1: Position, pos2: Position): boolean => {
    const distance = Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) + 
      Math.pow(pos1.y - pos2.y, 2)
    );
    return distance < FIGHTER_SIZE;
  };

  // Update fighter positions and handle collisions
  const updateFighterPositions = () => {
    setFighters(prevFighters => {
      const newFighters = prevFighters.map(fighter => {
        // Update position based on velocity
        let newX = fighter.position.x + fighter.velocity.x;
        let newY = fighter.position.y + fighter.velocity.y;
        let newVelX = fighter.velocity.x;
        let newVelY = fighter.velocity.y;

        // Bounce off arena bounds
        if (newX <= ARENA_BOUNDS.minX || newX >= ARENA_BOUNDS.maxX) {
          newVelX = -newVelX * BOUNCE_FACTOR;
          newX = Math.max(ARENA_BOUNDS.minX, Math.min(ARENA_BOUNDS.maxX, newX));
        }
        if (newY <= ARENA_BOUNDS.minY || newY >= ARENA_BOUNDS.maxY) {
          newVelY = -newVelY * BOUNCE_FACTOR;
          newY = Math.max(ARENA_BOUNDS.minY, Math.min(ARENA_BOUNDS.maxY, newY));
        }

        // Add small random velocity changes
        if (Math.random() < 0.05) {
          newVelX += (Math.random() - 0.5) * 0.5;
          newVelY += (Math.random() - 0.5) * 0.5;
        }

        // Keep velocity within bounds
        const maxSpeed = 3;
        newVelX = Math.max(-maxSpeed, Math.min(maxSpeed, newVelX));
        newVelY = Math.max(-maxSpeed, Math.min(maxSpeed, newVelY));

        return {
          ...fighter,
          position: { x: newX, y: newY },
          velocity: { x: newVelX, y: newVelY },
          direction: newVelX > 0 ? 'right' : 'left' as const,
          isAttacking: false
        };
      });

      // Handle collisions between fighters
      for (let i = 0; i < newFighters.length; i++) {
        for (let j = i + 1; j < newFighters.length; j++) {
          if (checkCollision(newFighters[i].position, newFighters[j].position)) {
            // Exchange velocities for collision effect
            const temp = { ...newFighters[i].velocity };
            newFighters[i].velocity = { ...newFighters[j].velocity };
            newFighters[j].velocity = { ...temp };
            
            // Trigger attack animation and reduce health
            newFighters[i].isAttacking = true;
            newFighters[j].isAttacking = true;
            newFighters[i].health = Math.max(0, newFighters[i].health - 2);
            newFighters[j].health = Math.max(0, newFighters[j].health - 2);

            // Add some random velocity after collision
            newFighters[i].velocity.x += (Math.random() - 0.5) * 2;
            newFighters[i].velocity.y += (Math.random() - 0.5) * 2;
            newFighters[j].velocity.x += (Math.random() - 0.5) * 2;
            newFighters[j].velocity.y += (Math.random() - 0.5) * 2;
          }
        }
      }

      return newFighters;
    });
  };

  // Update positions more frequently
  useEffect(() => {
    const interval = setInterval(updateFighterPositions, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (symbol: string) => {
    try {
      // Add your voting logic here
      console.log(`Voting for ${symbol}`);
      setVotingModal(prev => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-2xl font-bold">Current Raid</h3>
        <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
          LIVE
        </span>
      </div>

      <div className="flex h-[calc(100%-60px)]">
        {/* Main battle area */}
        <div className="flex-1 relative">
          {/* Battle Stage */}
          <div className="absolute inset-0 bg-gray-900/50 rounded-lg overflow-hidden">
            {fighters.map((fighter) => (
              <div 
                key={fighter.id} 
                className="absolute transition-all duration-100"
                style={{
                  left: `${fighter.position.x}%`,
                  top: `${fighter.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Character Container */}
                <div className={`relative ${fighter.direction === 'left' ? '-scale-x-100' : ''}`}>
                  {/* Meme Logo */}
                  <div className="w-12 h-12 relative">
                    <img 
                      src={fighter.avatar} 
                      alt={fighter.name}
                      className={`w-full h-full rounded-full object-cover
                        ${fighter.isAttacking ? 'animate-bounce' : ''}`}
                    />
                    
                    {/* Sword */}
                    <div 
                      className={`absolute top-1/2 
                        ${fighter.direction === 'left' ? '-left-8' : '-right-8'}
                        transition-all duration-150
                        ${fighter.isAttacking ? 'rotate-45' : 'rotate-0'}
                        origin-${fighter.direction === 'left' ? 'right' : 'left'}`}
                    >
                      {/* Sword Handle */}
                      <div className="absolute top-0 w-3 h-5 bg-yellow-700 rounded-sm"
                        style={{
                          [fighter.direction === 'left' ? 'right' : 'left']: '0'
                        }}
                      />
                      
                      {/* Sword Blade */}
                      <div 
                        className={`absolute top-0 h-2 w-8
                          bg-gradient-to-r from-gray-300 to-white
                          rounded-sm shadow-lg
                          ${fighter.isAttacking ? 'animate-pulse' : ''}`}
                        style={{
                          [fighter.direction === 'left' ? 'left' : 'right']: '2px'
                        }}
                      >
                        {/* Sword Tip */}
                        <div 
                          className="absolute top-0 w-2 h-2 
                            bg-white transform rotate-45"
                          style={{
                            [fighter.direction === 'left' ? 'left' : 'right']: '-4px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Health Bar */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-16">
                    <div className="h-1 bg-gray-700 rounded-full">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: `${fighter.health}%` }}
                      />
                    </div>
                    <div className="text-center text-white text-xs mt-1">
                      {fighter.name}
                    </div>
                  </div>

                  {/* Attack Effect */}
                  {fighter.isAttacking && (
                    <div className="absolute inset-0 animate-ping">
                      <div className="absolute inset-0 rounded-full bg-yellow-500/20" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Replace eliminated section with voting section */}
        <div className="w-[200px] border-l border-gray-700 pl-4">
          <h4 className="text-white text-lg font-semibold mb-4">Support Your Meme</h4>
          <button
            onClick={() => setVotingModal(prev => ({ ...prev, isOpen: true }))}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 
              text-white rounded-lg transition-colors font-semibold
              flex items-center justify-center gap-2"
          >
            <span>Cast Vote</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Vote count display */}
          <div className="mt-6 space-y-4">
            {fighters.map(fighter => (
              <div key={fighter.id} className="flex items-center justify-between">
                <span className="text-gray-300">{fighter.name}</span>
                <span className="text-blue-400 font-bold">123 votes</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voting Modal */}
      {votingModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Select Token to Vote</h3>
              <button 
                onClick={() => setVotingModal(prev => ({ ...prev, isOpen: false }))}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {votingModal.tokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => handleVote(token.symbol)}
                  className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg 
                    transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={token.logo} 
                      alt={token.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="text-left">
                      <div className="text-white font-semibold">{token.name}</div>
                      <div className="text-gray-400 text-sm">Balance: {token.balance} {token.symbol}</div>
                    </div>
                  </div>
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Vote →
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
              You can vote once every 30 minutes
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleArena;
