import React from 'react';

interface RaidTimerProps {
  timeUntilNextRaid: number;
}

const RaidTimer: React.FC<RaidTimerProps> = ({ timeUntilNextRaid }) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      <h3 className="text-white text-lg font-bold mb-2">Next Raid In</h3>
      <div className="text-2xl font-bold text-green-500">
        {formatTime(timeUntilNextRaid)}
      </div>
    </div>
  );
};

export default RaidTimer; 