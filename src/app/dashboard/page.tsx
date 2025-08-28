'use client';

import React from 'react';
import { IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack } from '@mui/system';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import { Info } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';

import { type Employee } from '@/types/types';
import { CommentModal } from '@/components/dashboard/limpezas/score-info';
import ModalMessageAlert from '@/components/dashboard/ModalMessageAlert';
import { ControlsMonth } from '@/components/dashboard/overview/controls-month';
import { LatestMessages, type Message } from '@/components/dashboard/overview/latest-messages';
import { LatestMovements, type Movement } from '@/components/dashboard/overview/latest-movements';
import { LatestNotifications, type Notification } from '@/components/dashboard/overview/latest-products';
import { LimpezaPerSuitEmpregado } from '@/components/dashboard/overview/limpeza-per-suit-empregado';
import { Limpezas } from '@/components/dashboard/overview/limpezas-month';
import { CleansPerSuits, type Result } from '@/components/dashboard/overview/quantity-cleans-suits';
import { PromedyControls } from '@/components/dashboard/overview/sales';
import { TimePerSuit } from '@/components/dashboard/overview/time-per-suts';
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
    messages,
    setMessages,
    setTimePerSuit,
    timesPerSuit,
    cleansPerSuitByEmpregado,
    setCleansPerSuitByEmpregado,
    setTimePerSuitByEmpregado,
    timePerSuitByEmpregado,
  } = useStatics();

  const [time, setTime] = React.useState(dayjs());
  const [quantityMessages, setQuantityMessages] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [messageModal, setMessageModal] = React.useState(false);

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
    {
      url: '/comments/allMessages',
      setter: (data) => {
        setMessages(data as Message[]);
      },
    },
    {
      url: '/statics/time-promedy-limpeza-per-suit',
      setter: (data) => {
        setTimePerSuit(data as { labels: string[]; chartSeries: { data: number[]; name: string } });
      },
    },
    {
      url: '/statics/limpezas-per-suit-empregado/first',
      setter: (data) => {
        setCleansPerSuitByEmpregado(
          data as { labels: string[]; chartSeries: { data: number[]; name: string }; empregadoId: number }
        );
      },
    },
    {
      url: '/statics/time-promedy-limpeza-per-suit-by-empregado/first',
      setter: (data) => {
        setTimePerSuitByEmpregado(
          data as { labels: string[]; chartSeries: { data: number[]; name: string }; empregadoId: number }
        );
      },
    },
    {
      url: '/comments/quantityMessages',
      setter: (data) => {
        setQuantityMessages(data as number);
      },
    },
    {
      url: '/comments/lastmessageadmin',
      setter: (data: unknown) => {
        const typedData = data as { id?: number };
        if (typedData?.id) {
          setMessageModal(false);
        } else {
          setMessageModal(true);
        }
      },
    },
  ];

  async function getStatics(): Promise<void> {
    setLoading(true);
    setTime(dayjs());
    try {
      for (const { url, setter } of fetchers) {
        const response = await axios.get(url);
        setter(response.data);
      }
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

  async function getMessages(): Promise<void> {
    try {
      const response = await axios.get('/comments/allMessages');
      const responseData = response.data as Message[];
      setMessages(responseData);
    } catch (_error) {
      return;
    }
  }

  async function getLimpezasPerSuitByEmpregado(
    empregadoId: string | number,
    year: number,
    month: number
  ): Promise<void> {
    try {
      const response = await axios.get(`/statics/limpezas-per-suit-empregado/${empregadoId}`, {
        params: {
          selectedYear: year,
          selectedMonth: month,
        },
      });
      const responseData = response.data as {
        labels: string[];
        chartSeries: { data: number[]; name: string };
        empregadoId: number;
      };
      setCleansPerSuitByEmpregado(responseData);
    } catch (_error) {
      return;
    }
  }

  async function getTimePerSuitByEmpregado(empregadoId: string | number, year: number, month: number): Promise<void> {
    try {
      const response = await axios.get(`/statics/time-promedy-limpeza-per-suit-by-empregado/${empregadoId}`, {
        params: {
          selectedYear: year,
          selectedMonth: month,
        },
      });
      const responseData = response.data as {
        labels: string[];
        chartSeries: { data: number[]; name: string };
        empregadoId: number;
      };
      setTimePerSuitByEmpregado(responseData);
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

  async function submitMessage(data: {
    ropaBool: boolean;
    ropaMessage: string | null;
    utensilioBool: boolean;
    utensilioMessage: string | null;
    consumibleBool: boolean;
    consumibleMessage: string | null;
  }): Promise<void> {
    try {
      await axios.post('/comments/sendMessageAdmin', data);
      setMessageModal(false);
    } catch (error) {
      return;
    }
  }

  return (
    <Grid container spacing={3}>
      <ModalMessageAlert
        open={messageModal}
        handleClose={() => {
          setMessageModal(false);
        }}
        handleSubmit={submitMessage}
      />
      <CommentModal
        close={() => {
          setShowModal(false);
        }}
        comment={`Ontem, dia ${dayjs().subtract(1, 'day').format('DD/MM/YYYY')} teve ${quantityMessages} comentários`}
        show={showModal}
      />
      <Grid lg={12} sm={24} xs={48}>
        <Stack sx={{ width: '100%' }} direction="row" spacing={2} alignItems="center">
          <Typography variant="h5">Última atualização às {time.format('HH:mm')}</Typography>
          <IconButton onClick={() => void refresh()}>
            <ArrowCounterClockwise size={24} color="#635BFF" />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowModal(true);
            }}
            sx={{ marginLeft: 'auto' }}
          >
            <Info size={24} color={quantityMessages < 3 ? '#ff3333' : '#635BFF'} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Limpezas sx={{ height: '100%' }} value={limpezasMonth} loading={isLoading} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <ControlsMonth sx={{ height: '100%' }} value={controlsMonth} loading={isLoading} />
      </Grid>
      <Grid lg={6} sm={12} xs={24}>
        <EmployeeMonth
          sx={{ height: '100%' }}
          value={employeeMonth?.nome ? employeeMonth.nome : 'Não houve nenhuma limpeza'}
          loading={isLoading}
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
      <Grid lg={6} xs={12}>
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
      <Grid lg={8} xs={12}>
        <TimePerSuit
          sx={{ height: '100%' }}
          chartSeries={timesPerSuit.chartSeries}
          labels={timesPerSuit.labels}
          loading={isLoading}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <LatestMessages sx={{ height: '100%' }} initialLoading={isLoading} messages={messages} refresh={getMessages} />
      </Grid>
      <Grid lg={12} xs={12}>
        <LimpezaPerSuitEmpregado
          sx={{ height: '100%' }}
          chartSeries={[...cleansPerSuitByEmpregado.chartSeries, ...timePerSuitByEmpregado.chartSeries]}
          labels={cleansPerSuitByEmpregado.labels}
          loading={isLoading}
          empregadoId={cleansPerSuitByEmpregado.empregadoId}
          getLimpezasPerSuitByEmpregado={getLimpezasPerSuitByEmpregado}
          getTimePerSuitByEmpregado={getTimePerSuitByEmpregado}
        />
      </Grid>
    </Grid>
  );
}
