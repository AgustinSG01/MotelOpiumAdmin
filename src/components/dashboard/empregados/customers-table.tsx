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

import { type Employee } from '@/types/types';

import TableRowsLoader from '../TableRowLoader';
import EmployeeData from './employee-data';

interface CustomersTableProps {
  count?: number;
  rows?: Employee[];
  handleDelete: (id: number, rol: string) => void;
  editEmployee: (id: number, rol: string) => void;
  loading: boolean;
}

export function CustomersTable({
  count = 0,
  rows = [],
  loading,

  handleDelete,
  editEmployee,
}: CustomersTableProps): React.JSX.Element {
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

  const display = React.useMemo(() => {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, page, rowsPerPage]);

  React.useEffect(() => {
    // Si el número total de filas es menor que el índice de la primera fila en la página actual, reinicia la página a 0
    if (rows.length && page * rowsPerPage >= rows.length) {
      setPage(0);
    }
  }, [rows, rowsPerPage]);

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
              <TableCell>Função</TableCell>
              <TableCell>Pin</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowsLoader rowsNum={rowsPerPage} columnsNum={4} />
            ) : (
              display.map((row) => {
                return (
                  <EmployeeData
                    key={`${row.id}-${row.rol}`}
                    row={row}
                    editEmployee={editEmployee}
                    handleDelete={handleDelete}
                  />
                );
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
