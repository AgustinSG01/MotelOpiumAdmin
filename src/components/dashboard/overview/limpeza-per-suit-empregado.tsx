'use client';

import * as React from 'react';
import { CardActions, IconButton, Skeleton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { ArrowLeft } from '@phosphor-icons/react';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';

import useEmpregados from '@/hooks/use-empregados';
import { Chart } from '@/components/core/chart';

import Selector from '../Selector';

export interface SalesProps {
  sx?: SxProps;
  chartSeries: { name: string; data: number[] }[];
  labels: string[];
  loading: boolean;
  getLimpezasPerSuitByEmpregado: (empregadoId: number | string, year: number, month: number) => Promise<void>;
  getTimePerSuitByEmpregado: (empregadoId: number | string, year: number, month: number) => Promise<void>;
  empregadoId: number | string;
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
  getTimePerSuitByEmpregado,
}: SalesProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels, chartSeries);

  const { empregados, error, loading: loadingEmpregados } = useEmpregados('limpeza');

  const [empregado, setEmpregado] = React.useState<string | number>(empregadoId);
  const [actualLoading, setActualLoading] = React.useState(false);

  const actualYear: number = dayjs().year();
  const actualMonth: number = dayjs().month();
  const [month, setMonth] = React.useState<number>(actualMonth);
  const [year, setYear] = React.useState<number>(dayjs().year());

  function changeEmpregado(value: string | number): void {
    setEmpregado(value);
  }

  async function getInfo(): Promise<void> {
    setActualLoading(true);
    await getLimpezasPerSuitByEmpregado(Number(empregado), year, month);
    await getTimePerSuitByEmpregado(Number(empregado), year, month);
    setActualLoading(false);
  }

  React.useEffect(() => {
    if (empregado !== undefined && empregado !== '') {
      void getInfo();
    }
  }, [empregado, year, month]);

  React.useEffect(() => {
    if (empregadoId !== undefined && empregadoId !== null) {
      setEmpregado(empregadoId);
    }
  }, [empregadoId]);

  return (
    <Card sx={sx}>
      <CardHeader title="Estadísticas de limpezas por suítes" />
      <CardContent>
        {loading || actualLoading ? (
          <Skeleton variant="rectangular" width="100%" height={350} sx={{ bgcolor: 'grey.100' }} />
        ) : (
          <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ alignItems: 'center', px: 2, flexDirection: 'column', gap: 2 }}>
        <Selector
          error={error}
          items={empregados}
          loading={loadingEmpregados}
          label=""
          labelId="empregado"
          value={empregado}
          handleChange={changeEmpregado}
          noItemsText="Nenhum funcionário cadastrado"
          variant="standard"
        />
        <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            size="small"
            onClick={() => {
              if (month > 0) {
                setMonth(month - 1);
              } else {
                setMonth(11);
                setYear(year - 1);
              }
            }}
          >
            <ArrowLeft fontSize="var(--icon-fontSize-md)" />
          </IconButton>
          <Stack sx={{ alignItems: 'center' }}>
            <Typography>{year}</Typography>
            <Typography>{dayjs(new Date(year, month, 1)).format('MMMM')}</Typography>
          </Stack>
          <IconButton
            disabled={year > actualYear || (year === actualYear && month >= actualMonth)}
            color="inherit"
            size="small"
            onClick={() => {
              if (month === 11) {
                setMonth(0);
                setYear(year + 1);
              } else {
                setMonth(month + 1);
              }
            }}
          >
            <ArrowRightIcon fontSize="var(--icon-fontSize-md)" />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}

function useChartOptions(categories: string[], series?: { name: string; data: number[] }[]): ApexOptions {
  const theme = useTheme();

  // Verificar si hay dos series
  const hasTwoSeries = series && series.length === 2;

  // Función para calcular el máximo del eje Y con margen adicional
  const calculateYaxisMax = (data: number[]) => {
    if (!data || data.length === 0) return undefined;

    const maxValue = Math.max(...data);
    return Math.ceil(maxValue * 1.2); // 20% de margen para dar espacio a las etiquetas
  };

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: { show: false },
      parentHeightOffset: 0,
      type: 'bar',
      animations: {
        enabled: true,
      },
      zoom: { enabled: false },
      selection: { enabled: false },
      // Agregar espacio en la parte superior para las etiquetas
      height: '100%',
      sparkline: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main, '#FEB019'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: [theme.palette.primary.main, '#FEB019'],
      },
      // Reducir el offsetY para posicionar mejor las etiquetas
      offsetY: -20,
      formatter(val: number, opts: { seriesIndex: number }) {
        // Formatear según la serie
        const seriesIndex = opts.seriesIndex;
        if (hasTwoSeries && seriesIndex === 1) {
          return val.toFixed(0);
        }
        return val.toString();
      },
      // Asegurar que las etiquetas no se corten
      textAnchor: 'middle',
      distributed: false,
    },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: {
        top: 0, // Asegurar que no hay padding en la parte superior
        bottom: 0, // Eliminar el margen inferior
        left: 10,
        right: 10,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
    },
    plotOptions: {
      bar: {
        columnWidth: hasTwoSeries ? '60%' : '70%', // Ajustar ancho para mejor visualización
        // Forma plana al final (property removed as it is not valid)
        borderRadius: 0, // Sin bordes redondeados
        dataLabels: {
          position: 'top', // Posición de etiquetas
          hideOverflowingLabels: false, // Mostrar todas las etiquetas
        },
        // Ajustar el valor inicial para eliminar el margen inferior
        barHeight: '100%',
      },
    },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories,
      labels: {
        offsetY: 5,
        style: { colors: theme.palette.text.secondary },
        rotate: categories.length > 5 ? -45 : 0,
        rotateAlways: categories.length > 5,
      },
      position: 'bottom',
      tickPlacement: 'on', // Colocar ticks en las posiciones exactas
    },
    yaxis: hasTwoSeries
      ? [
          {
            // Eje Y principal (izquierda) - Número de limpezas

            labels: {
              style: { colors: theme.palette.text.secondary },
              formatter: (value) => Math.round(value).toString(),
            },
            max: series && calculateYaxisMax(series[0].data),
            forceNiceScale: true,
            axisBorder: { show: true, color: theme.palette.primary.main },
            axisTicks: { show: true },
            tickAmount: 5,
            // Evitar valores negativos en el eje Y
            min: 0,
            // Asegurar que el valor 0 se muestre en el eje
            showForNullSeries: true,
          },
          {
            // Eje Y secundario (derecha) - Tiempo promedio

            opposite: true,
            labels: {
              style: { colors: theme.palette.text.secondary },
              formatter: (value) => Math.round(value).toString(),
            },
            max: series && calculateYaxisMax(series[1].data),
            forceNiceScale: true,
            axisBorder: { show: true, color: theme.palette.secondary.main },
            axisTicks: { show: true },
            tickAmount: 5,
            min: 0,
            showForNullSeries: true,
          },
        ]
      : {
          // Configuración original para una sola serie
          labels: {
            offsetX: -10,
            style: { colors: theme.palette.text.secondary },
          },
          max: series?.[0] && calculateYaxisMax(series[0].data),
          forceNiceScale: true,
          axisBorder: { show: false },
          axisTicks: { show: true },
          floating: false,
          tickAmount: 5,
          min: 0,
        },
  };
}
