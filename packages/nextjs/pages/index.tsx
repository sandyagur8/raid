'use client'
import React from 'react';
import Link from 'next/link';
import { LeaderBoard } from '../components/LeaderBoard';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
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
                <Link href="/raid" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-500 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
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

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <LeaderBoard />
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-400 truncate">
                Total Battles
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-white">
                12,361
              </dd>
            </div>
          </div>
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-400 truncate">
                Active Tokens
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-white">
                2,145
              </dd>
            </div>
          </div>
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-400 truncate">
                Total Prize Pool
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-white">
                $523,641
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 