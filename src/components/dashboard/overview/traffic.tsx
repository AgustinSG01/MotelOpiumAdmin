'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Desktop as DesktopIcon } from '@phosphor-icons/react/dist/ssr/Desktop';
import { DeviceTablet as DeviceTabletIcon } from '@phosphor-icons/react/dist/ssr/DeviceTablet';
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import type { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';

import { Chart } from '@/components/core/chart';

import axios from '../../../axios-config';

const iconMapping = { Desktop: DesktopIcon, Tablet: DeviceTabletIcon, Phone: PhoneIcon } as Record<string, Icon>;

export interface TrafficProps {
  sx?: SxProps;
}
interface Result {
  suit: string;
  limpezas: number;
}
export function Traffic({ sx }: TrafficProps): React.JSX.Element {
  const actualYear: number = dayjs().year();
  const actualMonth: number = dayjs().month();

  const [year, _setYear] = React.useState<number>(actualYear);
  const [month, _setMonth] = React.useState<number>(actualMonth);

  const [_loading, setLoading] = React.useState<boolean>(false);
  const [labels, setLabels] = React.useState<string[]>([]);
  const [chartSeries, setChartSeries] = React.useState<number[]>([]);

  const chartOptions = useChartOptions(labels);

  const fetchMonthCleans = React.useCallback(async (): Promise<void> => {
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
      setChartSeries(responseData.results.map((item) => item.limpezas));
      setLabels(responseData.results.map((item) => item.suit));
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  React.useEffect(() => {
    void fetchMonthCleans();
  }, [fetchMonthCleans]);

  return (
    <Card sx={sx}>
      <CardHeader title="Traffic source" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const Icon = iconMapping[label];

              return (
                <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                  {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null}
                  <Typography variant="h6">{label}</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {item}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
