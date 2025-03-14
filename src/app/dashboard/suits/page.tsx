'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { Suit, SuitInfo } from '@/types/types';
import EditSuit from '@/components/dashboard/modalForms/EditSuit';
import NewSuit from '@/components/dashboard/modalForms/NewSuit';
import { SuitsTable } from '@/components/dashboard/suits/suits-table';

import axios from '../../../axios-config';

export default function Page(): React.JSX.Element {
  const [suits, setSuits] = React.useState<SuitInfo[]>([]);
  const [showModal, setShowModal] = React.useState({
    new: false,
    edit: false,
  });
  const [suit, setSuit] = React.useState<null | Suit>(null);
  const [loading, setLoading] = React.useState(false);
  const page = 0;
  const rowsPerPage = 5;

  React.useEffect(() => {
    void getSuits();
  }, []);

  async function getSuits(): Promise<void> {
    try {
      setLoading(true);
      const response = await axios.get('/suit/info');
      const data: SuitInfo[] = response.data as SuitInfo[];
      setSuits(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return undefined;
    }
  }

  async function getSuit(id: number): Promise<void> {
    try {
      const response = await axios.get(`/suit/one/${id}`);
      const data = response.data as Suit;
      if (data) {
        setSuit(data);
        setShowModal({ edit: true, new: false });
      }
    } catch (error) {
      // TODO: Alert de que hubo un error
    }
  }

  async function deleteSuit(id: number): Promise<void> {
    try {
      await axios.delete(`/suit/${id}`);
    } catch (error) {
      // TODO: Agregar mensaje de que no se pudo eliminar
    } finally {
      void getSuits();
    }
  }

  return (
    <>
      <EditSuit
        suit={suit}
        open={showModal.edit}
        handleClose={() => {
          setShowModal({ edit: false, new: false });
        }}
        refresh={getSuits}
      />
      <NewSuit
        open={showModal.new}
        handleClose={() => {
          setShowModal({ new: false, edit: false });
        }}
        refresh={getSuits}
      />
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Suits</Typography>
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
        {/* <CustomersFilters /> */}
        <SuitsTable
          loading={loading}
          handleDelete={deleteSuit}
          count={suits.length}
          page={page}
          rows={suits}
          rowsPerPage={rowsPerPage}
          editSuit={getSuit}
        />
      </Stack>
    </>
  );
}
