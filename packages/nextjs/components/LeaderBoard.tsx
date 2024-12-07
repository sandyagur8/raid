'use client'
import React, { useState, useEffect } from 'react';

interface Community {
  id: string;
  rank: number;
  name: string;
  score: number;
  change?: 'up' | 'down' | 'same';
  previousRank?: number;
}

const LeaderBoard: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>(
    Array(25).fill(null).map((_, index) => ({
      id: `community-${index}`,
      rank: index + 1,
      name: `Community ${index + 1}`,
      score: Math.floor(1000 - (index * 25) + Math.random() * 50),
      change: 'same',
      previousRank: index + 1
    }))
  );

  // Update scores and ranks periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCommunities(prevCommunities => {
        // Clone the previous communities
        const newCommunities = [...prevCommunities];

        // Randomly update scores
        newCommunities.forEach(community => {
          if (Math.random() < 0.3) { // 30% chance to change score
            const scoreChange = Math.floor(Math.random() * 50) - 25;
            community.score = Math.max(0, community.score + scoreChange);
          }
        });

        // Sort by score and update ranks
        newCommunities.sort((a, b) => b.score - a.score);
        
        // Update ranks and change indicators
        newCommunities.forEach((community, index) => {
          const newRank = index + 1;
          community.previousRank = community.rank;
          community.rank = newRank;
          community.change = 
            newRank < community.previousRank ? 'up' :
            newRank > community.previousRank ? 'down' : 'same';
        });

        return newCommunities;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const getFontSize = (rank: number): string => {
    if (rank === 1) return 'text-xl';
    if (rank === 2) return 'text-lg';
    if (rank === 3) return 'text-base';
    if (rank <= 5) return 'text-sm';
    return 'text-xs';
  };

  const getOpacity = (rank: number): string => {
    if (rank === 1) return 'opacity-100';
    if (rank <= 3) return 'opacity-90';
    if (rank <= 5) return 'opacity-80';
    if (rank <= 10) return 'opacity-70';
    return 'opacity-60';
  };

  const getRankColor = (rank: number): string => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-amber-600';
    return 'text-gray-400';
  };

  const getChangeIcon = (change: Community['change']) => {
    switch (change) {
      case 'up':
        return <span className="text-green-500">↑</span>;
      case 'down':
        return <span className="text-red-500">↓</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  const getRowStyle = (community: Community) => {
    const baseStyle = `flex items-center justify-between p-2.5 border-b border-gray-700/50 
      hover:bg-gray-700/30 transition-all duration-500 relative
      ${getOpacity(community.rank)}`;

    const moveDistance = community.previousRank && community.rank !== community.previousRank
      ? `${(community.previousRank - community.rank) * 40}px`
      : '0px';

    return `${baseStyle} transform translate-y-[${moveDistance}]`;
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Top 25 Communities</h2>
      <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {communities.map((community) => (
          <div 
            key={community.id} 
            className={getRowStyle(community)}
          >
            {/* Rank with animation */}
            <div className={`flex items-center gap-2 ${getFontSize(community.rank)}`}>
              <span className={`font-bold w-8 ${getRankColor(community.rank)}
                transition-all duration-500`}>
                #{community.rank}
              </span>
              <div className="flex flex-col">
                <span className={`font-semibold ${
                  community.rank <= 3 ? 'font-bold' : ''
                } transition-all duration-300`}>
                  {community.name}
                </span>
                {community.rank <= 3 && (
                  <span className="text-xs text-gray-400">
                    Top Performer
                  </span>
                )}
              </div>
            </div>

            {/* Score with animation */}
            <div className="flex items-center gap-2">
              <span className={`font-bold transition-all duration-300 ${
                community.rank <= 3 ? 'text-green-400' : 'text-green-500/80'
              }`}>
                {community.score.toLocaleString()}
              </span>
              <div className="w-4 transition-all duration-300">
                {getChangeIcon(community.change)}
              </div>
              
              {/* Movement indicator */}
              {community.change !== 'same' && (
                <div className={`absolute right-0 h-full w-1 transition-all duration-300
                  ${community.change === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'}`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
