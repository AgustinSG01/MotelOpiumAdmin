import * as React from 'react';
import { Skeleton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Broom } from '@phosphor-icons/react/dist/ssr';

export interface LimpezasProps {
  sx?: SxProps;
  value: number | string;
  loading: boolean;
  text?: string;
}

export function Limpezas({ sx, value, loading, text = 'No mês atual' }: LimpezasProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Limpezas
              </Typography>
              {loading ? <Skeleton variant="text" height={38} /> : <Typography variant="h4">{value}</Typography>}
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
              <Broom fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>

          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Typography color="text.secondary" variant="caption">
              {text}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
