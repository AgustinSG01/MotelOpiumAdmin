import React from 'react';
import { type MediaGerente } from '@/app/dashboard/relatorio/page';
import { TableCell, TableRow } from '@mui/material';

interface MediaGerenteProps {
  row: MediaGerente;
}

function MediaGerenteData({ row }: MediaGerenteProps): React.JSX.Element {
  return (
    <TableRow hover key={row.id}>
      <TableCell>{row.nome || '-'}</TableCell>
      <TableCell>{row.controles || '-'}</TableCell>
      <TableCell>{row.limpezas || '-'}</TableCell>
    </TableRow>
  );
}

export default MediaGerenteData;
