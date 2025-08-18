'use client';

import * as React from 'react';
import { type MediaEmpregado } from '@/app/dashboard/relatorio/page';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import TableRowsLoader from '../TableRowLoader';
import DataMediaGeneral from './DataMediaGeneral';

interface MediaEmpregadoProps {
  count?: number;
  rows?: MediaEmpregado[];
  loading: boolean;
}

export function TablaMediaGeneral({ count = 0, rows = [], loading }: MediaEmpregadoProps): React.JSX.Element {
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

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table title="Controles">
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'start' }} colSpan={14}>
                MEDIA
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FUNCIONÁRIO/GERENTE</TableCell>
              <TableCell>MEDIA</TableCell>
              <TableCell>SUITES LIMPAS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowsLoader rowsNum={rowsPerPage} columnsNum={3} />
            ) : (
              display.map((row) => {
                if (row.limpezas > 0) {
                  return <DataMediaGeneral key={row.id} row={row} />;
                }
                return null;
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
