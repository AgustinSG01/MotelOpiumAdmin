import React from 'react';
import { Button } from '@mui/material';

interface ButtonProps {
  handleClick: () => void;
  text: string;
}

function ModalButton({ handleClick, text }: ButtonProps): React.ReactElement {
  return (
    <Button
      onClick={handleClick}
      sx={{
        fontSize: '1.2rem',
      }}
    >
      {text}
    </Button>
  );
}

export default ModalButton;
