import React from 'react';
import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Pencil, Trash } from '@phosphor-icons/react';

import { type Employee } from '@/types/types';

interface EmployeeProps {
  row: Employee;
  handleDelete: (id: number, rol: string) => void;
  editEmployee: (id: number, rol: string) => void;
}

function EmployeeData({ row, handleDelete, editEmployee }: EmployeeProps) {
  const [showPin, setShowPin] = React.useState(false);

  function codifiedPin(): string {
    const pin = JSON.stringify(row.pin);
    let placeholder = '';
    for (const _ of pin) {
      placeholder += '*';
    }
    return placeholder;
  }

  return (
    <TableRow hover key={row.id}>
      <TableCell>
        <Typography variant="subtitle2">{row.nome}</Typography>
      </TableCell>
      <TableCell>{row.rol.toUpperCase()}</TableCell>
      <TableCell
        onClick={() => {
          setShowPin(!showPin);
        }}
        sx={{ cursor: 'pointer' }}
      >
        {showPin ? row.pin : codifiedPin()}
      </TableCell>

      <TableCell>
        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDelete(row.id, row.rol);
            }}
          >
            <Trash color="white" size={20} />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              editEmployee(row.id, row.rol);
            }}
          >
            <Pencil size={20} />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default EmployeeData;
