import React, { useEffect } from 'react';
import { Alert, AlertColor } from '@mui/material';

interface AlertProps {
  type?: string;
  message: string;
  show: boolean;
  handleClose: () => void;
}

function AlertMessage({ type = 'error', message, show, handleClose }: AlertProps): React.ReactElement {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [show, handleClose]);

  return (
    <Alert
      severity={type as AlertColor}
      variant="filled"
      sx={{
        position: 'fixed',
        right: 10,
        top: show ? 10 : '-250px',
        transition: '300ms ease-in-out',
        zIndex: 1301,
      }}
    >
      {message}
    </Alert>
  );
}

export default AlertMessage;
