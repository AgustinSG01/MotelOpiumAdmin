'use client';

import * as React from 'react';
import { useLimpezaFilters } from '@/store/filters';
// import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { Plus as PlusIcon } from '@phosphor-s/react/dist/ssr/Plus';

import { type ControleData as InfoControle } from '@/types/types';
import { ControlesTable } from '@/components/dashboard/controles/ControlesTable';

// import ControlInfo from '@/components/dashboard/limpezas/control-info';
// import { LimpezasFilters } from '@/components/dashboard/limpezas/limpezas-filters';
// import NewLimpeza from '@/components/dashboard/modalForms/NewLimpeza';

import axios from '../../../axios-config';

export default function Page(): React.JSX.Element {
  const { orderBy, empregado, gerente, suit, initialDate, finalDate, state } = useLimpezaFilters();

  const [controls, setControls] = React.useState<InfoControle[]>([]);
  const [loading, setLoading] = React.useState(false);
  //   const [control, setControl] = React.useState<Controle>();
  const [showModal, setShowModal] = React.useState({
    control: false,
    new: false,
  });

  React.useEffect(() => {
    void getLimpezas();
  }, []);

  async function getLimpezas(): Promise<void> {
    // const filters = orderBy.split(';');
    try {
      setLoading(true);
      const response = await axios.get(`/controle`);
      const data: InfoControle[] = response.data as InfoControle[];
      console.log('data', data);
      setControls(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  //   async function getControle(id: number): Promise<void> {
  //     try {
  //       const response = await axios.get(`/controle/${id}`);
  //       const data = response.data as Controle;
  //       if (data) {
  //         setControls(data);
  //         setShowModal({ control: true, new: false });
  //       }
  //     } catch (error) {
  //       return;
  //     }
  //   }

  async function withoutFilters(): Promise<void> {
    try {
      setLoading(true);
      const response = await axios.get(`/controle`);
      const data: InfoControle[] = response.data as InfoControle[];
      setControls(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function deleteLimpeza(id: number, stateLimpeza: string): Promise<void> {
    try {
      setLoading(true);
      await axios.delete(`/limpeza/${stateLimpeza}/${id}`);
      await getLimpezas();
      setLoading(false);
    } catch (error) {
      return;
    }
  }
  return (
    <Stack spacing={3} sx={{ paddingX: 0 }}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Controles</Typography>
        </Stack>
      </Stack>
      {/* <LimpezasFilters applyFilters={getLimpezas} withoutFilters={withoutFilters} /> */}
      <ControlesTable
        handleDelete={deleteLimpeza}
        //   getControle={getControle}
        count={controls.length}
        rows={controls}
        loading={loading}
        refresh={getLimpezas}
      />
    </Stack>
  );
}
