'use client'
import React, { useState, useEffect } from 'react';

interface Tweet {
  id: string;
  author: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  retweets: number;
  comments: number;
}

const DUMMY_TWEETS: Tweet[] = [
  {
    id: '1',
    author: 'PEPE Warrior',
    username: 'pepewarrior',
    content: '🐸 $PEPE just destroyed $DOGE in the arena! The meme power is strong with this one! 🚀 #MemeBattle',
    timestamp: new Date(),
    likes: 423,
    retweets: 89,
    comments: 32
  },
  {
    id: '2',
    author: 'Doge Commander',
    username: 'dogecommander',
    content: 'Much wow! $DOGE showing incredible strength in the battle! 🐕 To the moon! 🌙 #MemeBattle #Dogecoin',
    timestamp: new Date(Date.now() - 120000),
    likes: 567,
    retweets: 123,
    comments: 45
  },
  {
    id: '3',
    author: 'Shib Warrior',
    username: 'shibwarrior',
    content: '$SHIB army is unstoppable! Watch us dominate the MemeBattle Arena! 💪 #SHIB #MemeBattle',
    timestamp: new Date(Date.now() - 240000),
    likes: 345,
    retweets: 78,
    comments: 28
  },
  {
    id: '4',
    author: 'PEPE Warrior',
    username: 'pepewarrior',
    content: '🐸 $PEPE just destroyed $DOGE in the arena! The meme power is strong with this one! 🚀 #MemeBattle',
    timestamp: new Date(),
    likes: 423,
    retweets: 89,
    comments: 32
  },
  {
    id: '5',
    author: 'Doge Commander',
    username: 'dogecommander',
    content: 'Much wow! $DOGE showing incredible strength in the battle! 🐕 To the moon! 🌙 #MemeBattle #Dogecoin',
    timestamp: new Date(Date.now() - 120000),
    likes: 567,
    retweets: 123,
    comments: 45
  },
  {
    id: '6',
    author: 'Mega Mind Trader',
    username: 'megamindtoken',
    content: '🧠 Intellect meets crypto! $MEGA is strategizing its next move in the #MemeBattle 🚀 Big brain plays incoming!',
    timestamp: new Date(Date.now() - 300000),
    likes: 312,
    retweets: 67,
    comments: 22
  },
  {
    id: '7',
    author: 'Chad Coin Warrior',
    username: 'chadcoinbattle',
    content: '💪 $CHAD enters the arena! Flex those crypto muscles! Who\'s ready for total domination? 🏆 #MemeBattle',
    timestamp: new Date(Date.now() - 450000),
    likes: 501,
    retweets: 98,
    comments: 54
  },
  {
    id: '8',
    author: 'Chill Finance',
    username: 'chillfinance',
    content: '😎 Keeping it cool in the $MEME battlefield. Zen approach to crypto warfare! 🧘‍♂️ #MemeBattle',
    timestamp: new Date(Date.now() - 600000),
    likes: 276,
    retweets: 55,
    comments: 18
  },
  {
    id: '9',
    author: 'Poker Face Crypto',
    username: 'pokertoken',
    content: '♠️ All in on the $MEME battle! Bluffing our way to the top! 🃏 Who\'s got the best poker face? #MemeBattle',
    timestamp: new Date(Date.now() - 750000),
    likes: 389,
    retweets: 76,
    comments: 41
  },
  {
    id: '10',
    author: 'Rocket Doge',
    username: 'rocketdogeofficial',
    content: '🚀🐕 $DOGE preparing for launch! Interstellar meme battle incoming! Buckle up, crypto warriors! 🌌 #MemeBattle',
    timestamp: new Date(Date.now() - 900000),
    likes: 612,
    retweets: 145,
    comments: 62
  },
  {
    id: '11',
    author: 'Pepe Master',
    username: 'pepememeking',
    content: '🐸👑 $PEPE royalty taking over the meme battlefield! Bow down to the meme king! 🏆 #MemeBattle',
    timestamp: new Date(Date.now() - 1050000),
    likes: 456,
    retweets: 87,
    comments: 39
  },
  {
    id: '12',
    author: 'Chill Zone Trader',
    username: 'chillzonetrader',
    content: '🧊 Keeping cool while the meme battle rages on. $MEME warriors, stay zen! 🧘 #MemeBattle',
    timestamp: new Date(Date.now() - 1200000),
    likes: 287,
    retweets: 62,
    comments: 26
  },
  {
    id: '13',
    author: 'Meme Lord',
    username: 'memelordcrypto',
    content: '🌟 Ultimate meme battle royale! $MEME tokens clash in an epic showdown! Who will emerge victorious? 🏅 #MemeBattle',
    timestamp: new Date(Date.now() - 1350000),
    likes: 534,
    retweets: 112,
    comments: 58
  }
];

// Generate more tweets based on patterns
const generateMoreTweets = () => {
  const templates = [
    "🚀 {token} is pumping! The battle is getting intense! 💪 #MemeBattle",
    "Just voted for {token}! Let's win this battle! 🏆 #MemeBattle",
    "The {token} community is the strongest! 💎🙌 #MemeBattle",
    "{token} vs {opponent} - Epic battle happening right now! 🔥 #MemeBattle",
    "Look at that move by {token}! Incredible performance! 🌟 #MemeBattle"
  ];

  const tokens = ['$PEPE', '$DOGE', '$SHIB', '$FLOKI', '$WOJAK'];
  const baseTime = Date.now();

  return Array(15).fill(null).map((_, index) => {
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    const opponent = tokens.filter(t => t !== token)[Math.floor(Math.random() * (tokens.length - 1))];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const content = template.replace('{token}', token).replace('{opponent}', opponent);

    return {
      id: `generated-${index}`,
      author: `${token.slice(1)} Enthusiast`,
      username: `${token.slice(1).toLowerCase()}trader${Math.floor(Math.random() * 1000)}`,
      content,
      timestamp: new Date(baseTime - (index * 180000)), // 3 minutes apart
      likes: Math.floor(Math.random() * 1000),
      retweets: Math.floor(Math.random() * 200),
      comments: Math.floor(Math.random() * 100)
    };
  });
};

const TweetFeed: React.FC = () => {
  const [visibleTweets, setVisibleTweets] = useState<Tweet[]>([]);
  const [allTweets] = useState<Tweet[]>([...DUMMY_TWEETS, ...generateMoreTweets()]);

  useEffect(() => {
    // Start with 3 tweets
    setVisibleTweets(allTweets.slice(0, 3));

    // Add new tweet every 4 seconds
    const interval = setInterval(() => {
      setVisibleTweets(current => {
        if (current.length >= allTweets.length) {
          // Reset to initial state when all tweets are shown
          return allTweets.slice(0, 3);
        }
        return allTweets.slice(0, current.length + 1);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [allTweets]);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4">Live Tweets</h2>
      <div className="flex-1 overflow-y-auto space-y-4">
        {visibleTweets.map((tweet, index) => (
          <div 
            key={tweet.id}
            className={`border-b border-gray-700 p-4 hover:bg-gray-700/50 
              transition-all duration-300 animate-slide-in`}
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animation: `slideIn 0.5s ease-out ${index * 0.1}s forwards, 
                         fadeIn 0.3s ease-out ${index * 0.1}s forwards`
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                {tweet.author[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{tweet.author}</span>
                  <span className="text-gray-400 text-sm">@{tweet.username}</span>
                  <span className="text-gray-400 text-sm">·</span>
                  <span className="text-gray-400 text-sm">{formatTimeAgo(tweet.timestamp)}</span>
                </div>
                <p className="text-gray-300 mt-1">
                  {tweet.content}
                </p>
                <div className="flex items-center gap-6 mt-3">
                  <button className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm">{tweet.comments}</span>
                  </button>
                  <button className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-sm">{tweet.retweets}</span>
                  </button>
                  <button className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm">{tweet.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetFeed; 