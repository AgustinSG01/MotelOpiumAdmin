import React from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { type ControleData as ControleInfo } from '@/types/types';

interface ControleProps {
  row: ControleInfo;
  //   getControle: (id: number) => void;
}

function ControleData({ row }: ControleProps): React.JSX.Element {
  function getDate(date: Date | undefined): string {
    if (!date) return '-';
    const dateDayjs = dayjs(date);
    return dateDayjs.format('DD/MM/YYYY');
  }

  return (
    <TableRow hover key={row.id}>
      <TableCell>
        <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
          {getDate(row.data)}
        </Typography>
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.suit || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.limpeza?.score || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.cheiro?.score || '-'}</TableCell>

      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.manut?.score || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.tv?.score || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.roupa?.score || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.garagem?.score || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.faxina?.score || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.aspectos.abastec?.score || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.gerente || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.empregado || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.mg || '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{row.mc || '-'}</TableCell>
    </TableRow>
  );
}

export default ControleData;
