import React from 'react';
import { type LavagemEmpregado } from '@/app/dashboard/relatorio/page';
import { TableCell, TableRow } from '@mui/material';

interface LavagemGerenteProps {
  row: LavagemEmpregado;
}

function LavagemEmpregadoData({ row }: LavagemGerenteProps): React.JSX.Element {
  return (
    <TableRow hover key={row.id}>
      <TableCell>{row.nome || '-'}</TableCell>

      <TableCell>{row.limpezas || 0}</TableCell>
    </TableRow>
  );
}

export default LavagemEmpregadoData;
