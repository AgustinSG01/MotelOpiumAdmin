import React, { useState } from 'react';
import { Backdrop, Box, CircularProgress, Modal, Switch, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { type Dayjs } from 'dayjs';

import useEmpregados from '@/hooks/use-empregados';
import useSuits from '@/hooks/use-suits';

import axios from '../../../axios-config';
import AlertMessage from '../Alert';
import ModalButton from '../ModalButton';
import Selector from '../Selector';

interface EditLimpezaProps {
  handleClose: () => void;
  open: boolean;
  empregadoId: number | null;
  gerenteId: number | null;
  faxina: boolean;
  esquecido: boolean;
  comeco: Date | null;
  fim: Date | null;
  data: Date | null;
  suitId: number | null;
  id: number;
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

function EditLimpeza({
  handleClose,
  open,
  suitId,
  empregadoId,
  gerenteId,
  faxina,
  comeco,
  fim,
  data,
  id,
  refresh,
}: EditLimpezaProps): React.JSX.Element {
  const [empregado, setEmpregado] = useState<number | string | null>(empregadoId);
  const [gerente, setGerente] = useState<number | string | null>(gerenteId);
  const [suit, setSuit] = useState<number | string | null>(suitId);
  const [dataState, setDataState] = useState<Dayjs | Date | null>(data);
  const [comecoState, setComecoState] = useState<Dayjs | Date | null>(comeco);
  const [fimState, setFimState] = useState<Dayjs | Date | null>(fim || null);
  const [faxinaState, setFaxinaState] = useState(faxina);
  const [loading, setLoading] = useState(false);

  const { empregados, loading: loadingEmpregados, error: errorEmpregados } = useEmpregados('limpeza');

  const { empregados: gerentes, loading: loadingGerentes, error: errorGerentes } = useEmpregados('gerente');

  const { suits, error: errorSuits, loading: loadingSuits } = useSuits();

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });

  function validate(): boolean {
    if (!empregado) {
      setAlert({
        show: true,
        message: 'Preencha o campo de Funcionário',
        type: 'error',
      });
      return false;
    } else if (!gerente) {
      setAlert({
        show: true,
        message: 'Preencha o campo de gerente',
        type: 'error',
      });
      return false;
    } else if (!suit) {
      setAlert({
        show: true,
        message: 'Preencha o campo de suíte',
        type: 'error',
      });
      return false;
    } else if (!comecoState) {
      setAlert({
        show: true,
        message: 'Escolha um horário de início.',
        type: 'error',
      });
      return false;
    } else if (!fimState) {
      setAlert({
        show: true,
        message: 'Escolha um horário de fim.',
        type: 'error',
      });
      return false;
    }

    return true;
  }

  function changeEmpregado(value: number | string): void {
    setEmpregado(value);
  }

  function changeGerente(value: number | string): void {
    setGerente(value);
  }

  function changeSuit(value: number | string): void {
    setSuit(value);
  }

  async function handleSubmit(): Promise<void> {
    setLoading(true);
    const valid = validate();
    if (!valid) return;

    const body = {
      empregado_id: empregado,
      gerente_id: gerente,
      suit_id: suit,
      comeco: comecoState,
      fim: fimState,
      faxina: faxinaState,
      data: dataState,
      esquecido: false,
    };
    if (fim) {
      try {
        await axios.put(`/limpeza/${id}`, body);
        setAlert({
          show: true,
          message: 'Limpeza atualizada com sucesso',
          type: 'success',
        });
        handleClose();
        setLoading(false);
        refresh();
      } catch (_error) {
        setLoading(false);

        setAlert({
          show: true,
          message: 'Erro ao atualizar limpeza',
          type: 'error',
        });
      }
    } else {
      try {
        await axios.post(`/limpeza/completed`, body);
        if (!suitId) {
          try {
            await axios.delete(`/limpeza/inprocess/${id}`);
          } catch (error) {
            setAlert({
              show: true,
              message: 'Ocorreu um erro ao excluir a limpeza em andamento; exclua-a manualmente.',
              type: 'error',
            });
          }
        }
        setAlert({
          show: true,
          message: 'Limpeza atualizada com sucesso',
          type: 'success',
        });
        handleClose();
        setLoading(false);
        refresh();
      } catch (_error) {
        setLoading(false);

        setAlert({
          show: true,
          message: 'Erro ao atualizar limpeza',
          type: 'error',
        });
      }
    }
  }
  return (
    <>
      <Backdrop sx={() => ({ color: '#fff', zIndex: 1400 })} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <h2 id="child-modal-title" style={{ textAlign: 'center' }}>
            Atualize os campos desejados
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
            <Stack spacing={2}>
              <Typography variant="h6">Funcionário</Typography>
              <Selector
                error={errorEmpregados}
                handleChange={changeEmpregado}
                items={empregados}
                loading={loadingEmpregados}
                label="Funcionário"
                value={empregado ? empregado : ''}
                labelId="selector-funcionarios"
                noItemsText="Houve um erro na obtenção dos funcionários"
              />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h6">Gerente</Typography>
              <Selector
                error={errorGerentes}
                handleChange={changeGerente}
                items={gerentes}
                loading={loadingGerentes}
                label="Gerente"
                value={gerente ? gerente : ''}
                labelId="selector-gerente"
                noItemsText="Houve um erro na obtenção dos gerentes"
              />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h6">Suíte</Typography>
              <Selector
                error={errorSuits}
                handleChange={changeSuit}
                items={suits}
                loading={loadingSuits}
                label="Suíte"
                value={suit ? suit : ''}
                labelId="selector-suit"
                noItemsText="Houve um erro na obtenção dos suítes"
              />
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6">Começo</Typography>

              <DateTimePicker
                label="Começo"
                value={comecoState ? dayjs(comecoState) : null}
                onChange={(newValue) => {
                  setDataState(newValue);
                  setComecoState(newValue);
                }}
              />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h6">Fim</Typography>
              <DateTimePicker
                label="Fim"
                value={fimState ? dayjs(fimState) : null}
                onChange={(newValue) => {
                  setFimState(newValue);
                }}
              />
            </Stack>

            <Stack spacing={2} direction="row" justifyContent="space-between">
              <Typography variant="h6">Faxina</Typography>
              <Switch
                checked={faxinaState}
                onChange={(e) => {
                  setFaxinaState(e.target.checked);
                }}
              />
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <ModalButton
                handleClick={() => {
                  handleClose();
                }}
                text="Cancelar"
              />
              <ModalButton handleClick={handleSubmit} text="Salvar" />
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default EditLimpeza;
