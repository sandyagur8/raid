import React, { useEffect, useState } from 'react';
import { supabase } from '../../packages/nextjs/lib/supabase';
import '../styles/LeaderBoard.css';

const LeaderBoard = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokens();
    const interval = setInterval(fetchTokens, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('tokens')
        .select('name, market_cap')
        .order('market_cap', { ascending: true })
        .limit(25);

      if (error) throw error;

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
    <div className="leaderboard">
      <h2>Top 25 Tokens</h2>
      <div className="leaderboard-list">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          tokens.map((token) => (
            <div key={token.rank} className="leaderboard-item">
              <span className="rank">{token.rank}</span>
              <span className="community-name">{token.name}</span>
              <span className="score">{token.market_cap.toLocaleString()} M</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaderBoard; 