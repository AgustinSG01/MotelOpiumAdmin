import React from 'react';
import { type LavagemGerente } from '@/app/dashboard/relatorio/page';
import { TableCell, TableRow, TextField } from '@mui/material';

interface LavagemGerenteProps {
  row: LavagemGerente;
  onValueChange: (id: number, value: number) => void; // Nueva prop para manejar cambios
}

function LavagemGerenteData({ row, onValueChange }: LavagemGerenteProps): React.JSX.Element {
  const [value, setValue] = React.useState<number>(row.input || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(e.target.value, 10) || 0;
    setValue(newValue);
    // Notificar al componente padre sobre el cambio
    onValueChange(row.id, newValue);
  };

  return (
    <TableRow hover key={row.id}>
      <TableCell>{row.nome || '-'}</TableCell>
      <TableCell sx={{ padding: 0 }}>
        <TextField
          id={`expectativa-input-${row.id}`}
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: false,
          }}
          InputProps={{
            inputProps: { min: 0 },
          }}
          value={value}
          onChange={handleChange}
          size="small"
          sx={{ padding: 0 }}
        />
      </TableCell>
      <TableCell>{row.faxinas || 0}</TableCell>
      <TableCell>{row.result || 0}</TableCell>
    </TableRow>
  );
}

export default LavagemGerenteData;
