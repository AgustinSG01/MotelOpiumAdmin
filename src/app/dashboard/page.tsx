import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { type Employee } from '@/types/types';
import { config } from '@/config';
import { ControlsMonth } from '@/components/dashboard/overview/controls-month';
import { LatestMovements, type Movement } from '@/components/dashboard/overview/latest-movements';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Limpezas } from '@/components/dashboard/overview/limpezas-month';
import { CleansPerSuits } from '@/components/dashboard/overview/quantity-cleans-employee';
import { PromedyControls } from '@/components/dashboard/overview/sales';
import { EmployeeMonth } from '@/components/dashboard/overview/total-profit';

import axios from '../../axios-config';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default async function Page(): Promise<React.JSX.Element> {
  const responseLimpezas = await axios.get('/statics/total-limpezas-actual-month');
  const limpezasMonth: number = responseLimpezas?.data as number;

  const responseControls = await axios.get('/statics/total-controls-actual-month');
  const controlsMonth: number = responseControls?.data as number;

  const responseEmployee = await axios.get('/statics/empregado-more-limpezas-actual-month');
  const employeeMonth: Employee = responseEmployee?.data as Employee;

  const responseMovements = await axios.get('/movements');
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
        <LatestProducts
          products={[
            {
              id: 'PRD-005',
              name: 'Soja & Co. Eucalyptus',
              image: '/assets/product-5.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'Necessaire Body Lotion',
              image: '/assets/product-4.png',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Ritual of Sakura',
              image: '/assets/product-3.png',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Lancome Rouge',
              image: '/assets/product-2.png',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Erbology Aloe Vera',
              image: '/assets/product-1.png',
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={6} xs={10}>
        <PromedyControls sx={{ height: '100%' }} />

        {/* <LatestProducts
          products={[
            {
              id: 'PRD-005',
              name: 'Soja & Co. Eucalyptus',
              image: '/assets/product-5.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'Necessaire Body Lotion',
              image: '/assets/product-4.png',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Ritual of Sakura',
              image: '/assets/product-3.png',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Lancome Rouge',
              image: '/assets/product-2.png',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Erbology Aloe Vera',
              image: '/assets/product-1.png',
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        /> */}
      </Grid>
      <Grid lg={6} md={8} xs={14}>
        <LatestMovements movements={latestMovements} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
