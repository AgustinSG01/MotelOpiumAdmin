'use client';

import * as React from 'react';
import { colors, types, typesNames } from '@/utils/suits-types';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';

import { Chart } from '@/components/core/chart';

export interface SalesProps {
  sx?: SxProps;
  chartSeries: { name: string; data: number[] }[];
  labels: string[];
  initialLoading: boolean;
  manualGet: (year: number, month: number) => Promise<void>;
}
export interface Result {
  suit: string;
  limpezas: number;
}
export function CleansPerSuits({ sx, chartSeries, labels, initialLoading, manualGet }: SalesProps): React.JSX.Element {
  const actualYear: number = dayjs().year();
  const actualMonth: number = dayjs().month();
  const [month, setMonth] = React.useState<number>(actualMonth);
  const [year, setYear] = React.useState<number>(dayjs().year());
  const [loading, setLoading] = React.useState<boolean>(false);
  const [chartWidth, setChartWidth] = React.useState<number | string>('100%');
  const chartContainerRef = React.useRef<HTMLDivElement>(null);

  // Actualiza el ancho del gráfico basado en el número de elementos y el ancho de pantalla
  React.useEffect(() => {
    const updateChartWidth = () => {
      if (!chartContainerRef.current) return;

      const containerWidth = chartContainerRef.current.offsetWidth;
      // Aseguramos un ancho mínimo por barra (30px) más espacio entre barras
      const minWidthPerBar = 50; // 30px de barra + espacio
      const requiredWidth = labels.length * minWidthPerBar;

      // Si se requiere más espacio que el disponible, establecemos un ancho mínimo
      if (requiredWidth > containerWidth) {
        setChartWidth(requiredWidth);
      } else {
        setChartWidth('100%');
      }
    };

    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);

    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, [labels]);

  async function getCleansPerSuit(): Promise<void> {
    try {
      setLoading(true);
      await manualGet(year, month);
      setLoading(false);
    } catch (_error) {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void getCleansPerSuit();
  }, [year, month]);

  // Generamos los colores para cada barra basados en los labels (nombres de suites)
  const getColorsForBars = (): string[] => {
    return labels.map((label: string): string => {
      const suiteNumber = label.split(' ')[0] as keyof typeof types;
      const suiteType = types[suiteNumber] || 'luxo'; // Valor predeterminado si no se encuentra
      // Type guard to ensure suiteType is a valid key of colors
      if (suiteType in colors) {
        return colors[suiteType as keyof typeof colors];
      }
      return '#FFB800'; // Color predeterminado si el tipo no tiene color definido
    });
  };

  const chartOptions = useChartOptions(labels, getColorsForBars());

  return (
    <Card sx={sx}>
      <CardHeader title="Limpezas do mês" />
      <CardContent>
        <Box
          ref={chartContainerRef}
          sx={{
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: '8px',
              marginTop: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: (theme) => theme.palette.background.paper,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: (theme) => theme.palette.divider,
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
          }}
        >
          <Box sx={{ width: chartWidth }}>
            {loading || initialLoading ? (
              <Skeleton variant="rectangular" width="100%" height={350} sx={{ bgcolor: 'grey.100' }} />
            ) : (
              <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
            )}
          </Box>
        </Box>
      </CardContent>

      {/* Leyenda de tipos de suite */}
      <Box
        sx={{
          px: 2,
          py: 1,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: (theme) => theme.palette.background.paper,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: (theme) => theme.palette.divider,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            minWidth: (_theme) => typesNames.length * 85, // Asegurar que haya suficiente espacio
            width: '100%',
          }}
          justifyContent="space-between"
        >
          {typesNames.map((type: string, index: number) => (
            <Stack direction="row" spacing={1} key={index} alignItems="center" flexShrink={0}>
              <div
                style={{
                  backgroundColor: colors[type as keyof typeof colors],
                  width: '20px',
                  height: '20px',
                  borderRadius: '2px',
                }}
              />
              <Typography key={index} variant="body2" noWrap sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                {type.toUpperCase()}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
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
      </CardActions>
    </Card>
  );
}

function useChartOptions(categories: string[], customColors: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: { show: false },
      parentHeightOffset: 0, // Evita problemas de altura
    },
    colors: customColors, // Usamos los colores personalizados
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: {
      bar: {
        columnWidth: '30px',
        distributed: true,
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
        formatter (value) {
          // Hace que las etiquetas sean más cortas para mejor visualización
          const parts = String(value).split(' ');
          if (parts.length > 0) {
            // Retorna solo el número de suite
            return parts[0];
          }
          return value;
        },
        rotateAlways: false,
        hideOverlappingLabels: false,
      },
    },
    yaxis: {
      labels: {
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '25px',
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
              rotateAlways: true,
              offsetY: 0,
            },
          },
        },
      },
    ],
  };
}
