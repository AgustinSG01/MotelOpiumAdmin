'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { type SuitInfo } from '@/types/types';

import SuitData from './suit-data';

function noop(): void {
  // do nothing
}

interface SuitsTableProps {
  count?: number;
  page?: number;
  rows?: SuitInfo[];
  rowsPerPage?: number;
  handleDelete: (id: number) => void;
  editSuit: (id: number) => void;
}

export function SuitsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  handleDelete,
  editSuit,
}: SuitsTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Número de limpezas</TableCell>
              <TableCell>Última limpeza</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return <SuitData key={row.id} row={row} editSuit={editSuit} handleDelete={handleDelete} />;
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
