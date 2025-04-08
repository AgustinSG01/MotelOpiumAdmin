import React from 'react';
import { Box, Modal } from '@mui/material';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';

import { type SuitInfo } from '@/types/types';

import ModalButton from '../ModalButton';

interface NewEmployeeProps {
  handleClose: () => void;
  open: boolean;
  suit: SuitInfo;
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

function LimpezaInfo({ handleClose, open, suit }: NewEmployeeProps): React.JSX.Element {
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
        <h2 id="child-modal-title" style={{ textAlign: 'center', marginTop: 0 }}>
          Informações sobre a última limpeza no suíte {suit.nome}
        </h2>
        <Stack
          gap={5}
          sx={{
            width: '80%',
          }}
          mx="auto"
        >
          <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%', textAlign: 'center' }}>
            <Stack>
              <h2 style={{ marginBottom: 0 }}>Funcionario início</h2>
              <h3 style={{ marginBottom: 0 }}>{suit.lastClean?.empregado?.nome || '-'}</h3>
            </Stack>
            <Stack>
              <h2 style={{ marginBottom: 0 }}>Funcionario fim</h2>
              <h3 style={{ marginBottom: 0 }}>
                {suit.lastClean?.endedBy?.nome || suit.lastClean?.empregado?.nome || '-'}
              </h3>
            </Stack>
          </Stack>
          <Stack sx={{ width: '100%', textAlign: 'center' }}>
            <h2 style={{ marginBottom: 0, marginTop: 0 }}>Gerente</h2>
            <h3 style={{ marginBottom: 0 }}>{suit.lastClean?.gerente?.nome || '-'}</h3>
          </Stack>
          <Stack sx={{ width: '100%', textAlign: 'center' }}>
            <h2 style={{ marginBottom: 0, marginTop: 0 }}>Dia de limpeza</h2>
            <h3 style={{ marginBottom: 0 }}>{dayjs(suit.lastClean?.data).format('DD/MM/YYYY')}</h3>
          </Stack>
          <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%', textAlign: 'center' }}>
            <Stack>
              <h2 style={{ marginBottom: 0, marginTop: 0 }}>Hora de início</h2>
              <h3 style={{ marginBottom: 0 }}>{dayjs(suit.lastClean?.comeco).format('HH:mm')}</h3>
            </Stack>
            <Stack>
              <h2 style={{ marginBottom: 0, marginTop: 0 }}>Hora de fim</h2>
              <h3 style={{ marginBottom: 0 }}>{dayjs(suit.lastClean?.fim).format('HH:mm') || '-'}</h3>
            </Stack>
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
      </Box>
    </Modal>
  );
}

export default LimpezaInfo;
