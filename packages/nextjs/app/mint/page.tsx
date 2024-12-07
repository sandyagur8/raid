'use client'
import React, { useState } from 'react';

interface TokenDetails {
  name: string;
  symbol: string;
  supply: string;
  description: string;
  logo?: File;
}

const MintPage: React.FC = () => {
  const [tokenDetails, setTokenDetails] = useState<TokenDetails>({
    name: '',
    symbol: '',
    supply: '',
    description: ''
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTokenDetails(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your minting logic here
    try {
      // Mint token
      console.log('Minting token:', tokenDetails);
    } catch (error) {
      console.error('Error minting token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-8">Create Your Meme Token</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden mb-4">
                {previewUrl ? (
                  <img src={previewUrl} alt="Token Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Logo
                  </div>
                )}
              </div>
              <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Token Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Token Name</label>
                <input
                  type="text"
                  value={tokenDetails.name}
                  onChange={e => setTokenDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., PepeCoin"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Token Symbol</label>
                <input
                  type="text"
                  value={tokenDetails.symbol}
                  onChange={e => setTokenDetails(prev => ({ ...prev, symbol: e.target.value }))}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., PEPE"
                  maxLength={5}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Initial Supply</label>
                <input
                  type="number"
                  value={tokenDetails.supply}
                  onChange={e => setTokenDetails(prev => ({ ...prev, supply: e.target.value }))}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1000000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  value={tokenDetails.description}
                  onChange={e => setTokenDetails(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Describe your meme token..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold
                ${isLoading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'} 
                transition-colors`}
            >
              {isLoading ? 'Creating Token...' : 'Create Token'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MintPage;