import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { type Employee } from '@/types/types';
import { config } from '@/config';
import { ControlsMonth } from '@/components/dashboard/overview/controls-month';
import { LatestMovements, type Movement } from '@/components/dashboard/overview/latest-movements';
import { LatestNotifications } from '@/components/dashboard/overview/latest-products';
import { Limpezas } from '@/components/dashboard/overview/limpezas-month';
import { CleansPerSuits } from '@/components/dashboard/overview/quantity-cleans-suits';
import { PromedyControls } from '@/components/dashboard/overview/sales';
import { EmployeeMonth } from '@/components/dashboard/overview/total-profit';

import axios from '../../axios-config';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default async function Page(): Promise<React.JSX.Element> {
  const responseLimpezas = await axios.get('/statics/total-limpezas-actual-month', {
    // query URL without using browser cache
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
  const limpezasMonth: number = responseLimpezas?.data as number;

  const responseControls = await axios.get('/statics/total-controls-actual-month', {
    // query URL without using browser cache
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
  const controlsMonth: number = responseControls?.data as number;

  const responseEmployee = await axios.get('/statics/empregado-more-limpezas-actual-month', {
    // query URL without using browser cache
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
  const employeeMonth: Employee = responseEmployee?.data as Employee;

  const responseMovements = await axios.get('/movements', {
    // query URL without using browser cache
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
  const latestMovements = responseMovements?.data as Movement[];

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
        <CleansPerSuits sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        {/*
        <Traffic sx={{ height: '100%' }} />
       */}
        <LatestNotifications sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={6} xs={10}>
        <PromedyControls sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={6} md={8} xs={14}>
        <LatestMovements movements={latestMovements} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
