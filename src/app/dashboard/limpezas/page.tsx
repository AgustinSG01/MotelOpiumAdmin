'use client';

import * as React from 'react';
import { useLimpezaFilters } from '@/store/filters';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { Controle, type Limpeza } from '@/types/types';
import ControlInfo from '@/components/dashboard/limpezas/control-info';
import { LimpezasFilters } from '@/components/dashboard/limpezas/limpezas-filters';
import { LimpezasTable } from '@/components/dashboard/limpezas/limpezas-table';

import axios from '../../../axios-config';

export default function Page(): React.JSX.Element {
  const { orderBy, empregado, gerente, suit, initialDate, finalDate, state } = useLimpezaFilters();

  const [limpezas, setLimpezas] = React.useState<Limpeza[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [control, setControl] = React.useState<Controle>();
  const [showModal, setShowModal] = React.useState({
    control: false,
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
        `/limpeza/${state}?orderType=${filters[0]}&order=${filters[1]}&empregado=${empregado}&gerente=${gerente}&suit=${suit}&dateStart=${initialDate}&dateEnd=${finalDate}`
      );
      const data: Limpeza[] = response.data as Limpeza[];
      setLimpezas(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function getControle(id: number): Promise<void> {
    try {
      const response = await axios.get(`/controle/${id}`);
      const data = response.data as Controle;
      if (data) {
        setControl(data);
        setShowModal({ control: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function withoutFilters(): Promise<void> {
    try {
      setLoading(true);
      const response = await axios.get(`/limpeza/all`);
      const data: Limpeza[] = response.data as Limpeza[];
      setLimpezas(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      <ControlInfo
        controle={control}
        open={showModal.control}
        handleClose={() => {
          setShowModal({ control: false });
        }}
      />
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Limpezas</Typography>
          </Stack>
        </Stack>
        <LimpezasFilters applyFilters={getLimpezas} withoutFilters={withoutFilters} />
        <LimpezasTable getControle={getControle} count={limpezas.length} rows={limpezas} loading={loading} />
      </Stack>
    </>
  );
}
