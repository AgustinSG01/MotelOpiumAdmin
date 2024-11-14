'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { Employee } from '@/types/types';
import { config } from '@/config';
import { logger } from '@/lib/logger';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import NewEmployee from '@/components/dashboard/modalForms/NewEmployee';

import axios from '../../../axios-config';

export default function Page(): React.JSX.Element {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const page = 0;
  const rowsPerPage = 5;

  React.useEffect(() => {
    void getEmployees();
  }, []);

  async function getEmployees(): Promise<void> {
    try {
      const response = await axios.get('/empregado');
      const data: Employee[] = response.data as Employee[];
      console.log(data);
      setEmployees(data);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  return (
    <>
      <NewEmployee
        open={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Empregados</Typography>
          </Stack>
          <div>
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Add
            </Button>
          </div>
        </Stack>
        <CustomersFilters />
        <CustomersTable count={employees.length} page={page} rows={employees} rowsPerPage={rowsPerPage} />
      </Stack>
    </>
  );
}
