import React from 'react';
import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Trash } from '@phosphor-icons/react';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';

import { type Falta } from '@/types/types';

interface FaltaProps {
  row: Falta;
  handleDelete: (id: number) => void;
  showComment: (comment: string) => void;
}

function FaltaData({ row, handleDelete, showComment }: FaltaProps): React.JSX.Element {
  const data = dayjs(row.data).format('DD/MM/YYYY');
  return (
    <TableRow hover key={row.id}>
      <TableCell>
        <Typography variant="subtitle2">{row.empregado?.nome || '-'}</Typography>
      </TableCell>
      <TableCell>{row.gerente.nome || '-'}</TableCell>
      <TableCell>{data}</TableCell>

      <TableCell>
        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            onClick={() => {
              showComment(row.comentario);
            }}
            disabled={!row.comentario}
          >
            <Eye size={20} />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <Trash color="white" size={20} />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default FaltaData;
