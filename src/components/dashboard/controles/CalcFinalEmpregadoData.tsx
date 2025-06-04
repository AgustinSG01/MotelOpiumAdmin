import React from 'react';
import { type CalcFinalEmpreado } from '@/app/dashboard/relatorio/page';
import { Checkbox, TableCell, TableRow } from '@mui/material';

interface CalcFinalProps {
  row: CalcFinalEmpreado;
  changeSolicita: (empregado_id: number, value: boolean) => void;
  updateFaltaOne: (empregado_id: number, value: boolean) => void;
  updateFaltaTwo: (empregado_id: number, value: boolean) => void;
}

function CalcFinalEmpregadoData({
  row,
  changeSolicita,
  updateFaltaOne,
  updateFaltaTwo,
}: CalcFinalProps): React.JSX.Element {
  const [checked, setChecked] = React.useState(row.solicita || false);
  const [checkedFaltaOne, setCheckedFaltaOne] = React.useState(row.faltou || false);
  const [checkedFaltaTwo, setCheckedFaltaTwo] = React.useState(row.faltou2 || false);
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
        <Checkbox
          checked={checkedFaltaOne}
          onChange={(e) => {
            setCheckedFaltaOne(e.target.checked);
            updateFaltaOne(row.id, e.target.checked);
          }}
          sx={{ padding: 0 }}
        />
      </TableCell>
      <TableCell>{row.subtotal || '-'}</TableCell>
      <TableCell>
        <Checkbox
          checked={checkedFaltaTwo}
          onChange={(e) => {
            setCheckedFaltaTwo(e.target.checked);
            updateFaltaTwo(row.id, e.target.checked);
          }}
          sx={{ padding: 0 }}
        />
      </TableCell>
      <TableCell>{row.total || '-'}</TableCell>
      <TableCell>{row.zeros || '-'}</TableCell>
      <TableCell>{row.pagamento || '-'}</TableCell>
    </TableRow>
  );
}

export default CalcFinalEmpregadoData;
