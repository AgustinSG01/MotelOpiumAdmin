import React from 'react';
import { Button, Chip, Modal, TableCell, TableRow, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Eye, Pencil } from '@phosphor-icons/react';
import { Trash } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';

import { type Limpeza } from '@/types/types';

import ModalButton from '../ModalButton';
import EditLimpeza from '../modalForms/EditLimpeza';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface LimpezaProps {
  row: Limpeza;
  getControle: (id: number) => void;
  handleDelete: (id: number, state: string) => void;
  refresh: () => void;
}

function LimpezaData({ row, getControle, handleDelete, refresh }: LimpezaProps): React.JSX.Element {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  function getHour(hour: Date | undefined): string {
    if (!hour) return '-';
    const hourDayjs = dayjs(hour);
    return hourDayjs.format('HH:mm');
  }

  function getDate(date: Date | undefined): string {
    if (!date) return '-';
    const dateDayjs = dayjs(date);
    return dateDayjs.format('DD/MM/YYYY');
  }

  // const state = row.fim ? 'completed' : 'inprocess';
  //             handleDelete(row.id, state);

  return (
    // TODO: terminar tabla de limpieza
    <>
      {showEditModal ? (
        <EditLimpeza
          comeco={row.comeco}
          data={row.data || null}
          empregadoId={row.empregado?.id || null}
          faxina={row.faxina}
          gerenteId={row.gerente?.id || null}
          suitId={row.suit?.id}
          open={showEditModal}
          handleClose={() => {
            setShowEditModal(false);
          }}
          fim={row.fim || null}
          id={row.id}
          esquecido={row.esquecido}
          refresh={refresh}
        />
      ) : null}
      <Modal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: {
              md: 600,
              sm: 300,
              xs: '90vw',
            },
          }}
        >
          <h2 id="child-modal-title" style={{ textAlign: 'center' }}>
            Você deseja excluir a limpeza realizada pela {row.empregado?.nome || '-'} em {getDate(row.data)}?
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
            <Stack direction="row" justifyContent="space-between">
              <ModalButton
                handleClick={() => {
                  setShowDeleteModal(false);
                }}
                text="Cancelar"
              />

              <ModalButton
                handleClick={() => {
                  const state = row.fim ? 'completed' : 'inprocess';
                  handleDelete(row.id, state);
                }}
                text="Eliminar"
              />
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <TableRow hover key={row.id}>
        <TableCell>
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            {row.suit?.nome || '-'}
          </Typography>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.empregado?.nome || '-'}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.gerente?.nome || '-'}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.score && row.score > 0 ? row.score : '-'}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{getHour(row.comeco)}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{getHour(row.fim)}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{getDate(row.data)}</TableCell>

        <TableCell sx={{ textAlign: 'center' }}>
          {row.fim ? <Chip label="Finalizada" color="success" /> : <Chip label="Em andamento" color="warning" />}
        </TableCell>

        {/* ACCIONES */}
        <TableCell sx={{ textAlign: 'center' }}>
          <Stack direction="row" gap={2}>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                getControle(row.id);
              }}
              disabled={!row.controles?.aspectos?.length}
            >
              <Eye color="white" size={20} />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowEditModal(true);
              }}
            >
              <Pencil color="white" size={20} />
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              <Trash color="white" size={20} />
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}

export default LimpezaData;
