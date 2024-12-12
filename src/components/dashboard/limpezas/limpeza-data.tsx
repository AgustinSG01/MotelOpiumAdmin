import React from 'react';
import { Button, Chip, TableCell, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Pencil, Trash } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { type Limpeza } from '@/types/types';

interface LimpezaProps {
  row: Limpeza;
  handleDelete: (id: number, rol: string) => void;
  editEmployee: (id: number, rol: string) => void;
}

function LimpezaData({ row, handleDelete, editEmployee }: LimpezaProps) {
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

  return (
    // TODO: terminar tabla de limpieza
    <TableRow hover key={row.id}>
      <TableCell>
        <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
          {row.suit?.nome || '-'}
        </Typography>
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.empregado?.nome || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.gerente?.nome || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.score && row.score > 0 ? row.score : '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{getHour(row.comeco)}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{getHour(row.fim)}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{getDate(row.data)}</TableCell>

      <TableCell sx={{ textAlign: 'center' }}>
        {row.fim ? <Chip label="Finalizada" color="success" /> : <Chip label="Em andamento" color="warning" />}
      </TableCell>

      {/* ACCIONES */}
      <TableCell>
        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              //   handleDelete(row.id, row.rol);
            }}
          >
            <Trash color="white" size={20} />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              //   editEmployee(row.id, row.rol);
            }}
          >
            <Pencil size={20} />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default LimpezaData;
