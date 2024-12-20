import React from 'react';
import { Box, Modal } from '@mui/material';
import { Stack } from '@mui/system';

import { type Controle } from '@/types/types';

import ModalButton from '../ModalButton';
import ScoreInfo from './score-info';

interface ControlInfoProps {
  handleClose: () => void;
  open: boolean;
  controle: Controle | undefined;
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
  px: 4,
  py: 2,
};

function ControlInfo({ handleClose, open, controle }: ControlInfoProps): React.JSX.Element {
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
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <h2 id="child-modal-title" style={{ textAlign: 'center' }}>
          Informações sobre o controle realizado
        </h2>
        <Stack
          gap={5}
          sx={{
            width: {
              md: '50%',

              xs: '90%',
            },
          }}
          mx="auto"
        >
          <Stack gap={5}>
            {controle?.aspectos?.map((aspect) => (
              <ScoreInfo
                score={aspect.score}
                name={aspect.controleType}
                comment={aspect.comment ? aspect.comment : ''}
                key={aspect.id}
              />
            ))}
          </Stack>
          <Stack direction="row" justifyContent="center">
            <ModalButton
              handleClick={() => {
                handleClose();
              }}
              text="Fechar"
            />
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ControlInfo;
