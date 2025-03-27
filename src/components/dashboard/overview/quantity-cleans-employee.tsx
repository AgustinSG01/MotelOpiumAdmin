'use client';

import * as React from 'react';
import { IconButton, Skeleton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';

import { Chart } from '@/components/core/chart';

import axios from '../../../axios-config';

export interface SalesProps {
  sx?: SxProps;
}
interface Result {
  suit: string;
  limpezas: number;
}
export function CleansPerSuits({ sx }: SalesProps): React.JSX.Element {
  const actualYear: number = dayjs().year();
  const actualMonth: number = dayjs().month();
  const [month, setMonth] = React.useState<number>(actualMonth);
  const [year, setYear] = React.useState<number>(dayjs().year());
  const [loading, setLoading] = React.useState<boolean>(false);

  const [chartSeries, setChartSeries] = React.useState<{ name: string; data: number[] }[]>([
    {
      name: actualYear.toString(),
      data: [],
    },
  ]);

  const [labels, setLabels] = React.useState<string[]>([]);

  const fetchYearCleans = React.useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get('/statics/limpezas-per-suit-month', {
        params: {
          selectedYear: year,
          selectedMonth: month,
        },
      });
      const responseData = response.data as {
        results: Result[];
        year: string;
      };
      setChartSeries([{ name: responseData.year, data: responseData.results.map((item) => item.limpezas) }]);
      setLabels(responseData.results.map((item) => item.suit));
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  React.useEffect(() => {
    void fetchYearCleans();
  }, [fetchYearCleans]);

  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Limpezas por mês" />
      <CardContent>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={350} sx={{ bgcolor: 'grey.100' }} />
        ) : (
          <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
        )}
      </CardContent>
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
