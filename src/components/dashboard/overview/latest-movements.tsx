import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { type Employee } from '@/types/types';

dayjs.extend(utc);
dayjs.extend(timezone);

const statusMap = {
  StartFaxina: { label: 'Início Faxina', color: 'info' },
  EndFaxina: { label: 'Fim Faxina', color: 'success' },
  StartLimpeza: { label: 'Início Limpeza', color: 'info' },
  EndLimpeza: { label: 'Fim Limpeza', color: 'success' },
  Control: { label: 'Controle', color: 'warning' },
  EnterService: { label: 'Entrada Serviço', color: 'success' },
  ExitService: { label: 'Saída Serviço', color: 'info' },
  Falta: { label: 'Falta', color: 'error' },
} as const;

export interface Movement {
  id: number;
  data: Date;
  responsable: Employee;
  type: keyof typeof statusMap;
}

export interface LatestOrdersProps {
  movements?: Movement[];
  sx?: SxProps;
}

export function LatestMovements({ movements = [], sx }: LatestOrdersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Últimos movimentos" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Responsável</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Tempo</TableCell>
              <TableCell>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movements.map((movement) => {
              const {
                label,
                color,
              }: {
                label: string;
                color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
              } = statusMap[movement.type] ?? {
                label: 'Unknown',
                color: 'default',
              };

              return (
                <TableRow hover key={movement.id}>
                  <TableCell>{movement.responsable.nome}</TableCell>
                  <TableCell>{dayjs(movement.data).tz('America/Boa_Vista').format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{dayjs(movement.data).tz('America/Boa_Vista').format('HH:mm')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {/* <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button> */}
      </CardActions>
    </Card>
  );
}
