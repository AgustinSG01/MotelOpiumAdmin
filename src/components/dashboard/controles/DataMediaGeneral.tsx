import React from 'react';
import { type MediaEmpregado } from '@/app/dashboard/relatorio/page';
import { TableCell, TableRow } from '@mui/material';

interface MediaEmpregadoProps {
  row: MediaEmpregado;
}

function DataMediaGeneral({ row }: MediaEmpregadoProps): React.JSX.Element {
  return (
    <TableRow hover key={row.id}>
      <TableCell>{row.nome || '-'}</TableCell>
      <TableCell>{row.controles || '-'}</TableCell>
      <TableCell>{row.limpezas || '-'}</TableCell>
    </TableRow>
  );
}

export default DataMediaGeneral;
