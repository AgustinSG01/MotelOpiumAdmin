import React from 'react';
import { type MediaEmpregado } from '@/app/dashboard/relatorio/page';
import { TableCell, TableRow } from '@mui/material';

interface MediaEmpregadoProps {
  row: MediaEmpregado;
}

function MediaEmpregadoData({ row }: MediaEmpregadoProps): React.JSX.Element {
  return (
    <TableRow hover key={row.id}>
      <TableCell>{row.nome || '-'}</TableCell>
      <TableCell>{row.controles || '-'}</TableCell>
      <TableCell>{row.quantityControles || '-'}</TableCell>
      <TableCell>{row.limpezas || '-'}</TableCell>
    </TableRow>
  );
}

export default MediaEmpregadoData;
