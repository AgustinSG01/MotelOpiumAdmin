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

import { type ControleData as InfoControle } from '@/types/types';

// import { type Value } from '../MultipleSelector';
import TableRowsLoader from '../TableRowLoader';
import ControleData from './ControleData';

interface ControleTableProps {
  count?: number;
  rows?: InfoControle[];
  //   getControle: (id: number) => void;

  refresh: () => void;

  loading: boolean;
  handleDelete: (id: number, state: string) => void;
}

export function ControlesTable({
  count = 0,
  rows = [],
  //   getControle,
  loading,
  handleDelete,
  refresh,
}: ControleTableProps): React.JSX.Element {
  const [page, setPage] = React.useState(0); // Current page index
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Number of rows per page

  // const [selectedItems, setSelectedItems] = React.useState<Value[]>([]); // State to manage selected items

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

  // function selectItems(items: Value[]): void {
  //   setSelectedItems(items);
  // }
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Suite</TableCell>
              <TableCell>Limpeza</TableCell>
              {/* <TableCell>
                <MultipleSelector
                  items={[
                    { text: '0', valor: 0 },
                    { text: '1', valor: 1 },
                    { text: '2', valor: 2 },
                    { text: '3', valor: 3 },
                    { text: '4', valor: 4 },
                    { text: '5', valor: 5 },
                    { text: '6', valor: 6 },
                    { text: '7', valor: 7 },
                    { text: '8', valor: 8 },
                    { text: '9', valor: 9 },
                    { text: '10', valor: 10 },
                  ]}
                  selectedItems={selectedItems}
                  setSelectedItems={selectItems}
                  label="Cheiro"
                  formSx={{ maxWidth: '100px' }}

                />
              </TableCell> */}
              <TableCell>Cherio</TableCell>
              <TableCell>Manut.</TableCell>
              <TableCell>TV</TableCell>
              <TableCell>Roupa</TableCell>
              <TableCell>Garagem</TableCell>
              <TableCell>Faxina</TableCell>
              <TableCell>Abastec.</TableCell>
              <TableCell>Gerente</TableCell>
              <TableCell>Funcionario</TableCell>
              <TableCell>M.G</TableCell>
              <TableCell>M.C</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowsLoader rowsNum={rowsPerPage} columnsNum={14} />
            ) : (
              display.map((row) => {
                return (
                  <ControleData
                    key={row.id}
                    row={row}
                    // getControle={getControle}
                    handleDelete={handleDelete}
                    refresh={refresh}
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
