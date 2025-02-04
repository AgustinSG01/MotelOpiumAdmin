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

export function Sales({ sx }: SalesProps): React.JSX.Element {
  const actualYear: number = dayjs().year();
  const [year, setYear] = React.useState<number>(dayjs().year());
  const [month, setMonth] = React.useState<number>(dayjs().month());
  const [loading, setLoading] = React.useState<boolean>(false);
  const [suits, setSuits] = React.useState<string[]>([]);

  const [chartSeries, setChartSeries] = React.useState<{ name: string; data: number[] }[]>([
    {
      name: actualYear.toString(),
      data: [],
    },
  ]);

  const fetchYearCleans = React.useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get('/statics/suits-promedy-per-month', {
        params: {
          selectedYear: year,
          selectedMonth: month,
        },
      });
      const responseData = response.data as {
        promedyArray: number[];
        suitsArray: string[];
        year: number;
        month: number[];
      };
      setSuits(responseData.suitsArray);
      setChartSeries([{ name: responseData.month.toString(), data: responseData.promedyArray }]);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  React.useEffect(() => {
    void fetchYearCleans();
  }, [fetchYearCleans]);

  const chartOptions = useChartOptions(suits);

  return (
    <Card sx={sx}>
      <CardHeader title="Número médio de controles de suits" />
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
            if (month === 0) {
              setMonth(11);
              setYear(year - 1);
            } else if (month > 0) {
              setMonth(month - 1);
            }
          }}
        >
          <ArrowLeft fontSize="var(--icon-fontSize-md)" />
        </IconButton>
        <Stack sx={{ alignItems: 'center' }}>
          <Typography>{year}</Typography>
          <Typography sx={{ textTransform: 'capitalize' }}>
            {dayjs(`${year}-${month + 1}-01`).format('MMMM')}
          </Typography>
        </Stack>
        <IconButton
          disabled={year >= actualYear && month >= dayjs().month()}
          color="inherit"
          size="small"
          onClick={() => {
            if (month === 11 && year < actualYear) {
              setMonth(0);
              setYear(year + 1);
            } else if (month < 11) {
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
