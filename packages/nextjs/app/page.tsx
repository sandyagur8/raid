'use client'
import React from 'react';
import Link from 'next/link';
import  LeaderBoard  from '../components/LeaderBoard';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">

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

      {/* Preview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Live Battle Preview
          </h2>
          <p className="mt-3 text-xl text-gray-300">
            Get a glimpse of the epic battles happening right now
          </p>
        </div>

        {/* Battle Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-16">
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-400 truncate">
                Active Battles
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-white">
                3
              </dd>
            </div>
          </div>
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-400 truncate">
                Fighting Tokens
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-white">
                24
              </dd>
            </div>
          </div>
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-400 truncate">
                Current Prize Pool
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-white">
                $12,435
              </dd>
            </div>
          </div>
        </div>

        {/* Top 5 Preview */}
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Top 5 Fighters</h3>
          <div className="space-y-2">
            {Array(5).fill(null).map((_, index) => (
              <div key={index} 
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-600" />
                  <div>
                    <div className="font-semibold text-white">Meme Token #{index + 1}</div>
                    <div className="text-sm text-gray-400">Win Rate: {90 - index * 5}%</div>
                  </div>
                </div>
                <div className="text-green-400 font-bold">
                  ${(10000 - index * 1000).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <Link href="/battle" 
            className="mt-6 block text-center text-blue-400 hover:text-blue-300 transition-colors">
            View Full Battle Arena →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
