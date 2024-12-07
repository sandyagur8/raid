import React from 'react';

interface Tweet {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const TweetFeed: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4">Live Tweets</h2>
      <div className="flex-1 overflow-y-auto">
        {/* Placeholder tweets - replace with real data */}
        {Array(10).fill(null).map((_, index) => (
          <div 
            key={index} 
            className="border-b border-gray-700 p-4 hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-600" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">User {index + 1}</span>
                  <span className="text-gray-400 text-sm">@user{index + 1}</span>
                </div>
                <p className="text-gray-300 mt-1">
                  This is a sample tweet about the ongoing raid battle! 
                  #MemeBattle #Crypto
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetFeed; 