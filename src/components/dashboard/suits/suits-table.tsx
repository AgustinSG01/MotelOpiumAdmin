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

import TableRowsLoader from '../TableRowLoader';
import SuitData from './suit-data';

interface SuitsTableProps {
  count?: number;
  page?: number;
  rows?: SuitInfo[];
  rowsPerPage?: number;
  loading: boolean;
  handleDelete: (id: number) => void;
  editSuit: (id: number) => void;
}

export function SuitsTable({
  count = 0,
  rows = [],
  handleDelete,
  editSuit,
  loading,
}: SuitsTableProps): React.JSX.Element {
  const [page, setPage] = React.useState(0); // Current page index
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Number of rows per page

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset the table to the first page whenever rows per page changes
  };

  const display = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

     React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, [page, rowsPerPage]);

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
            {loading ? (
              <TableRowsLoader rowsNum={rowsPerPage} columnsNum={4} />
            ) : (
              display.map((row) => {
                return <SuitData key={row.id} row={row} editSuit={editSuit} handleDelete={handleDelete} />;
              })
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Card>
  );
}
