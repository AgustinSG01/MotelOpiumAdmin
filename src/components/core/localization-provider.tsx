'use client';

import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import 'dayjs/locale/pt-br'; // Importa el idioma portugués

// Configura el idioma globalmente
dayjs.locale('pt-br');

export interface LocalizationProviderProps {
  children: React.ReactNode;
}

export function LocalizationProvider({ children }: LocalizationProviderProps): React.JSX.Element {
  return (
    <Provider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      {children}
    </Provider>
  );
}
