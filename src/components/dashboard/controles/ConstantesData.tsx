import React from 'react';
import { type Constantes } from '@/app/dashboard/relatorio/page';
import { TableCell, TableRow } from '@mui/material';

interface ConstantesDataProps {
  row: Constantes;
}

function ConstantesData({ row }: ConstantesDataProps): React.JSX.Element {
  return (
    <TableRow hover key={row.limpezas}>
      <TableCell>{row.limpezas}</TableCell>
      <TableCell>{row.servg}</TableCell>
      <TableCell>{row.rec}</TableCell>
      <TableCell>{row.ger}</TableCell>
      <TableCell align="center">{row.total}</TableCell>
    </TableRow>
  );
}

export default ConstantesData;
