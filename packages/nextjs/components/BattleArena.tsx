'use client'
import React, { useState, useEffect } from 'react';
import { useTokenData } from './../hooks/useTokenData';
import { supabase } from './../lib/supabase';
import Image from "next/image";
import { getAssetPath } from '../utils/imageLoader';
import { useOnChainData } from '../hooks/useOnChainData';

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

interface Fighter {
  logo_url: string;
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
  isNew: boolean;
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

const getImagePath = (filename: string) => {
  try {
    return getAssetPath(filename);
  } catch {
    return getAssetPath('doge.png');
  }
};

const BattleArena: React.FC = () => {
  const { tokens: onChainTokens, loading: onChainLoading, error } = useOnChainData();
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [activeFighters, setActiveFighters] = useState<Fighter[]>([]);
  const [votingModal, setVotingModal] = useState<VotingModal>({
    isOpen: false,
    tokens: []
  });

  // Add error logging
  useEffect(() => {
    if (error) {
      console.error('BattleArena Error:', error);
    }
  }, [error]);

  // Add data logging
  useEffect(() => {
    console.log('Tokens:', onChainTokens);
  }, [onChainTokens]);

  useEffect(() => {
    if (onChainTokens.length > 0) {
      const newFighters = onChainTokens.map(token => ({
        logo_url: `assets/${token.logo_url}`, // Use the logo_url directly
        id: token.address,
        name: token.symbol,
        avatar: token.logo_url, // Use logo_url instead of getImagePath
        isAlive: true,
        position: { x: 50, y: 50 },
        velocity: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
        health: 100,
        power: 10,
        direction: 'right' as const,
        isAttacking: false,
        isNew: false
      }));
  
      setFighters(newFighters);
      setActiveFighters(newFighters.slice(0, 2));
  
      setVotingModal(prev => ({
        ...prev,
        tokens: onChainTokens.map(t => ({
          symbol: t.symbol,
          name: t.name,
          balance: t.holders?.toString() || '0',
          logo: `assets/${t.logo_url}` // Use logo_url here too
        }))
      }));
    }
  }, [onChainTokens]);
  


  // Gradually add more fighters
  useEffect(() => {
    if (fighters.length <= activeFighters.length) return;

    const interval = setInterval(() => {
      setActiveFighters(current => {
        if (current.length >= fighters.length) {
          clearInterval(interval);
          return current;
        }
        
        // Add next fighter with entrance animation
        const nextFighter = {
          ...fighters[current.length],
          position: {
            x: 50, // Start from center
            y: 50
          },
          isAttacking: true, // Trigger attack animation
          isNew: true, // Add this flag for entrance animation
        };
        
        // Remove isNew flag after animation
        setTimeout(() => {
          setActiveFighters(prev => 
            prev.map(f => 
              f.id === nextFighter.id 
                ? { ...f, isNew: false }
                : f
            )
          );
        }, 500);
        
        return [...current, nextFighter];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fighters]);

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
    setActiveFighters(prevFighters => {
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
          isAttacking: fighter.isAttacking
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
            
            // Trigger attack animation
            newFighters[i].isAttacking = true;
            newFighters[j].isAttacking = true;

            // Add some random velocity after collision
            newFighters[i].velocity.x += (Math.random() - 0.5) * 2;
            newFighters[i].velocity.y += (Math.random() - 0.5) * 2;
            newFighters[j].velocity.x += (Math.random() - 0.5) * 2;
            newFighters[j].velocity.y += (Math.random() - 0.5) * 2;
          }
        }
      }

      // Reset attack state after a short delay
      newFighters.forEach(fighter => {
        if (fighter.isAttacking) {
          setTimeout(() => {
            setActiveFighters(current =>
              current.map(f =>
                f.id === fighter.id ? { ...f, isAttacking: false } : f
              )
            );
          }, 500);
        }
      });

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
      const token = onChainTokens.find(t => t.symbol === symbol);
      if (!token) return;

      const response = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token_id: token.address,
          voter_address: 'user_address', // Replace with actual user address
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Failed to vote');
      
      setVotingModal(prev => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (onChainLoading) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
    </div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-2xl font-bold">Current Raid</h3>
        <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
          LIVE
        </span>
      </div>

      <div className="flex h-[calc(100%-60px)] gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gray-900/50 rounded-lg overflow-hidden">
            {activeFighters.map((fighter) => (
              <div 
                key={fighter.id} 
                className={`absolute transition-all duration-300
                  ${fighter.isAttacking ? 'scale-110 animate-bounce-in' : 'scale-100'}
                  ${fighter.isNew ? 'animate-fade-in' : ''}`}
                style={{
                  left: `${fighter.position.x}%`,
                  top: `${fighter.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: fighter.isNew 
                    ? 'bounceIn 0.5s ease-out, fadeIn 0.3s ease-out' 
                    : undefined
                }}
              >
                {/* Character Container */}
                <div className={`relative ${fighter.direction === 'left' ? '-scale-x-100' : ''}`}>
                  {/* Meme Logo */}
                  <div className="w-12 h-12 relative">
                    <Image 
                      src={fighter.logo_url}
                      alt={fighter.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/default-token.png';
                      }}
                      priority
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

        <div className="w-[200px] border-l border-gray-700 pl-4 flex flex-col min-h-0">
          <h4 className="text-white text-lg font-semibold mb-4 flex-shrink-0">
            Support Your Meme
          </h4>

          <button
            onClick={() => setVotingModal(prev => ({ ...prev, isOpen: true }))}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 
              text-white rounded-lg transition-colors font-semibold
              flex items-center justify-center gap-2 flex-shrink-0 mb-4"
          >
            <span>Cast Vote</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="space-y-3">
              {activeFighters.map(fighter => (
                <div 
                  key={fighter.id} 
                  className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                  <Image 
  src={fighter.logo_url}
  alt={fighter.name}
  width={48}
  height={48}
  className="rounded-full object-cover"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = '/assets/default-token.png';
  }}
  priority
/>
                    <span className="text-gray-300 text-sm">{fighter.name}</span>
                  </div>
                  <span className="text-blue-400 font-bold text-sm">123 votes</span>
                </div>
              ))}
            </div>
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
                    <Image 
                      src={token.logo}
                      alt={token.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/default-token.png';
                      }}
                      priority
                    />
                    <div className="text-left">
                      <div className="text-white font-semibold">{token.name}</div>
                      <div className="text-gray-400 text-sm">
                        Balance: {token.balance} {token.symbol}
                      </div>
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
