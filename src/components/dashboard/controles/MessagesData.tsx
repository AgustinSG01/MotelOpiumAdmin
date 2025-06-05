import React from 'react';
import { type Message } from '@/app/dashboard/relatorio/page';
import { Button, TableCell, TableRow } from '@mui/material';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';

import TextModal from '../modalForms/TextModal';

interface MessagesDataProps {
  row: Message;
}

function MessagesData({ row }: MessagesDataProps): React.JSX.Element {
  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <>
      <TextModal
        text={row.message}
        open={showMessage}
        handleClose={() => {
          setShowMessage(false);
        }}
      />
      <TableRow hover key={row.id}>
        <TableCell>{dayjs(row.data).format('DD/MM/YYYY')}</TableCell>
        <TableCell>{dayjs(row.data).format('HH:mm')}</TableCell>
        <TableCell>{row.limpeza.suit.nome}</TableCell>
        <TableCell>{row.directivo.nome}</TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            color="info"
            size="small"
            disabled={!row.message}
            onClick={() => {
              setShowMessage(true);
            }}
          >
            <Eye color="white" size={20} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
export default MessagesData;
