'use client'
import React from 'react';
import Link from 'next/link';
import { useOnChainData } from '../hooks/useOnChainData';

const HomePage: React.FC = () => {
  const { tokens, loading, error } = useOnChainData();

  // Sort tokens by market cap for leaderboard
  const sortedTokens = [...(tokens || [])].sort((a, b) => 
    (b.marketCap || 0) - (a.marketCap || 0)
  );

  const formatNumber = (num: number | undefined | null) => {
    if (!num) return '$0.00';
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section remains the same */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Meme Battle Arena</span>
              <span className="block text-blue-500">Where Memes Come to Fight</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Create your own meme token, join the battle, and compete for glory in the ultimate meme showdown.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/mint" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
                  Create Token
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/battle" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-500 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Join Battle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Current Top Performers
          </h2>
          <p className="mt-3 text-xl text-gray-300">
            Watch the best meme tokens battle it out in real-time
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-red-500 text-center py-10">
            Error loading leaderboard: {error}
          </div>
        )}

        {/* Leaderboard */}
        {!loading && !error && (
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Top Fighters</h3>
            <div className="space-y-2">
              {sortedTokens.slice(0, 5).map((token, index) => (
                <div key={token.address} 
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                      ${index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-300' : 
                        index === 2 ? 'bg-amber-600' : 'bg-gray-600'}`}
                    >
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{token.name}</div>
                      <div className="text-sm text-gray-400">
                        Holders: {token.holders?.toLocaleString() || '0'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">
                      {formatNumber(token.marketCap)}
                    </div>
                    <div className="text-sm text-gray-400">
                      Power: {token.power || 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/battle" 
              className="mt-6 block text-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Full Battle Arena →
            </Link>
          </div>
        )}

        {/* Stats */}
        {!loading && !error && (
          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-400 truncate">
                  Total Tokens
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-white">
                  {tokens?.length || 0}
                </dd>
              </div>
            </div>
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-400 truncate">
                  Total Holders
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-white">
                  {tokens?.reduce((acc, token) => acc + (token.holders || 0), 0).toLocaleString() || '0'}
                </dd>
              </div>
            </div>
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-400 truncate">
                  Total Value Locked
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-white">
                  {formatNumber(tokens?.reduce((acc, token) => acc + (token.marketCap || 0), 0))}
                </dd>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
