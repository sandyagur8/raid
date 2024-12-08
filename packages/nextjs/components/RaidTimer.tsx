'use client'
import React, { useState, useEffect } from 'react';

interface RaidTimerProps {
  maxDuration?: number; // Maximum duration in seconds (default 5 minutes = 300)
}

const RaidTimer: React.FC<RaidTimerProps> = ({ maxDuration = 300 }) => {
  // Generate random start time between 0 and maxDuration (5 minutes)
  const getRandomStartTime = () => Math.floor(Math.random() * maxDuration);
  
  const [timeLeft, setTimeLeft] = useState<number>(getRandomStartTime());
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    // Start a new raid with random time when current one ends
    const startNewRaid = () => {
      const newTime = getRandomStartTime();
      setTimeLeft(newTime);
      setIsActive(true);
    };

    // Update timer every second
    const interval = setInterval(() => {
      setTimeLeft(current => {
        if (current <= 0) {
          setIsActive(false);
          startNewRaid(); // Start new raid when current one ends
          return maxDuration;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [maxDuration]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold text-white mb-2">
        {isActive ? 'Raid Ends In' : 'Starting New Raid...'}
      </h3>
      <div className={`text-2xl font-bold ${timeLeft <= 60 ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
        {formatTime(timeLeft)}
      </div>
      <div className="mt-2">
        <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-1000"
            style={{ 
              width: `${(timeLeft / maxDuration) * 100}%`,
              backgroundColor: timeLeft <= 60 ? '#EF4444' : '#10B981'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RaidTimer;