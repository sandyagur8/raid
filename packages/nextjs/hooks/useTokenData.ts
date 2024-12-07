import { useEffect, useState } from 'react';
import { TokenData,supabase } from './../lib/supabase';

export function useTokenData() {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch('/api/tokens');
        if (!response.ok) throw new Error('Failed to fetch tokens');
        const data = await response.json();
        setTokens(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tokens');
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();

    // Set up real-time subscription
    const subscription = supabase
      .channel('tokens')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tokens' }, (payload) => {
        setTokens(current => {
          const updated = [...current];
          const index = updated.findIndex(t => t.id === payload.new.id);
          if (index >= 0) {
            updated[index] = payload.new;
          } else {
            updated.push(payload.new);
          }
          return updated;
        });
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { tokens, loading, error };
} 