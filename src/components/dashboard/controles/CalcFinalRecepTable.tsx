'use client';

import * as React from 'react';
import { type CalcFinalRecep } from '@/app/dashboard/relatorio/page';
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
import CalcFinalRecepData from './CalcFinalRecepData';

interface CalcFinalProps {
  count?: number;
  rows?: CalcFinalRecep[];
  loading: boolean;
  changeSolicita: (empregado_id: number, value: boolean) => Promise<void>;
  changeFalta: (empregado_id: number, value: boolean) => Promise<void>;
  changeFaltaTwo: (empregado_id: number, value: boolean) => Promise<void>;
}

export function CalcFinalRecepTable({
  count = 0,
  rows = [],
  //   getControle,
  loading,
  changeSolicita,
  changeFalta,
  changeFaltaTwo,
}: CalcFinalProps): React.JSX.Element {
  const [page, setPage] = React.useState(0); // Current page index
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Number of rows per page
  const [submitting, setSubmitting] = React.useState(false);

  async function handleChangeSolicita(empregadoid: number, value: boolean): Promise<void> {
    setSubmitting(true);
    await changeSolicita(empregadoid, value);
    setSubmitting(false);
  }

  async function handleChangeFalta(empregadoid: number, value: boolean): Promise<void> {
    setSubmitting(true);
    await changeFalta(empregadoid, value);
    setSubmitting(false);
  }

  async function handleChangeFaltaTwo(empregadoid: number, value: boolean): Promise<void> {
    setSubmitting(true);
    await changeFaltaTwo(empregadoid, value);
    setSubmitting(false);
  }

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
              <TableCell sx={{ textAlign: 'center' }} colSpan={14}>
                CALCULOS FINAIS - RECEPÇÃO
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NOME</TableCell>
              <TableCell>NOTA</TableCell>
              <TableCell>LAV.</TableCell>
              <TableCell>SOLICITA</TableCell>
              <TableCell>FALTOU</TableCell>
              <TableCell>SUBTOTAL</TableCell>
              <TableCell>FALTA2</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>ZEROS</TableCell>
              <TableCell>VALOR P/ PAGAMENTO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading || submitting ? (
              <TableRowsLoader rowsNum={rowsPerPage} columnsNum={10} />
            ) : (
              display.map((row) => {
                return (
                  <CalcFinalRecepData
                    changeFalta={handleChangeFalta}
                    changeFaltaTwo={handleChangeFaltaTwo}
                    key={row.id}
                    row={row}
                    changeSolicita={handleChangeSolicita}
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
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Card>
  );
}
