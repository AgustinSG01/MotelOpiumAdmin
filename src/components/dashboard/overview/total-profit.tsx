import * as React from 'react';
import { Skeleton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { UserPlus } from '@phosphor-icons/react/dist/ssr';

export interface TotalProfitProps {
  sx?: SxProps;
  value: string;
  loading: boolean;
}

export function EmployeeMonth({ value, sx, loading }: TotalProfitProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Funcionário
              </Typography>
              {loading ? <Skeleton variant="text" height={38} /> : <Typography variant="h5">{value}</Typography>}
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
              <UserPlus fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Typography color="text.secondary" variant="caption">
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                <Typography color="text.secondary" variant="caption">
                  Funcionário com mais limpezas neste mês
                </Typography>
              </Stack>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
