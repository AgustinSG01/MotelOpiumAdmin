import axios from '@/axios-config';

import { type Employee } from '@/types/types';

export async function getGerenteInService(): Promise<Employee | null> {
  return axios
        .get('/empregado/gerente/inservice')
        .then((response) => {
            return response.data as Employee;
        })
        .catch(() => {
            return null;
        });
}
