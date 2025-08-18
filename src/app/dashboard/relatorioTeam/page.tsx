'use client';

import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { type Dayjs } from 'dayjs';

import { type Aspect, type ControleData as InfoControle } from '@/types/types';
import useEmpregados from '@/hooks/use-empregados';
import { AspectsTable } from '@/components/dashboard/controles/AspectsTable';
import { ControlesTableWithoutFilters } from '@/components/dashboard/controles/ControlesTableWithoutFilters';
import { TablaMediaGeneral } from '@/components/dashboard/controles/TablaMediaGeneral';
import { Limpezas } from '@/components/dashboard/overview/limpezas-month';
import { TimePerSuit } from '@/components/dashboard/overview/time-per-suts';
import Selector from '@/components/dashboard/Selector';

import axios from '../../../axios-config';
import { MediaEmpregado } from '../relatorio/page';

export default function Page(): React.JSX.Element {
  const [timesPerSuit, setTimesPerSuit] = React.useState<{
    chartSeries: { name: string; data: number[] }[];
    labels: string[];
  }>({
    chartSeries: [],
    labels: [],
  });
  const [totalLimpezas, setTotalLimpezas] = React.useState<number>(0);
  const [controls, setControls] = React.useState<InfoControle[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [gerenteId, setGerenteId] = React.useState<number | null>(null);
  const [aspects, setAspects] = React.useState<Aspect[]>([]);
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [mediaEmpregados, setMediaEmpregados] = React.useState<MediaEmpregado[]>([]);
  const [mediaGerente, setMediaGerente] = React.useState<MediaEmpregado[]>([]);

  const { empregados: gerentes, error, loading } = useEmpregados('gerente');

  async function getTimesPerSuit(): Promise<void> {
    try {
      const response = await axios.get<{ chartSeries: { name: string; data: number[] }; labels: string[] }>(
        `/statics/time-promedy-limpeza-per-suit-team/${gerenteId}?selectedDay=${date?.date()}&selectedMonth=${date?.month()}&selectedYear=${date?.year()}`
      );
      setTimesPerSuit({
        chartSeries: [response.data.chartSeries],
        labels: response.data.labels,
      });
    } catch (_error) {
      return;
    }
  }

  async function getMediaEmpregados(): Promise<void> {
    try {
      const response = await axios.get<MediaEmpregado[]>(
        `/empregado/limpeza/media/team/${gerenteId}?selectedDay=${date?.date()}&selectedMonth=${date?.month()}&selectedYear=${date?.year()}`
      );
      setMediaEmpregados(response.data);
    } catch (_error) {
      return;
    }
  }

  async function getMediaGerente(): Promise<void> {
    try {
      const response = await axios.get<MediaEmpregado[]>(
        `/empregado/gerente/media/team/${gerenteId}?selectedDay=${date?.date()}&selectedMonth=${date?.month()}&selectedYear=${date?.year()}`
      );
      setMediaGerente(response.data);
    } catch (_error) {
      return;
    }
  }

  async function getTotalLimpezas(): Promise<void> {
    try {
      const response = await axios.get<number>(
        `/statics/total-limpezas-day/${gerenteId}?selectedDay=${date?.date()}&selectedMonth=${date?.month()}&selectedYear=${date?.year()}`
      );
      setTotalLimpezas(response.data);
    } catch (_error) {
      return;
    }
  }

  async function getAspects(): Promise<void> {
    try {
      const response = await axios.get<Aspect[]>(
        `/controle/aspects/${gerenteId}?selectedDay=${date?.date()}&selectedMonth=${date?.month()}&selectedYear=${date?.year()}`
      );
      setAspects(response.data);
    } catch (_error) {
      return;
    }
  }

  async function getControleWithFilters(): Promise<void> {
    try {
      const response = await axios.get(
        `/controle/turma/${gerenteId}?selectedDay=${date?.date()}&selectedMonth=${date?.month()}&selectedYear=${date?.year()}`
      );
      const data: InfoControle[] = response.data as InfoControle[];
      setControls(data);
    } catch (_error) {
      return;
    }
  }

  async function fetchData(): Promise<void> {
    try {
      setIsLoading(true);
      await getTimesPerSuit();
      await getControleWithFilters();
      await getTotalLimpezas();
      await getAspects();
      await getMediaEmpregados();
      await getMediaGerente();
      setIsLoading(false);
    } catch (_error) {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (gerenteId) {
      void fetchData();
    }
  }, [gerenteId]);

  React.useEffect(() => {
    if (gerentes.length > 0 && gerenteId === null) {
      setGerenteId(gerentes[0].id);
    }
  }, [gerentes, gerenteId]);

  return (
    <Grid container spacing={3} sx={{ paddingX: 0 }}>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
        <Stack spacing={3} direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
          <Selector
            items={gerentes}
            value={gerenteId ?? ''}
            error={error}
            loading={loading}
            label="Gerente"
            noItemsText="Nenhum gerente cadastrado"
            labelId="gerente-selector"
            handleChange={(value) => {
              setGerenteId(Number(value));
            }}
          />
          <DatePicker
            label="Selecionar data"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
          />
          <Button onClick={fetchData} sx={{ fontWeight: 'bold', color: '1.2rem' }}>
            Aplicar
          </Button>
        </Stack>
      </Grid>
      <Grid lg={3} sm={6} xs={12} item>
        <Limpezas sx={{ height: '100%' }} value={totalLimpezas} loading={isLoading} text="" />
      </Grid>
      <Grid lg={12} xs={12} item>
        <TimePerSuit
          sx={{ height: '100%' }}
          chartSeries={timesPerSuit.chartSeries}
          labels={timesPerSuit.labels || []}
          loading={isLoading}
        />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingX: 0 }} item>
        <AspectsTable count={aspects.length} rows={aspects} loading={isLoading} />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingX: 0 }} item>
        <TablaMediaGeneral count={controls.length} rows={[...mediaGerente, ...mediaEmpregados]} loading={isLoading} />
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingX: 0 }} item>
        <ControlesTableWithoutFilters count={controls.length} rows={controls} loading={isLoading} />
      </Grid>
    </Grid>
  );
}
