import React, { useState } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';
import { Eye } from '@phosphor-icons/react';

import { type Aspect } from '@/types/types';

import { CommentModal, ImageModal } from '../limpezas/score-info';

interface ControleProps {
  row: Aspect;
  //   getControle: (id: number) => void;
}

function AspectsData({ row }: ControleProps): React.JSX.Element {
  const [showComment, setShowComment] = useState(false);
  const [showImage, setShowImage] = useState(false);
  return (
    <>
      <ImageModal
        close={() => {
          setShowImage(false);
        }}
        image={row.image}
        show={showImage}
      />
      <CommentModal
        comment={row.comment}
        show={showComment}
        close={() => {
          setShowComment(false);
        }}
      />
      <TableRow key={row.id} sx={{ backgroundColor: row.score === 0 ? '#ed4337c4' : '' }}>
        <TableCell>{row.suit || '-'}</TableCell>

        <TableCell>{row.gerente || '-'}</TableCell>
        <TableCell>{row.empregado || '-'}</TableCell>
        <TableCell>{row.controleType || '-'}</TableCell>
        <TableCell>{row.score !== undefined && row.score !== null ? row.score : '-'}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="info"
            size="small"
            disabled={!row.comment}
            onClick={() => {
              setShowComment(true);
            }}
          >
            <Eye color="white" size={20} />
          </Button>
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="info"
            size="small"
            disabled={!row.image}
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

export default AspectsData;
