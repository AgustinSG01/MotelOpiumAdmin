'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';

// import { AuthGuard } from '@/components/auth/auth-guard';
import { MainNav } from '@/components/dashboard/layout/main-nav';
import { SideNav } from '@/components/dashboard/layout/side-nav';

import axios from '../../axios-config';
import useStore from '../../store/store';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const { setNotifications } = useStore();

  async function getNotificationsQuantity(): Promise<void> {
    try {
      const res = await axios.get<Notification[]>('/notification/unseen');
      const notifications: number = res.data.length;
      setNotifications(notifications);
    } catch (error) {
      setNotifications(0);
    }
  }

  React.useEffect(() => {
    void getNotificationsQuantity();
    const interval = setInterval(() => {
      void getNotificationsQuantity();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    // <AuthGuard>
    <>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <SideNav />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: '64px' }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </>
    // </AuthGuard>
  );
}
