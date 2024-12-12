'use client';

import * as React from 'react';
import { useLimpezaFilters } from '@/store/filters';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { Limpeza, type Employee } from '@/types/types';
import { CustomersFilters } from '@/components/dashboard/employees/customers-filters';
import { CustomersTable } from '@/components/dashboard/employees/customers-table';
import { LimpezasFilters } from '@/components/dashboard/limpezas/limpezas-filters';
import { LimpezasTable } from '@/components/dashboard/limpezas/limpezas-table';
import EditEmployee from '@/components/dashboard/modalForms/EditEmployee';
import NewEmployee from '@/components/dashboard/modalForms/NewEmployee';

import axios from '../../../axios-config';

export default function Page(): React.JSX.Element {
  const { orderBy, empregado, gerente, suit } = useLimpezaFilters();

  const [limpezas, setLimpezas] = React.useState<Limpeza[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState({
    new: false,
    edit: false,
  });

  React.useEffect(() => {
    void getLimpezas();
  }, []);
  // TODO: agregar boton para aplicar filtros

  async function getLimpezas(): Promise<void> {
    const filters = orderBy.split(';');
    try {
      setLoading(true);
      const response = await axios.get(
        `/limpeza/all?orderType=${filters[0]}&order=${filters[1]}&empregado=${empregado}&gerente=${gerente}&suit=${suit}`
      );
      const data: Limpeza[] = response.data as Limpeza[];
      setLimpezas(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  // async function getEmployee(id: number, rol: string): Promise<void> {
  //   try {
  //     const response = await axios.get(`/empregado/all/${id}?rol=${rol}`);
  //     const data = response.data as Employee;
  //     if (data) {
  //       setLimpezas(data);
  //       setShowModal({ edit: true, new: false });
  //     }
  //   } catch (error) {
  //     // TODO: Alert de que hubo un error
  //   }
  // }

  async function deleteEmployee(id: number, rol: string): Promise<void> {
    try {
      await axios.delete(`/empregado/${rol}/${id}`);
    } catch (error) {
      // TODO: Agregar mensaje de que no se pudo eliminar
    } finally {
      void getLimpezas();
    }
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Limpezas</Typography>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => {
              setShowModal({ new: true, edit: false });
            }}
          >
            Adicionar
          </Button>
        </div>
      </Stack>
      <LimpezasFilters applyFilters={getLimpezas} />
      <LimpezasTable
        handleDelete={deleteEmployee}
        count={limpezas.length}
        rows={limpezas}
        loading={loading}
        editEmployee={() => {
          console.log('edit');
        }}
      />
    </Stack>
  );
}