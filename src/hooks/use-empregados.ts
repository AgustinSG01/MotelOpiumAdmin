import { useEffect, useState } from 'react';

import { type Employee } from '@/types/types';

import axios from '../axios-config';

interface Returned {
  empregados: Employee[];
  error: boolean;
  loading: boolean;
}

const useEmpregados = (rol: string): Returned => {
  const [empregados, setEmpregados] = useState<Employee[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getEmpregados(): Promise<void> {
    setLoading(true);

    try {
      const res = await axios.get(`/empregado/${rol}`);
      const allEmpregados = res.data as Employee[];
      if (allEmpregados.length > 0) {
        setEmpregados(allEmpregados);
      }
      setLoading(false);
    } catch (_error) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    void getEmpregados();
  }, []);

  return {
    empregados,
    error,
    loading,
  };
};

export default useEmpregados;
