'use client';

import * as React from 'react';
import { type Constantes } from '@/app/dashboard/relatorio/page';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TableRowsLoader from '../TableRowLoader';
import ConstantesData from './ConstantesData';

interface ConstantesTableProps {
  rows?: Constantes[];
  loading: boolean;
}

export function ConstantesTable({ rows = [], loading }: ConstantesTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table title="CONSTANTES">
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }} colSpan={14}>
                COEFICIENTES
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LOCAÇÕES</TableCell>
              <TableCell>ServG</TableCell>
              <TableCell>Rec</TableCell>
              <TableCell>Ger</TableCell>
              <TableCell>TOTAL LOCAÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowsLoader rowsNum={6} columnsNum={5} />
            ) : (
              rows.map((row) => {
                return <ConstantesData key={row.limpezas} row={row} />;
              })
            )}
          </TableBody>
        </Table>
      </Box>
      {/* <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
}
