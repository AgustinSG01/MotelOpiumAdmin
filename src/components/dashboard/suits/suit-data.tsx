import React from 'react';
import { useRouter } from 'next/navigation';
import { useLimpezaFilters } from '@/store/filters';
import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Eye, List, Pencil, Trash } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { type SuitInfo } from '@/types/types';

import LimpezaInfo from '../modalForms/LimpezaInfo';

interface SuitProps {
  row: SuitInfo;
  handleDelete: (id: number) => void;
  editSuit: (id: number) => void;
}

function SuitData({ row, handleDelete, editSuit }: SuitProps): React.ReactElement {
  const router = useRouter();
  const currentDate = dayjs(row.lastClean?.data);
  const formattedDate = currentDate.format('DD/MM/YYYY HH:mm');
  const [showInfo, setShowInfo] = React.useState(false);

  const { setSuit } = useLimpezaFilters();
  return (
    <>
      <LimpezaInfo
        handleClose={() => {
          setShowInfo(false);
        }}
        open={showInfo}
        suit={row}
        key={`info-${row.id}`}
      />
      <TableRow hover key={row.id}>
        <TableCell>
          <Typography variant="subtitle2">{row.nome}</Typography>
        </TableCell>
        <TableCell>{row.cleansQuantity}</TableCell>
        <TableCell>{row.lastClean ? formattedDate : 'Nenhuma'}</TableCell>

        <TableCell>
          <Stack direction="row" gap={2}>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                setShowInfo(true);
              }}
              disabled={row.nome === 'Cozinha'}
            >
              <Eye color="white" size={20} />
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                setSuit(`${row.id}`);
                router.push('/dashboard/limpezas');
              }}
              disabled={row.nome === 'Cozinha'}
            >
              <List color="white" size={20} />
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                editSuit(row.id);
              }}
              disabled={row.nome === 'Cozinha'}
            >
              <Pencil size={20} />
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDelete(row.id);
              }}
              disabled={row.nome === 'Cozinha'}
            >
              <Trash color="white" size={20} />
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}

export default SuitData;
