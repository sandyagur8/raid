import React from 'react';
import '../styles/LeaderBoard.css';

const LeaderBoard = () => {
  return (
    <div className="leaderboard">
      <h2>Top 25 Communities</h2>
      <div className="leaderboard-list">
        {/* This will be populated with real data */}
        {Array(25).fill(null).map((_, index) => (
          <div key={index} className="leaderboard-item">
            <span className="rank">{index + 1}</span>
            <span className="community-name">Community {index + 1}</span>
            <span className="score">1000</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard; 