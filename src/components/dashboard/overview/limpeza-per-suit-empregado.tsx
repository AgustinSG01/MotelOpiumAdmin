'use client';

import * as React from 'react';
import { CardActions, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

import useEmpregados from '@/hooks/use-empregados';
import { Chart } from '@/components/core/chart';

import Selector from '../Selector';

export interface SalesProps {
  sx?: SxProps;
  chartSeries: { name: string; data: number[] }[];
  labels: string[];
  loading: boolean;
  getLimpezasPerSuitByEmpregado: (empregadoId: number) => Promise<void>;
  empregadoId: number;
}
export interface Result {
  suit: string;
  limpezas: number;
}
export function LimpezaPerSuitEmpregado({
  sx,
  chartSeries,
  labels,
  loading,
  getLimpezasPerSuitByEmpregado,
  empregadoId,
}: SalesProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);

  const { empregados, error, loading: loadingEmpregados } = useEmpregados('limpeza');

  const [empregado, setEmpregado] = React.useState<string | number>(empregadoId);
  const [actualLoading, setActualLoading] = React.useState(false);
  function changeEmpregado(value: string | number): void {
    setEmpregado(value);
  }

  async function getInfo(): Promise<void> {
    setActualLoading(true);
    await getLimpezasPerSuitByEmpregado(Number(empregado));
    setActualLoading(false);
  }

  React.useEffect(() => {
    if (empregado !== undefined && empregado !== '') {
      void getInfo();
    }
  }, [empregado]);

  React.useEffect(() => {
    if (empregadoId !== undefined && empregadoId !== null) {
      setEmpregado(empregadoId);
    }
  }, [empregadoId]);

  return (
    <Card sx={sx}>
      <CardHeader title="Tempo de limpeza por suítes" />
      <CardContent>
        {loading || actualLoading ? (
          <Skeleton variant="rectangular" width="100%" height={350} sx={{ bgcolor: 'grey.100' }} />
        ) : (
          <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
        <Selector
          error={error}
          items={empregados}
          loading={loadingEmpregados}
          label=""
          labelId="empregado"
          value={empregado}
          handleChange={changeEmpregado}
          noItemsText="Nenhum funcionário cadastrado"
        />
      </CardActions>
    </Card>
  );
}

function useChartOptions(categories: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: '40px' } },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },

      categories,
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}
