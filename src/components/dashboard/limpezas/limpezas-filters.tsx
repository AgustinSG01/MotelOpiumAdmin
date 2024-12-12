import * as React from 'react';
import axios from '@/axios-config';
import { useLimpezaFilters } from '@/store/filters';
import { DateRangePicker } from '@mui/lab';
import { Button, MenuItem, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { type Dayjs } from 'dayjs';

import { type Employee, type Suit } from '@/types/types';

interface FiltersProps {
  applyFilters: () => void;
}

export function LimpezasFilters({ applyFilters }: FiltersProps): React.JSX.Element {
  const {
    orderBy,
    setOrderBy,
    suit: suitFiltered,
    setSuit,
    empregado: empregadoFiltered,
    setEmpregado,
    gerente: gerenteFiltered,
    setGerente,
    initialDate,
    setInitialDate,
    finalDate,
    setFinalDate,
  } = useLimpezaFilters();

  const [empregados, setEmpregados] = React.useState<Employee[] | null>();
  const [gerentes, setGerentes] = React.useState<Employee[] | null>([]);
  const [suits, setSuits] = React.useState<Suit[] | null>([]);
  const [initialDateDisplay, setInitialDateDisplay] = React.useState<Dayjs | null>(dayjs());
  const [finalDateDisplay, setFinalDateDisplay] = React.useState<Dayjs | null>(dayjs());

  React.useEffect(() => {
    void getEmpregados();
    void getGerentes();
    void getSuits();
  }, []);

  async function getEmpregados(): Promise<void> {
    try {
      const response = await axios.get('/empregado/limpeza');
      const data: Employee[] = response.data as Employee[];
      setEmpregados(data);
    } catch (error) {
      return undefined;
    }
  }

  async function getGerentes(): Promise<void> {
    try {
      const response = await axios.get('/empregado/gerente');
      const data: Employee[] = response.data as Employee[];
      setGerentes(data);
    } catch (error) {
      return undefined;
    }
  }

  async function getSuits(): Promise<void> {
    try {
      const response = await axios.get('/suit');
      const data: Suit[] = response.data as Suit[];
      setSuits(data);
    } catch (error) {
      return undefined;
    }
  }

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          defaultValue={orderBy}
          label="Ordernar por"
          fullWidth
          onChange={(e) => {
            setOrderBy(e.target.value);
          }}
          select
          sx={{ maxWidth: '300px' }}
        >
          <MenuItem value="data;asc">Data crescente</MenuItem>
          <MenuItem value="data;desc">Data decrescente</MenuItem>
          <MenuItem value="score;asc">Pontuação crescente</MenuItem>
          <MenuItem value="score;desc">Pontuação decrescente</MenuItem>
        </TextField>
        {/* SUIT */}
        <TextField
          defaultValue={suitFiltered}
          label="Suit"
          fullWidth
          onChange={(e) => {
            setSuit(e.target.value);
          }}
          select
          sx={{ maxWidth: '300px' }}
        >
          <MenuItem value="all">Todos</MenuItem>
          {suits?.map((suit) => (
            <MenuItem key={suit.id} value={suit.id}>
              {suit.nome}
            </MenuItem>
          ))}
        </TextField>
        {/* EMPREGADO */}
        <TextField
          defaultValue={empregadoFiltered}
          label="Funcionário"
          fullWidth
          onChange={(e) => {
            setEmpregado(e.target.value);
          }}
          select
          sx={{ maxWidth: '300px' }}
        >
          <MenuItem value="all">Todos</MenuItem>

          {empregados?.map((empregado) => (
            <MenuItem key={empregado.id} value={empregado.id}>
              {empregado.nome}
            </MenuItem>
          ))}
        </TextField>
        {/* GERENTE */}
        <TextField
          defaultValue={gerenteFiltered}
          label="Gerente"
          fullWidth
          onChange={(e) => {
            setGerente(e.target.value);
          }}
          select
          sx={{ maxWidth: '300px' }}
        >
          <MenuItem value="all">Todos</MenuItem>

          {gerentes?.map((gerente) => (
            <MenuItem key={gerente.id} value={gerente.id}>
              {gerente.nome}
            </MenuItem>
          ))}
        </TextField>
        {/* FECHA */}
        {/* TODO: Terminar esto */}
        <DatePicker
          label="Data de início"
          value={initialDateDisplay}
          onChange={(newValue) => {
            if (newValue) {
              setInitialDate(newValue);
              setInitialDateDisplay(newValue);
            }
          }}
          sx={{ minWidth: '200px' }}
        />

        <DatePicker
          label="Data de início"
          value={finalDateDisplay}
          onChange={(newValue) => {
            if (newValue) {
              setFinalDate(newValue);
              setFinalDateDisplay(newValue);
            }
          }}
          sx={{ minWidth: '200px' }}
        />

        {/* ESTADO */}
        {/* TODO: Este filtro solo cambiará la url principal */}
        {/* <TextField
          defaultValue={orderBy}
          label="Ordernar por"
          fullWidth
          onChange={(e) => {
            setOrderBy(e.target.value);
          }}
          select
          sx={{ maxWidth: '300px' }}
        >
          <MenuItem value="data;asc">Data crescente</MenuItem>
          <MenuItem value="data;desc">Data decrescente</MenuItem>
          <MenuItem value="score;asc">Pontuação crescente</MenuItem>
          <MenuItem value="score;desc">Pontuação decrescente</MenuItem>
        </TextField> */}
        <Button
          onClick={() => {
            applyFilters();
          }}
        >
          Aplicar
        </Button>
      </Stack>
    </Card>
  );
}
