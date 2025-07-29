import React from 'react';
import { Button, IconButton, Modal, TableCell, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Eye, X } from '@phosphor-icons/react/dist/ssr';

interface ScoreProps {
  name: string;
  score: number;
  comment?: string;
  image?: string;
}

function ScoreInfo({ name, score, comment, image }: ScoreProps): React.ReactElement {
  const [showComment, setShowComment] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);

  return (
    <>
      <ImageModal
        close={() => {
          setShowImage(false);
        }}
        image={image}
        show={showImage}
      />
      <CommentModal
        comment={comment}
        show={showComment}
        close={() => {
          setShowComment(false);
        }}
      />
      <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: score > 6 ? 'green' : score > 3 ? 'darkorange' : 'red',
              borderRadius: '50%',
              width: 25,
              height: 25,
              color: 'white',
              mx: 'auto',
            }}
          >
            <Typography>{score}</Typography>
          </Box>
        </TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            color="primary"
            disabled={!comment}
            onClick={() => {
              setShowComment(true);
            }}
          >
            <Eye color="white" size={20} />
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            color="primary"
            disabled={!image}
            onClick={() => {
              setShowImage(true);
            }}
          >
            <Eye color="white" size={20} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
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
  borderRadius: 1,
  display: 'flex',
  flexDirection: 'column',
};

export function CommentModal({
  comment,
  show,
  close,
}: {
  comment: string | undefined;
  show: boolean;
  close: () => void;
}): React.JSX.Element {
  return (
    <Modal open={show} onClose={close} aria-labelledby="comment-modal" aria-describedby="modal-comment">
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', maxHeight: '200px', overflow: 'auto' }}>
          {comment}
        </Typography>
        <Button onClick={close} sx={{ marginTop: 2, marginX: 'auto' }}>
          Fechar
        </Button>
      </Box>
    </Modal>
  );
}
const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'auto', // Permite el scroll si el contenido excede la altura máxima
  width: 'auto',
};

interface ImageModalProps {
  image?: string;
  show: boolean;
  close: () => void;
}
export function ImageModal({ image, show, close }: ImageModalProps): React.JSX.Element {
  return (
    <Modal open={show} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        <picture style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}>
          <img
            src={image || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
            alt="Imagem"
            style={{
              display: 'block',
              margin: '0 auto',
              maxHeight: '95vh', // Máxima altura de la imagen
              height: 'auto', // Ajusta automáticamente la altura si es menor

              objectFit: 'contain',
            }}
          />
        </picture>
        <IconButton onClick={close} sx={{ position: 'absolute', top: 0, right: 0, m: 2 }}>
          <X size={32} />
        </IconButton>
      </Box>
    </Modal>
  );
}

export default ScoreInfo;
