'use client';

import * as React from 'react';
import { useControleFilters } from '@/store/controle-filters';
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

import { type Employee, type ControleData as InfoControle, type Suit } from '@/types/types';

import MultipleSelector, { type Value } from '../MultipleSelector';
import TableRowsLoader from '../TableRowLoader';
import ControleData from './ControleData';

interface ControleTableProps {
  count?: number;
  rows?: InfoControle[];
  //   getControle: (id: number) => void;
  suits: Suit[];
  empregados: Employee[];
  gerentes: Employee[];

  loading: boolean;
  getControles: () => Promise<void>;
  resetFilters: () => Promise<void>;
}

export function ControlesTable({
  count = 0,
  rows = [],
  //   getControle,
  loading,
  suits,
  empregados,
  gerentes,
  getControles,
  resetFilters,
}: ControleTableProps): React.JSX.Element {
  const [page, setPage] = React.useState(0); // Current page index
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Number of rows per page

  // const [selectedItems, setSelectedItems] = React.useState<Value[]>([]); // State to manage selected items
  const {
    abastecScoreList,
    cheiroScoreList,
    empregadoList,
    faxinaScoreList,
    garagemScoreList,
    gerenteList,
    limpezaScoreList,
    manutScoreList,
    roupaScoreList,
    suitList,
    tvScoreList,
    setAbastecScoreList,
    setCheiroScoreList,
    setEmpregadoList,
    setFaxinaScoreList,
    setGaragemScoreList,
    setGerenteList,
    setLimpezaScoreList,
    setManutScoreList,
    setRoupaScoreList,
    setSuitList,
    setTvScoreList,
  } = useControleFilters();
  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset the table to the first page whenever rows per page changes
  };

  async function applyFilters(): Promise<void> {
    setSubmitting(true);
    setPage(0);
    await getControles();
    setSubmitting(false);
  }

  async function reset(): Promise<void> {
    setSubmitting(true);
    setPage(0);
    await resetFilters();
    setSubmitting(false);
  }

  const display = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const baseScoreOptions = [
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
  ];

  const [submitting, setSubmitting] = React.useState(false);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }} title="Controles">
          <TableHead>
            <TableRow sx={{ width: '100%' }}>
              <TableCell sx={{ textAlign: 'start' }} colSpan={14}>
                TABELA DE CONTROLES
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>
                <MultipleSelector
                  items={suits.map((suit) => ({
                    text: suit.nome,
                    valor: suit.id,
                  }))}
                  selectedItems={suitList}
                  setSelectedItems={(items: Value[]) => {
                    setSuitList(items);
                  }}
                  label="Suíte"
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                <MultipleSelector
                  items={baseScoreOptions}
                  selectedItems={limpezaScoreList}
                  setSelectedItems={(items: Value[]) => {
                    setLimpezaScoreList(items);
                  }}
                  label="Limpeza"
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                <MultipleSelector
                  items={baseScoreOptions}
                  selectedItems={cheiroScoreList}
                  setSelectedItems={(items: Value[]) => {
                    setCheiroScoreList(items);
                  }}
                  label="Cheiro"
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                <MultipleSelector
                  items={baseScoreOptions}
                  selectedItems={manutScoreList}
                  setSelectedItems={(items: Value[]) => {
                    setManutScoreList(items);
                  }}
                  label="Manut."
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                <MultipleSelector
                  items={baseScoreOptions}
                  selectedItems={tvScoreList}
                  setSelectedItems={(items: Value[]) => {
                    setTvScoreList(items);
                  }}
                  label="TV"
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                <MultipleSelector
                  items={baseScoreOptions}
                  selectedItems={roupaScoreList}
                  setSelectedItems={(items: Value[]) => {
                    setRoupaScoreList(items);
                  }}
                  label="Roupa."
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                <MultipleSelector
                  items={baseScoreOptions}
                  selectedItems={garagemScoreList}
                  setSelectedItems={(items: Value[]) => {
                    setGaragemScoreList(items);
                  }}
                  label="Garagem"
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                <MultipleSelector
                  items={baseScoreOptions}
                  selectedItems={faxinaScoreList}
                  setSelectedItems={(items: Value[]) => {
                    setFaxinaScoreList(items);
                  }}
                  label="Faxina"
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                <MultipleSelector
                  items={baseScoreOptions}
                  selectedItems={abastecScoreList}
                  setSelectedItems={(items: Value[]) => {
                    setAbastecScoreList(items);
                  }}
                  label="Abastec."
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                {' '}
                <MultipleSelector
                  items={gerentes.map((gerente) => ({
                    text: gerente.nome,
                    valor: gerente.id,
                  }))}
                  selectedItems={gerenteList}
                  setSelectedItems={(items: Value[]) => {
                    setGerenteList(items);
                  }}
                  label="Gerente"
                  formSx={{ maxWidth: '100px' }}
                />
              </TableCell>
              <TableCell>
                <MultipleSelector
                  items={empregados.map((empregado) => ({
                    text: empregado.nome,
                    valor: empregado.id,
                  }))}
                  selectedItems={empregadoList}
                  setSelectedItems={(items: Value[]) => {
                    setEmpregadoList(items);
                  }}
                  label="Funcionario"
                  formSx={{ maxWidth: '120px' }}
                />
              </TableCell>
              <TableCell>M.G</TableCell>
              <TableCell>M.C</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading || submitting ? (
              <TableRowsLoader rowsNum={rowsPerPage} columnsNum={14} />
            ) : (
              display.map((row) => {
                return (
                  <ControleData
                    key={row.id}
                    row={row}
                    // getControle={getControle}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignContent="center" sx={{ paddingLeft: 2 }}>
          <Button onClick={applyFilters}>Aplicar filtros</Button>
          <Button onClick={reset}>Redefinir filtros</Button>
        </Stack>
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
