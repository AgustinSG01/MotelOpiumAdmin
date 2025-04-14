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

// import dayjs from 'dayjs';

import { type Employee, type Limpeza } from '@/types/types';

import axios from '../../../axios-config';
import ModalMessageById from '../modalForms/ModalMessageById';

export interface Message {
  id: number;
  message: string;
  data: Date;
  seen: boolean;
  directivo: Employee;
  limpeza: Limpeza;
}

export interface MessageProps {
  sx?: SxProps;
  messages: Message[];
  initialLoading: boolean;
  refresh: () => Promise<void>;
}

export function LatestMessages({ sx, messages, initialLoading, refresh }: MessageProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0); // Current page index
  const [rowsPerPage, _setRowsPerPage] = useState(5); // Number of rows per page
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const display = useMemo(() => {
    return messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [messages, page, rowsPerPage]);

  useEffect(() => {
    if (messages.length && page * rowsPerPage >= messages.length) {
      setPage(0);
    }
  }, [messages, rowsPerPage]);

  function none(): void {
    // No operation function
  }
  async function fetchMessages(): Promise<void> {
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
        await axios.put(`/comments/unseeMessage/${id}`);
      } else {
        await axios.put(`/comments/seeMessage/${id}`);
      }
      // Fetch notifications again to update the state
      void fetchMessages();
    } catch (error) {
      // Handle error if needed
    }
  }

  return (
    <>
      {selectedMessage ? (
        <ModalMessageById
          handleClose={() => {
            setShowModal(false);
            setSelectedMessage(null);
          }}
          open={showModal}
          messageId={selectedMessage}
        />
      ) : null}
      <Card sx={sx}>
        <CardHeader title="Mensagens" />
        <Divider />
        <List sx={{ minHeight: 395 }}>
          {loading || initialLoading ? (
            <Skeleton variant="rectangular" width="100%" height={395} />
          ) : (
            display.map((message, index) => (
              <ListItem
                divider={false}
                key={message.id}
                sx={{
                  borderLeft: message.seen ? '4px solid #33ff89' : '4px solid #ff3333',

                  borderTop: '1px solid #e0e0e0',
                  borderBottom: index === display.length - 1 ? '1px solid #e0e0e0' : 'none',
                }}
              >
                <ListItemText
                  primary={message.message}
                  primaryTypographyProps={{
                    variant: 'subtitle1',
                    sx: {
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    },
                  }}
                  secondary={`Suíte ${message.limpeza?.suit?.nome}`}
                  secondaryTypographyProps={{ variant: 'body2' }}
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSelectedMessage(message.id);
                    setShowModal(true);
                  }}
                />
                <IconButton edge="end" onClick={() => markAsSeenOrUnsee(message.id, message.seen)}>
                  {message.seen ? <Eye weight="bold" /> : <EyeSlash weight="bold" />}
                </IconButton>
              </ListItem>
            ))
          )}
        </List>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <TablePagination
            component="div"
            count={messages.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={none}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </CardActions>
      </Card>
    </>
  );
}
