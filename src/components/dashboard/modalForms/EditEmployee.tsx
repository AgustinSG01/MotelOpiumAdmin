import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Modal, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';

import { type Employee } from '@/types/types';

import instance from '../../../axios-config';
import useForm from '../../../hooks/use-form';
import AlertMessage from '../Alert';
import ModalButton from '../ModalButton';

interface NewEmployeeProps {
  handleClose: () => void;
  open: boolean;
  employee: Employee | null;
  refresh: () => void;
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

function EditEmployee({ handleClose, open, employee, refresh }: NewEmployeeProps): React.JSX.Element {
  const { nome, pin, rol, updateForm, resetForm } = useForm();

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    if (employee?.id) {
      updateForm('nome', employee.nome);
      updateForm('pin', JSON.stringify(employee.pin));
      updateForm('rol', employee.rol);
    }
  }, [employee]);

  function validate(): boolean {
    if (!nome) {
      setAlert({
        show: true,
        message: 'Preencha o campo de nome',
        type: 'error',
      });
      return false;
    }
    if (!pin) {
      setAlert({
        show: true,
        message: 'Preencha o campo de pin',
        type: 'error',
      });
      return false;
    }
    if (!rol) {
      setAlert({
        show: true,
        message: 'Preencha o campo de rol',
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
        pin,
        rol,
      };
      try {
        const updatedEmployee = await instance.put(`/empregado/${employee?.id}`, data);
        if (updatedEmployee) {
          handleClose();
          setAlert({
            show: true,
            message: 'Funcionário atualizado',
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
            Insira os detalhes do novo funcionário
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
              id="nome-empregado"
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
            <TextField
              id="pin-empregado"
              label="Pin"
              variant="outlined"
              value={pin}
              type="number"
              onChange={(e) => {
                updateForm('pin', e.target.value);
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
            <TextField
              select
              id="rol-empregado"
              value={rol}
              label="Rol"
              onChange={(e) => {
                updateForm('rol', e.target.value);
              }}
              fullWidth
              InputProps={{
                sx: { fontSize: { sm: '1.4rem', lg: '1.4rem' } },
              }} // font size of input text
              InputLabelProps={{
                sx: {
                  fontSize: { sm: '1.4rem', lg: '1.4rem' },
                  textAlign: 'center',
                },
              }} // font size of input label
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value="GERENTE" sx={{ fontSize: { sm: '1.4rem', lg: '1.4rem' } }}>
                Gerente
              </MenuItem>
              <MenuItem value="CONTROL" sx={{ fontSize: { sm: '1.4rem', lg: '1.4rem' } }}>
                Control
              </MenuItem>
              <MenuItem value="LIMPEZA" sx={{ fontSize: { sm: '1.4rem', lg: '1.4rem' } }}>
                Limpeza
              </MenuItem>
            </TextField>
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

export default EditEmployee;
