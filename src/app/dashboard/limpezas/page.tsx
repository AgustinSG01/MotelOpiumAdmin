'use client';

import * as React from 'react';
import { useLimpezaFilters } from '@/store/filters';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { type Controle, type Limpeza } from '@/types/types';
import ControlInfo from '@/components/dashboard/limpezas/control-info';
import { LimpezasFilters } from '@/components/dashboard/limpezas/limpezas-filters';
import { LimpezasTable } from '@/components/dashboard/limpezas/limpezas-table';
import NewLimpeza from '@/components/dashboard/modalForms/NewLimpeza';

import axios from '../../../axios-config';

export default function Page(): React.JSX.Element {
  const { orderBy, empregado, gerente, suit, initialDate, finalDate, state, resetFilters } = useLimpezaFilters();

  const [limpezas, setLimpezas] = React.useState<Limpeza[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [control, setControl] = React.useState<Controle>();
  const [showModal, setShowModal] = React.useState({
    control: false,
    new: false,
  });

  React.useEffect(() => {
    resetFilters();
    void getLimpezas();
  }, []);
  // TODO: agregar boton para aplicar filtros

  async function getLimpezas(): Promise<void> {
    const filters = orderBy.split(';');
    try {
      setLoading(true);
      const response = await axios.get(
        `/limpeza/${state}?orderType=${filters[0]}&order=${filters[1]}&empregado=${empregado}&gerente=${gerente}&suit=${suit}&dateStart=${String(initialDate)}&dateEnd=${String(finalDate)}`
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
        setShowModal({ control: true, new: false });
      }
    } catch (error) {
      return;
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
    <>
      <NewLimpeza
        faxina={false}
        open={showModal.new}
        handleClose={() => {
          setShowModal({ new: false, control: false });
        }}
        refresh={getLimpezas}
      />
      <ControlInfo
        controle={control}
        open={showModal.control}
        handleClose={() => {
          setShowModal({ control: false, new: false });
        }}
      />
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
                setShowModal({ new: true, control: false });
              }}
            >
              Adicionar
            </Button>
          </div>
        </Stack>
        <LimpezasFilters applyFilters={getLimpezas} withoutFilters={withoutFilters} />
        <LimpezasTable
          handleDelete={deleteLimpeza}
          getControle={getControle}
          count={limpezas.length}
          rows={limpezas}
          loading={loading}
          refresh={getLimpezas}
        />
      </Stack>
    </>
  );
}
