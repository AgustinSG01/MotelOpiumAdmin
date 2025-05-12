import React from 'react';
import { Button, Chip, Modal, TableCell, TableRow, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Eye, Pencil } from '@phosphor-icons/react';
import { Trash } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';

import { type ControleData as ControleInfo } from '@/types/types';

import ModalButton from '../ModalButton';
import EditLimpeza from '../modalForms/EditLimpeza';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ControleProps {
  row: ControleInfo;
  //   getControle: (id: number) => void;
  handleDelete: (id: number, state: string) => void;
  refresh: () => void;
}

function ControleData({ row, handleDelete, refresh }: ControleProps): React.JSX.Element {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  function getHour(hour: Date | undefined): string {
    if (!hour) return '-';
    const hourDayjs = dayjs(hour);
    return hourDayjs.format('HH:mm');
  }

  function getDate(date: Date | undefined): string {
    if (!date) return '-';
    const dateDayjs = dayjs(date);
    return dateDayjs.format('DD/MM/YYYY');
  }

  // const state = row.fim ? 'completed' : 'inprocess';
  //             handleDelete(row.id, state);

  return (
    // TODO: terminar tabla de limpieza
    <TableRow hover key={row.id}>
      <TableCell>
        <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
          {getDate(row.data)}
        </Typography>
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.suit || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.limpeza.score || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.cheiro.score || '-'}</TableCell>

      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.manut.score}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.tv.score}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.roupa.score}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.garagem.score}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.faxina.score}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.abastec.score}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.gerente}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.empregado}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.mg}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.mc}</TableCell>
    </TableRow>
  );
}

export default ControleData;
