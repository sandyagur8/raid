import { useEffect, useState } from 'react';

interface TokenDetails {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  holders: number;
  liquidity: {
    token: string;
    eth: string;
  };
  marketCap: number;
  health: number;
  power: number;
}

export function useOnChainData() {
  const [tokens, setTokens] = useState<TokenDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnChainData = async () => {
      try {
        const response = await fetch('/api/tokens');
        console.log(response);
        if (!response.ok) throw new Error('Failed to fetch on-chain data');
        const data = await response.json();
        console.log(data)
        setTokens(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch on-chain data');
      } finally {
        setLoading(false);
      }
    };

    fetchOnChainData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOnChainData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { tokens, loading, error };
} 