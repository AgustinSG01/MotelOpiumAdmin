import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { Stack } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import { type Dayjs } from 'dayjs';

import useEmpregados from '@/hooks/use-empregados';
import useSuits from '@/hooks/use-suits';

import instance from '../../../axios-config';
import AlertMessage from '../Alert';
import ModalButton from '../ModalButton';
import Selector from '../Selector';

interface NewEmployeeProps {
  handleClose: () => void;
  refresh: () => void;
  open: boolean;
  faxina: boolean;
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

function NewLimpeza({ handleClose, open, refresh, faxina = true }: NewEmployeeProps): React.JSX.Element {
  const [suit, setSuit] = useState<string | number>('');
  const [empregado, setEmpregado] = useState<string | number>('');
  const [gerente, setGerente] = useState<string | number>('');
  const [startHour, setStartHour] = useState<Dayjs | null>(null);
  const [endHour, setEndHour] = useState<Dayjs | null>(null);

  const { suits, loading: loadingSuits, error: errorSuits } = useSuits();
  const { empregados, error: errorEmpregados, loading: loadingEmpregados } = useEmpregados('limpeza');
  const { empregados: gerentes, error: errorGerentes, loading: loadingGerentes } = useEmpregados('gerente');

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });

  function resetForm(): void {
    setSuit('');
    setEmpregado('');
    setGerente('');
    setStartHour(null);
    setEndHour(null);
  }

  function validate(): boolean {
    if (!suit) {
      setAlert({
        show: true,
        message: 'Preencha o campo de suíte',
        type: 'error',
      });
      return false;
    }
    if (!empregado) {
      setAlert({
        show: true,
        message: 'Preencha o campo de funcionário',
        type: 'error',
      });
      return false;
    }
    if (!gerente) {
      setAlert({
        show: true,
        message: 'Preencha o campo de gerente',
        type: 'error',
      });
      return false;
    }
    if (!startHour || !endHour) {
      setAlert({
        show: true,
        message: 'Preencha o campo de horário',
        type: 'error',
      });
      return false;
    }

    return true;
  }

  async function handleSubmit(): Promise<void> {
    if (validate()) {
      const data = {
        suit_id: suit,
        empregado_id: empregado,
        gerente_id: gerente,
        comeco: startHour,
        fim: endHour,
        data: endHour,
        faxina,
      };
      try {
        const newLimpeza = await instance.post(`/limpeza/completed`, data);
        if (newLimpeza) {
          handleClose();
          setAlert({
            show: true,
            message: 'Limpeza criada com sucesso',
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

  function changeSuit(value: string | number): void {
    setSuit(value);
  }

  function changeEmpregado(value: string | number): void {
    setEmpregado(value);
  }

  function changeGerente(value: string | number): void {
    setGerente(value);
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
            Insira os detalhes da nova limpeza
          </h2>
          <Stack gap={5} alignItems="center" mx="auto">
            <Selector
              value={suit}
              handleChange={changeSuit}
              error={errorSuits}
              loading={loadingSuits}
              items={suits}
              noItemsText="Nenhuma suíte cadastrada"
              label="Suíte"
              labelId="suite"
            />
            <Selector
              value={empregado}
              handleChange={changeEmpregado}
              error={errorEmpregados}
              loading={loadingEmpregados}
              items={empregados}
              noItemsText="Nenhum funcionário cadastrado"
              label="Funcionário"
              labelId="funcionário-selector"
            />
            <Selector
              value={gerente}
              handleChange={changeGerente}
              error={errorGerentes}
              loading={loadingGerentes}
              items={gerentes}
              noItemsText="Nenhum gerente cadastrado"
              label="Gerente"
              labelId="gerente-selector"
            />

            <Stack direction="row" justifyContent="space-between">
              <DateTimePicker
                label="Horário de início"
                value={startHour}
                onChange={(newValue) => {
                  setStartHour(newValue);
                }}
                sx={{ mr: 2 }}
              />
              <DateTimePicker
                label="Horário de fim"
                value={endHour}
                onChange={(newValue) => {
                  setEndHour(newValue);
                }}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" width="80%">
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

export default NewLimpeza;
