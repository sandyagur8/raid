import React from 'react';

interface Community {
  rank: number;
  name: string;
  score: number;
}

const LeaderBoard: React.FC = () => {
  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Top 25 Communities</h2>
      <div className="h-[500px] overflow-y-auto">
        {Array(25).fill(null).map((_, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2.5 border-b border-gray-700"
          >
            <span className="w-8 font-bold">{index + 1}</span>
            <span className="flex-1 mx-2.5">Community {index + 1}</span>
            <span className="font-bold text-green-500">1000</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard; 