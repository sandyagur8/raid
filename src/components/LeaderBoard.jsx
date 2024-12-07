import React from 'react';
import { useTokenData } from '../../packages/nextjs/hooks/useTokenData';
import '../styles/LeaderBoard.css';

const LeaderBoard = () => {
  const { tokens, loading, error } = useTokenData();

  return (
    <div className="leaderboard">
      <h2>Top 25 Tokens</h2>
      <div className="leaderboard-list">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">Error loading tokens</div>
        ) : (
          tokens.map((token) => (
            <div key={token.rank} className="leaderboard-item">
              <span className="rank">{token.rank}</span>
              <span className="community-name">{token.name}</span>
              <span className="score">{token.marketCap.toLocaleString()} M</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaderBoard; 