import * as React from 'react';
import { Skeleton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Eye } from '@phosphor-icons/react/dist/ssr';

export interface ControlsMonthProps {
  sx?: SxProps;
  value: string | number;
  loading: boolean;
}

export function ControlsMonth({ sx, value, loading }: ControlsMonthProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Controles
              </Typography>
              {loading ? <Skeleton variant="text" height={38} /> : <Typography variant="h4">{value}</Typography>}
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
              <Eye fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>

          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Typography color="text.secondary" variant="caption">
              No mês atual
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
