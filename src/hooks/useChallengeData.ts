import { useEffect, useState } from 'react';
import { useProgressStore } from '@/stores/progressStore';

export const useChallengeData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loadChallenges = useProgressStore((state) => state.loadChallenges);

  useEffect(() => {
    const loadData = async () => {
      await loadChallenges();
      setIsLoading(false);
    };

    loadData();
  }, [loadChallenges]);

  return isLoading;
};
