'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Token {
  id: string;
  rank: number;
  name: string;
  market_cap: number;
  change?: 'up' | 'down' | 'same';
  previousRank?: number;
}

const LeaderBoard: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokens();
    const interval = setInterval(fetchTokens, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('tokens')
        .select('id, name, market_cap')
        .order('market_cap', { ascending: true })
        .limit(25);

      if (error) throw error;

      if (data) {
        const rankedData = data.map((token, index) => ({
          ...token,
          rank: index + 1,
          market_cap: token.market_cap / 1000000, // Convert to millions
          previousRank: tokens[index]?.rank || index + 1,
          change: tokens[index]?.rank 
            ? (index + 1 < tokens[index].rank ? 'up' : 
               index + 1 > tokens[index].rank ? 'down' : 'same')
            : 'same'
        }));
        setTokens(rankedData);
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getChangeIcon = (change: Token['change']) => {
    switch (change) {
      case 'up':
        return <span className="text-green-500">↑</span>;
      case 'down':
        return <span className="text-red-500">↓</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  const getRowStyle = (token: Token) => {
    const baseStyle = `flex items-center justify-between p-2.5 border-b border-gray-700/50 
      hover:bg-gray-700/30 transition-all duration-500 relative
      ${getOpacity(token.rank)}`;

    const moveDistance = token.previousRank && token.rank !== token.previousRank
      ? `${(token.previousRank - token.rank) * 40}px`
      : '0px';

    return `${baseStyle} transform translate-y-[${moveDistance}]`;
  };

  return (
    <div className="text-white max-w-md">
      <h2 className="text-xl font-bold mb-4">Top 25 Tokens</h2>
      <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : (
          tokens.map((token) => (
            <div 
              key={token.id} 
              className={getRowStyle(token)}
            >
              <div className={`flex items-center gap-3 flex-1 min-w-0 ${getFontSize(token.rank)}`}>
                <span className={`font-bold w-10 flex-shrink-0 ${getRankColor(token.rank)}
                  transition-all duration-500`}>
                  #{token.rank}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className={`font-semibold truncate ${
                    token.rank <= 3 ? 'font-bold' : ''
                  } transition-all duration-300`}>
                    {token.name}
                  </span>
                  {token.rank <= 3 && (
                    <span className="text-xs text-gray-400">
                      Top Performer
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <span className={`font-bold transition-all duration-300 ${
                  token.rank <= 3 ? 'text-green-400' : 'text-green-500/80'
                }`}>
                  {token.market_cap.toLocaleString()} M
                </span>
                <div className="w-4 transition-all duration-300">
                  {getChangeIcon(token.change)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
