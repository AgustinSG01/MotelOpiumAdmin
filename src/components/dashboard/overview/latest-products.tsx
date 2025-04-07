'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Skeleton, TablePagination } from '@mui/material';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import axios from '../../../axios-config';

export interface Notification {
  id: number;
  suit: string;
  promedio: number;
  lowerAspect: string;
  lowerScore: number;
  data: Date;
  seen: boolean;
}

export interface NotificationsProps {
  sx?: SxProps;
  notifications: Notification[];
  initialLoading: boolean;
  refresh: () => Promise<void>;
}

export function LatestNotifications({
  sx,
  notifications,
  initialLoading,
  refresh,
}: NotificationsProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0); // Current page index
  const [rowsPerPage, _setRowsPerPage] = useState(5); // Number of rows per page

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const display = useMemo(() => {
    return notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [notifications, page, rowsPerPage]);

  useEffect(() => {
    if (notifications.length && page * rowsPerPage >= notifications.length) {
      setPage(0);
    }
  }, [notifications, rowsPerPage]);

  function none(): void {
    // No operation function
  }
  async function fetchNotifications(): Promise<void> {
    setLoading(true);
    try {
      await refresh();
      setLoading(false);
    } catch (_error) {
      setLoading(false);
    }
  }

  async function markAsSeenOrUnsee(id: number, seen: boolean): Promise<void> {
    try {
      if (seen) {
        await axios.put(`/notification/unsee/${id}`);
      } else {
        await axios.put(`/notification/see/${id}`);
      }
      // Fetch notifications again to update the state
      void fetchNotifications();
    } catch (error) {
      // Handle error if needed
    }
  }

  return (
    <Card sx={sx}>
      <CardHeader title="Últimas notificações" />
      <Divider />
      <List sx={{ minHeight: 395 }}>
        {loading || initialLoading ? (
          <Skeleton variant="rectangular" width="100%" height={395} />
        ) : (
          display.map((notification, index) => (
            <ListItem
              divider={false}
              key={notification.id}
              sx={{
                // background: notification.seen
                //   ? '#f5f5f5'
                //   : 'linear-gradient(90deg, rgba(255,51,51,1) 0%, rgba(255,51,51,0) 1%)',
                borderLeft: notification.seen ? '4px solid #33ff89' : '4px solid #ff3333',

                borderTop: '1px solid #e0e0e0',
                borderBottom: index === display.length - 1 ? '1px solid #e0e0e0' : 'none',
              }}
            >
              <ListItemText
                primary={`Suíte ${notification.suit} - ${notification.lowerScore} em ${notification.lowerAspect}`}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={dayjs(notification.data).format('DD/MM/YYYY - HH:mm')}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end" onClick={() => markAsSeenOrUnsee(notification.id, notification.seen)}>
                {notification.seen ? <Eye weight="bold" /> : <EyeSlash weight="bold" />}
              </IconButton>
            </ListItem>
          ))
        )}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <TablePagination
          component="div"
          count={notifications.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={none}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </CardActions>
    </Card>
  );
}
