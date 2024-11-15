import React, { useState } from 'react';
import { Box, Modal, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';

import instance from '../../../axios-config';
import useForm from '../../../hooks/use-form';
import AlertMessage from '../Alert';
import ModalButton from '../ModalButton';

interface NewSuitProps {
  handleClose: () => void;
  refresh: () => void;
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

function NewSuit({ handleClose, open, refresh }: NewSuitProps): React.JSX.Element {
  const { nome, updateForm, resetForm } = useForm();

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });

  function validate(): boolean {
    if (!nome) {
      setAlert({
        show: true,
        message: 'Preencha o campo de nome',
        type: 'error',
      });
      return false;
    }
    return true;
  }

  async function handleSubmit(): Promise<void> {
    if (validate()) {
      const data = {
        nome,
      };
      try {
        const newSuit = await instance.post('/suit', data);
        if (newSuit) {
          handleClose();
          setAlert({
            show: true,
            message: 'Suit criado com sucesso',
            type: 'success',
          });
          refresh();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setAlert({
            show: true,
            message: (error?.response?.data as { message: string })?.message || 'Ocorreu um erro',
            type: 'error',
          });
        }
      } finally {
        resetForm();
      }
    }
  }

  return (
    <>
      <AlertMessage
        show={alert.show}
        message={alert.message}
        type={alert.type}
        handleClose={() => {
          setAlert({ show: false, message: '', type: '' });
        }}
      />
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
          }}
        >
          <h2 id="child-modal-title" style={{ textAlign: 'center' }}>
            Insira os detalhes do novo suit
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
            <TextField
              id="nome-suit"
              label="Nome"
              variant="outlined"
              value={nome}
              onChange={(e) => {
                updateForm('nome', e.target.value);
              }}
              InputProps={{
                sx: { fontSize: { sm: '1.4rem', lg: '1.4rem' } },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: { sm: '1.4rem', lg: '1.4rem' },
                  textAlign: 'center',
                },
              }}
              sx={{ backgroundColor: 'white' }}
            />

            <Stack direction="row" justifyContent="space-between">
              <ModalButton
                handleClick={() => {
                  handleClose();
                  resetForm();
                }}
                text="Cancelar"
              />
              <ModalButton handleClick={handleSubmit} text="Adicionar" />
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default NewSuit;
