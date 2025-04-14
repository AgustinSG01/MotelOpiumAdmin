import React from 'react';
import { Modal, Skeleton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import dayjs from 'dayjs';

import axios from '../../../axios-config';
import ModalButton from '../ModalButton';
import { type Message } from '../overview/latest-messages';

interface PropsMessage {
  messageId: number;
  handleClose: () => void;
  open: boolean;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ModalMessageById({ messageId, handleClose, open }: PropsMessage) {
  const [info, setInfo] = React.useState({} as Message);
  const [loading, setLoading] = React.useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(`/comments/oneMessage/${messageId}`);
      const data: Message = response.data as Message;
      setInfo(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return undefined;
    }
  }

  React.useEffect(() => {
    void fetchData();
  }, [messageId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: {
            md: 800,
            sm: 500,
            xs: '90vw',
          },
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" height="90vh" />
        ) : (
          <>
            <h2 id="child-modal-title" style={{ textAlign: 'center', marginTop: 0 }}>
              Informações sobre a última limpeza no suíte {info?.limpeza?.suit?.nome}
            </h2>
            <Stack
              gap={6}
              sx={{
                width: '80%',
              }}
              mx="auto"
            >
              <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%', textAlign: 'center' }}>
                <Stack>
                  <h2 style={{ marginBottom: 0 }}>Funcionario início</h2>
                  <h3 style={{ marginBottom: 0, fontWeight: 'normal' }}>{info.limpeza?.empregado?.nome || '-'}</h3>
                </Stack>
                <Stack>
                  <h2 style={{ marginBottom: 0 }}>Funcionario fim</h2>
                  <h3 style={{ marginBottom: 0, fontWeight: 'normal' }}>
                    {info.limpeza?.endedBy?.nome || info.limpeza?.empregado?.nome || '-'}
                  </h3>
                </Stack>
              </Stack>
              <Stack sx={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ marginBottom: 0, marginTop: 0 }}>Gerente</h2>
                <h3 style={{ marginBottom: 0, fontWeight: 'normal' }}>{info.limpeza?.gerente?.nome || '-'}</h3>
              </Stack>
              <Stack sx={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ marginBottom: 0, marginTop: 0 }}>Dia de limpeza</h2>
                <h3 style={{ marginBottom: 0, fontWeight: 'normal' }}>
                  {dayjs(info.limpeza?.data).format('DD/MM/YYYY')}
                </h3>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%', textAlign: 'center' }}>
                <Stack>
                  <h2 style={{ marginBottom: 0, marginTop: 0 }}>Horário de início</h2>
                  <h3 style={{ marginBottom: 0, fontWeight: 'normal' }}>
                    {dayjs(info.limpeza?.comeco).format('HH:mm')}
                  </h3>
                </Stack>
                <Stack>
                  <h2 style={{ marginBottom: 0, marginTop: 0 }}>Horário de fim</h2>
                  <h3 style={{ marginBottom: 0, fontWeight: 'normal' }}>
                    {dayjs(info.limpeza?.fim).format('HH:mm') || '-'}
                  </h3>
                </Stack>
              </Stack>
              <Stack sx={{ width: '100%', textAlign: 'start', alignItems: 'center' }}>
                <h2 style={{ marginBottom: 0, marginTop: 0 }}>Mensagem do {info.directivo?.nome}</h2>
                <h3 style={{ marginBottom: 0, fontWeight: 'normal', wordBreak: 'break-word' }}>{info.message}</h3>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <ModalButton
                  handleClick={() => {
                    handleClose();
                  }}
                  text="Fichar"
                />
              </Stack>
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default ModalMessageById;
