import { useEffect, useState } from 'react';

import { type Suit } from '@/types/types';

import axios from '../axios-config';

interface Returned {
  suits: Suit[];
  error: boolean;
  loading: boolean;
}

const useSuits = (): Returned => {
  const [suits, setSuits] = useState<Suit[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getSuits(): Promise<void> {
    setLoading(true);
    try {
      const res = await axios.get(`/suit`);
      const allSuits = res.data as Suit[];
      if (allSuits.length > 0) {
        setSuits(allSuits);
      }
      setLoading(false);
    } catch (_error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    void getSuits();
  }, []);

  return {
    suits,
    error,
    loading,
  };
};

export default useSuits;
