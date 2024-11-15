import React from 'react';
import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Pencil, Trash } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { type SuitInfo } from '@/types/types';

interface SuitProps {
  row: SuitInfo;
  handleDelete: (id: number) => void;
  editSuit: (id: number) => void;
}

function SuitData({ row, handleDelete, editSuit }: SuitProps): React.ReactElement {
  const currentDate = dayjs(row.lastClean);
  const formattedDate = currentDate.format('DD/MM/YYYY HH:mm');
  return (
    <TableRow hover key={row.id}>
      <TableCell>
        <Typography variant="subtitle2">{row.nome}</Typography>
      </TableCell>
      <TableCell>{row.cleansQuantity}</TableCell>
      <TableCell>{row.lastClean ? formattedDate : 'Nenhuma'}</TableCell>

      <TableCell>
        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <Trash color="white" size={20} />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              editSuit(row.id);
            }}
          >
            <Pencil size={20} />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default SuitData;
