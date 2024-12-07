import React, { useEffect, useState } from 'react';
import { supabase } from '../../packages/nextjs/lib/supabase';

interface Token {
  rank: number;
  name: string;
  market_cap: number;
}

const LeaderBoard: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('tokens')
        .select('name, market_cap')
        .order('market_cap', { ascending: true })
        .limit(25);

      if (error) {
        throw error;
      }

      if (data) {
        const rankedData = data.map((token, index) => ({
          ...token,
          rank: index + 1,
          market_cap: token.market_cap / 1000000 // Convert to millions
        }));
        setTokens(rankedData);
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Top 25 Tokens</h2>
      <div className="h-[500px] overflow-y-auto">
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : (
          tokens.map((token) => (
            <div 
              key={token.rank} 
              className="flex items-center justify-between p-2.5 border-b border-gray-700"
            >
              <span className="w-8 font-bold">{token.rank}</span>
              <span className="flex-1 mx-2.5">{token.name}</span>
              <span className="font-bold text-green-500">
                {token.market_cap.toLocaleString()} M
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaderBoard; 