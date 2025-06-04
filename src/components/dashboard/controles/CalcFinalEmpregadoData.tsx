import React from 'react';
import { type CalcFinalEmpreado } from '@/app/dashboard/relatorio/page';
import { Checkbox, Chip, TableCell, TableRow } from '@mui/material';

interface CalcFinalProps {
  row: CalcFinalEmpreado;
  changeSolicita: (empregado_id: number, value: boolean) => void;
}

function CalcFinalEmpregadoData({ row, changeSolicita }: CalcFinalProps): React.JSX.Element {
  const [checked, setChecked] = React.useState(row.solicita || false);
  return (
    <TableRow hover key={row.id}>
      <TableCell>{row.nome || '-'}</TableCell>
      <TableCell>{row.nota || '-'}</TableCell>
      <TableCell>{row.lavagem || '-'}</TableCell>
      <TableCell>
        <Checkbox
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            changeSolicita(row.id, e.target.checked);
          }}
          sx={{ padding: 0 }}
        />
      </TableCell>
      <TableCell>
        <Chip label={row.faltou ? 'Sim' : 'No'} color={row.faltou ? 'error' : 'success'} />
      </TableCell>
      <TableCell>{row.subtotal || '-'}</TableCell>
      <TableCell>
        <Chip label={row.faltou ? 'Sim' : 'No'} color={row.faltou ? 'error' : 'success'} />
      </TableCell>
      <TableCell>{row.total || '-'}</TableCell>
      <TableCell>{row.zeros || '-'}</TableCell>
      <TableCell>{row.pagamento || '-'}</TableCell>
    </TableRow>
  );
}

export default CalcFinalEmpregadoData;
