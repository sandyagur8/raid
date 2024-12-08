'use client'
import React from 'react';
import BattleArena from '../../components/BattleArena';
import LeaderBoard from '../../components/LeaderBoard';
import TweetFeed from '../../components/TweetFeed';
import RaidTimer from '../../components/RaidTimer';

const RaidPage: React.FC = () => {
  return (
    <div className="p-5 min-h-screen bg-gray-900">
      <div className="flex gap-5 max-w-[1800px] mx-auto h-[calc(100vh-40px)]">
        {/* Main battle arena */}
        <div className="flex-1">
          <BattleArena />
        </div>
        
        {/* Right sidebar with Leaderboard and Tweets side by side */}
        <div className="w-[600px] flex gap-5">
          <div className="flex-1 bg-gray-800 rounded-lg p-4">
            <RaidTimer maxDuration={300} />
            <LeaderBoard />
          </div>
          <div className="flex-1 bg-gray-800 rounded-lg p-4">
            <TweetFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaidPage;
