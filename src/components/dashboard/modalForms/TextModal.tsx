import React from 'react';
import { Modal } from '@mui/material';
import { Box, Stack } from '@mui/system';

import ModalButton from '../ModalButton';

interface PropsMessage {
  text: string;
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

function TextModal({ text, handleClose, open }: PropsMessage) {
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
        <>
          <h2 id="child-modal-title" style={{ textAlign: 'center', marginTop: 0 }}>
            Mensagem sobre limpeza
          </h2>
          <Stack
            gap={6}
            sx={{
              width: '80%',
            }}
            mx="auto"
          >
            <Stack>
              <h3 style={{ marginBottom: 0 }}>{text}</h3>
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
      </Box>
    </Modal>
  );
}

export default TextModal;
