import React from 'react';
import { Alert, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { ThumbsDown } from '@phosphor-icons/react';
import { ThumbsUp } from '@phosphor-icons/react/dist/ssr';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 300,
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalMessageAlertProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (data: {
    ropaBool: boolean;
    ropaMessage: string | null;
    utensilioBool: boolean;
    utensilioMessage: string | null;
    consumibleBool: boolean;
    consumibleMessage: string | null;
  }) => void;
}

function ModalMessageAlert({ open, handleClose, handleSubmit }: ModalMessageAlertProps): React.JSX.Element {
  const [roupaBool, setRoupaBool] = React.useState<boolean | null>(null);
  const [roupaMessage, setRoupaMessage] = React.useState<string>('');
  const [utensilioBool, setUtensilioBool] = React.useState<boolean | null>(null);
  const [utensilioMessage, setUtensilioMessage] = React.useState<string>('');
  const [consumibleBool, setConsumibleBool] = React.useState<boolean | null>(null);
  const [consumibleMessage, setConsumibleMessage] = React.useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = React.useState<boolean>(false);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  function checkAllFields(): void {
    if (roupaBool === null || utensilioBool === null || consumibleBool === null) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      setShowConfirmModal(true);
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Modal
          open={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, zIndex: 1300, position: 'fixed', maxWidth: 300, minWidth: 200 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
              Tem certeza?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 4 }}>
              <Button
                variant="contained"
                onClick={() => {
                  if (roupaBool === null || utensilioBool === null || consumibleBool === null) {
                    setShowAlert(true);
                    return;
                  }

                  handleSubmit({
                    ropaBool: roupaBool,
                    consumibleBool,
                    utensilioBool,
                    ropaMessage: roupaMessage === '' ? null : roupaMessage,
                    consumibleMessage: consumibleMessage === '' ? null : consumibleMessage,
                    utensilioMessage: utensilioMessage === '' ? null : utensilioMessage,
                  });
                }}
              >
                Sim
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmModal(false);
                }}
                variant="outlined"
                color="secondary"
              >
                Não
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Box sx={style}>
          {showAlert ? (
            <Alert severity="warning" sx={{ position: 'fixed', top: 10, left: 10, right: 10 }}>
              Todos os controles devem ser avaliados com “sim” ou “não” antes de continuar.
            </Alert>
          ) : null}

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Formulário
          </Typography>
          <Stack sx={{ mt: 5 }} spacing={2}>
            <Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography id="modal-modal-description" sx={{ fontWeight: 'bold' }}>
                  Controle de roupa
                </Typography>
                <Stack direction="row">
                  <IconButton
                    onClick={() => {
                      setRoupaBool(false);
                    }}
                  >
                    <ThumbsDown size={24} color={roupaBool === null ? 'gray' : !roupaBool ? 'red' : 'gray'} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setRoupaBool(true);
                    }}
                  >
                    <ThumbsUp size={24} color={roupaBool === null ? 'gray' : roupaBool ? 'green' : 'gray'} />
                  </IconButton>
                </Stack>
              </Stack>
              <TextField
                placeholder="Comentario controle de roupa"
                multiline
                rows={2}
                value={roupaMessage}
                onChange={(e) => {
                  setRoupaMessage(e.target.value);
                }}
              />
            </Stack>
            <Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography id="modal-modal-description" sx={{ fontWeight: 'bold' }}>
                  Controle de utensilios
                </Typography>
                <Stack direction="row">
                  <IconButton
                    onClick={() => {
                      setUtensilioBool(false);
                    }}
                  >
                    <ThumbsDown size={24} color={utensilioBool === null ? 'gray ' : !utensilioBool ? 'red' : 'gray'} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setUtensilioBool(true);
                    }}
                  >
                    <ThumbsUp size={24} color={utensilioBool === null ? 'gray ' : utensilioBool ? 'green' : 'gray'} />
                  </IconButton>
                </Stack>
              </Stack>
              <TextField
                onChange={(e) => {
                  setUtensilioMessage(e.target.value);
                }}
                placeholder="Comentario controle de utensilios"
                multiline
                rows={2}
                value={utensilioMessage}
              />
            </Stack>
            <Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography id="modal-modal-description" sx={{ fontWeight: 'bold' }}>
                  Controle de consumo
                </Typography>
                <Stack direction="row">
                  <IconButton
                    onClick={() => {
                      setConsumibleBool(false);
                    }}
                  >
                    <ThumbsDown size={24} color={consumibleBool === null ? 'gray' : !consumibleBool ? 'red' : 'gray'} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setConsumibleBool(true);
                    }}
                  >
                    <ThumbsUp size={24} color={consumibleBool === null ? 'gray' : consumibleBool ? 'green' : 'gray'} />
                  </IconButton>
                </Stack>
              </Stack>
              <TextField
                onChange={(e) => {
                  setConsumibleMessage(e.target.value);
                }}
                placeholder="Comentario controle de consumo"
                multiline
                rows={2}
                value={consumibleMessage}
              />
            </Stack>
          </Stack>
          <Stack sx={{ mt: 5 }} spacing={2} direction="row" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={checkAllFields}>
              Confirmar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Depois
            </Button>
          </Stack>
        </Box>
      </>
    </Modal>
  );
}

export default ModalMessageAlert;
