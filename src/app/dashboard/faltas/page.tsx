'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Falta } from '@/types/types';
import { FaltaTable } from '@/components/dashboard/falta/falta-table';
import { CommentModal } from '@/components/dashboard/limpezas/score-info';

import axios from '../../../axios-config';

export default function Page(): React.JSX.Element {
  const [faltas, setFaltas] = React.useState<Falta[]>([]);
  const [showModal, setShowModal] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    void getFaltas();
  }, []);

  async function getFaltas(): Promise<void> {
    try {
      setLoading(true);
      const response = await axios.get('/falta');
      const data: Falta[] = response.data as Falta[];
      setFaltas(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      return undefined;
    }
  }

  async function deleteFalta(id: number): Promise<void> {
    try {
      await axios.delete(`/falta/${id}`);
    } catch (error) {
      // TODO: Agregar mensaje de que no se pudo eliminar
    } finally {
      void getFaltas();
    }
  }

  function showComment(faltaComment: string): void {
    setComment(faltaComment);
    setShowModal(true);
  }

  return (
    <>
      <CommentModal
        close={() => {
          setComment('');
          setShowModal(false);
        }}
        comment={comment}
        show={showModal}
        key={comment}
      />
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Funcionários</Typography>
          </Stack>
        </Stack>
        {/* <CustomersFilters /> */}
        <FaltaTable
          loading={loading}
          handleDelete={deleteFalta}
          count={faltas.length}
          rows={faltas}
          showComment={showComment}
        />
      </Stack>
    </>
  );
}
