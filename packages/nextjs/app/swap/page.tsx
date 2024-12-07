'use client'
import React, { useState } from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/solid';

interface Token {
  symbol: string;
  name: string;
  logo: string;
  balance: string;
}

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken?: Token;
  tokens: Token[];
}

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose, onSelect, selectedToken, tokens }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Select Token</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          {tokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className={`w-full p-4 rounded-lg transition-colors flex items-center justify-between
                ${selectedToken?.symbol === token.symbol 
                  ? 'bg-blue-500/20 hover:bg-blue-500/30' 
                  : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              <div className="flex items-center gap-3">
                <img src={token.logo} alt={token.name} className="w-8 h-8 rounded-full" />
                <div className="text-left">
                  <div className="text-white font-semibold">{token.name}</div>
                  <div className="text-gray-400 text-sm">{token.balance} {token.symbol}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SwapPage: React.FC = () => {
  const [tokenModal, setTokenModal] = useState({
    isOpen: false,
    isFrom: true
  });

  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const availableTokens: Token[] = [
    { symbol: 'PEPE', name: 'Pepe Token', logo: '/pepe-logo.png', balance: '1000' },
    { symbol: 'DOGE', name: 'Doge Token', logo: '/doge-logo.png', balance: '500' },
    { symbol: 'SHIB', name: 'Shiba Token', logo: '/shib-logo.png', balance: '2000' },
  ];

  const handleSwap = async () => {
    try {
      // Add your swap logic here
      console.log(`Swapping ${fromAmount} ${fromToken?.symbol} to ${toToken?.symbol}`);
    } catch (error) {
      console.error('Error swapping:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Swap Tokens</h2>

          {/* From Token */}
          <div className="bg-gray-700 rounded-lg p-4 mb-2">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">From</label>
              {fromToken && (
                <span className="text-sm text-gray-400">
                  Balance: {fromToken.balance} {fromToken.symbol}
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-2xl text-white outline-none flex-1"
              />
              <button
                onClick={() => setTokenModal({ isOpen: true, isFrom: true })}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 
                  rounded-lg px-4 py-2 transition-colors"
              >
                {fromToken ? (
                  <>
                    <img src={fromToken.logo} alt={fromToken.name} className="w-6 h-6 rounded-full" />
                    <span className="text-white font-semibold">{fromToken.symbol}</span>
                  </>
                ) : (
                  <span className="text-white font-semibold">Select Token</span>
                )}
              </button>
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center -my-2">
            <button 
              onClick={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
              }}
              className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
            >
              <ArrowDownIcon className="w-6 h-6 text-blue-400" />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">To</label>
              {toToken && (
                <span className="text-sm text-gray-400">
                  Balance: {toToken.balance} {toToken.symbol}
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-2xl text-white outline-none flex-1"
              />
              <button
                onClick={() => setTokenModal({ isOpen: true, isFrom: false })}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 
                  rounded-lg px-4 py-2 transition-colors"
              >
                {toToken ? (
                  <>
                    <img src={toToken.logo} alt={toToken.name} className="w-6 h-6 rounded-full" />
                    <span className="text-white font-semibold">{toToken.symbol}</span>
                  </>
                ) : (
                  <span className="text-white font-semibold">Select Token</span>
                )}
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!fromToken || !toToken || !fromAmount}
            className={`w-full py-4 rounded-lg font-semibold text-lg
              ${(!fromToken || !toToken || !fromAmount)
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'} 
              transition-colors`}
          >
            {!fromToken || !toToken 
              ? 'Select tokens' 
              : !fromAmount 
                ? 'Enter amount' 
                : 'Swap'}
          </button>

          {/* Price Info */}
          {fromToken && toToken && fromAmount && (
            <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Price Impact</span>
                <span>0.03%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Minimum Received</span>
                <span>{(parseFloat(fromAmount) * 0.995).toFixed(6)} {toToken.symbol}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Token Selection Modal */}
      <TokenModal
        isOpen={tokenModal.isOpen}
        onClose={() => setTokenModal(prev => ({ ...prev, isOpen: false }))}
        onSelect={(token) => {
          if (tokenModal.isFrom) {
            setFromToken(token);
          } else {
            setToToken(token);
          }
        }}
        selectedToken={tokenModal.isFrom ? fromToken : toToken}
        tokens={availableTokens}
      />
    </div>
  );
};

export default SwapPage; 