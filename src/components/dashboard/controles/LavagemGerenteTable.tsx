'use client';

import * as React from 'react';
import { type LavagemGerente } from '@/app/dashboard/relatorio/page';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Stack } from '@mui/system';

import TableRowsLoader from '../TableRowLoader';
import LavagemGerenteData from './LavagemGerenteData';

interface LavagemGerenteProps {
  count?: number;
  rows?: LavagemGerente[];
  loading: boolean;
  onApply?: (data: { gerente_id: number; value: number }[]) => Promise<void>; // Nueva prop
}

export function LavagemGerenteTable({
  count = 0,
  rows = [],
  loading,
  onApply,
}: LavagemGerenteProps): React.JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [inputValues, setInputValues] = React.useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Inicializar valores cuando las rows cambien
  React.useEffect(() => {
    const initialValues: Record<number, number> = {};
    rows.forEach((row) => {
      initialValues[row.id] = row.input || 0;
    });
    setInputValues(initialValues);
  }, [rows]);

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleValueChange = (rowId: number, value: number): void => {
    setInputValues((prev) => ({
      ...prev,
      [rowId]: value,
    }));
  };

  const handleApply = async (): Promise<void> => {
    if (!onApply) return;

    setIsSubmitting(true);
    try {
      // Preparar datos para enviar
      const dataToSend = rows.map((row) => ({
        gerente_id: row.id,
        value: inputValues[row.id] || 0,
      }));

      await onApply(dataToSend);
    } catch (error) {
      return;
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsSubmitting(false);
    }
  };

  const display = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table title="Controles">
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }} colSpan={14}>
                LAVAGEM SUITES - GERENTES
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>GERENTE</TableCell>
              <TableCell>EXPECTATIVA</TableCell>
              <TableCell>EXECUÇÃO</TableCell>
              <TableCell>DIFERENÇA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading || isSubmitting ? (
              <TableRowsLoader rowsNum={rowsPerPage} columnsNum={4} />
            ) : (
              display.map((row) => {
                return <LavagemGerenteData key={row.id} row={row} onValueChange={handleValueChange} />;
              })
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pl: 2 }}>
        <Button onClick={handleApply} disabled={isSubmitting}>
          aplicar
        </Button>
        <TablePagination
          component="div"
          count={count}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Stack>
    </Card>
  );
}
