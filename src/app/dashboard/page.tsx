'use client';

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { type Employee } from '@/types/types';
import { ControlsMonth } from '@/components/dashboard/overview/controls-month';
import { LatestMovements, type Movement } from '@/components/dashboard/overview/latest-movements';
import { LatestNotifications, Notification } from '@/components/dashboard/overview/latest-products';
import { Limpezas } from '@/components/dashboard/overview/limpezas-month';
import { CleansPerSuits, type Result } from '@/components/dashboard/overview/quantity-cleans-suits';
import { PromedyControls } from '@/components/dashboard/overview/sales';
import { EmployeeMonth } from '@/components/dashboard/overview/total-profit';

import axios from '../../axios-config';
import useStatics from '../../store/statics';

// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const {
    isLoading,
    movements,
    controlsMonth,
    employeeMonth,
    limpezasMonth,
    setControlsMonth,
    setEmployeeMonth,
    setLimpezasMonth,
    setLoading,
    setMovements,
    cleansPerSuit,
    setCleansPerSuit,
    promedyControls,
    setPromedyControls,
    notifications,
    setNotifications,
  } = useStatics();

  const fetchers: {
    url: string;
    setter: (data: unknown) => void;
    parser?: (data: unknown) => unknown;
  }[] = [
    {
      url: '/statics/total-limpezas-actual-month',
      setter: (data) => {
        setLimpezasMonth(data as number);
      },
    },
    {
      url: '/statics/total-controls-actual-month',
      setter: (data) => {
        setControlsMonth(data as number);
      },
    },
    {
      url: '/statics/empregado-more-limpezas-actual-month',
      setter: (data) => {
        setEmployeeMonth(data as Employee);
      },
    },
    {
      url: '/movements',
      setter: (data) => {
        setMovements(data as Movement[]);
      },
    },
    {
      url: '/statics/limpezas-per-suit-month',
      setter: (data) => {
        setCleansPerSuit(data as { results: Result[]; year: string });
      },
    },
    {
      url: '/statics/controls-promedy-per-year',
      setter: (data) => {
        setPromedyControls(
          data as {
            data: number[];
            year: string;
          }
        );
      },
    },
    {
      url: '/notification/all-month',
      setter: (data) => {
        setNotifications(data as Notification[]);
      },
    },
  ];

  async function getStatics(): Promise<void> {
    setLoading(true);

    try {
      await Promise.all(
        fetchers.map(async ({ url, setter }) => {
          const response = await axios.get(url);
          setter(response.data);
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function refresh(): Promise<void> {
    await getStatics();
  }

  async function getCleansPerSuit(year: number, month: number): Promise<void> {
    try {
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
      setCleansPerSuit({ results: responseData.results, year: responseData.year });
    } catch (_error) {
      return;
    }
  }

  async function getPromedyControls(year: number): Promise<void> {
    try {
      const response = await axios.get('/statics/controls-promedy-per-year', {
        params: {
          selectedYear: year,
        },
      });
      const responseData = response.data as {
        data: number[];
        year: string;
      };
      setPromedyControls({ data: responseData.data, year: responseData.year });
    } catch (_error) {
      return;
    }
  }

  async function getNotifications(): Promise<void> {
    try {
      const response = await axios.get('/notification/all-month');
      const responseData = response.data as Notification[];
      setNotifications(responseData);
    } catch (_error) {
      return;
    }
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      void refresh();
    }, 300000);
    void getStatics();
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Limpezas sx={{ height: '100%' }} value={limpezasMonth} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <ControlsMonth sx={{ height: '100%' }} value={controlsMonth} />
      </Grid>
      <Grid lg={6} sm={12} xs={24}>
        <EmployeeMonth
          sx={{ height: '100%' }}
          value={employeeMonth?.nome ? employeeMonth.nome : 'Não houve nenhuma limpeza'}
        />
      </Grid>
      <Grid lg={8} xs={12}>
        <CleansPerSuits
          sx={{ height: '100%' }}
          chartSeries={cleansPerSuit.chartSeries}
          labels={cleansPerSuit.labels}
          initialLoading={isLoading}
          manualGet={getCleansPerSuit}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        {/*
        <Traffic sx={{ height: '100%' }} />
       */}
        <LatestNotifications
          sx={{ height: '100%' }}
          initialLoading={isLoading}
          notifications={notifications}
          refresh={getNotifications}
        />
      </Grid>
      <Grid lg={6} xs={10}>
        <PromedyControls
          sx={{ height: '100%' }}
          chartSeries={promedyControls}
          initialLoading={isLoading}
          manualGet={getPromedyControls}
        />
      </Grid>
      <Grid lg={6} md={8} xs={14}>
        <LatestMovements movements={movements} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
