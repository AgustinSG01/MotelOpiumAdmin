'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { type Employee } from '@/types/types';
import { CustomersTable } from '@/components/dashboard/empregados/customers-table';
import EditEmployee from '@/components/dashboard/modalForms/EditEmployee';
import NewEmployee from '@/components/dashboard/modalForms/NewEmployee';

import axios from '../../../axios-config';

export default function Page(): React.JSX.Element {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [showModal, setShowModal] = React.useState({
    new: false,
    edit: false,
  });
  const [employee, setEmployee] = React.useState<null | Employee>(null);
  const page = 0;
  const rowsPerPage = 5;

  React.useEffect(() => {
    void getEmployees();
  }, []);

  async function getEmployees(): Promise<void> {
    try {
      const response = await axios.get('/empregado/all');
      const data: Employee[] = response.data as Employee[];
      setEmployees(data);
    } catch (error) {
      return undefined;
    }
  }

  async function getEmployee(id: number, rol: string): Promise<void> {
    try {
      const response = await axios.get(`/empregado/all/${id}?rol=${rol}`);
      const data = response.data as Employee;
      if (data) {
        setEmployee(data);
        setShowModal({ edit: true, new: false });
      }
    } catch (error) {
      // TODO: Alert de que hubo un error
    }
  }

  async function deleteEmployee(id: number, rol: string): Promise<void> {
    try {
      await axios.delete(`/empregado/${rol}/${id}`);
    } catch (error) {
      // TODO: Agregar mensaje de que no se pudo eliminar
    } finally {
      void getEmployees();
    }
  }

  return (
    <>
      <EditEmployee
        employee={employee}
        open={showModal.edit}
        handleClose={() => {
          setShowModal({ edit: false, new: false });
        }}
        refresh={getEmployees}
      />
      <NewEmployee
        open={showModal.new}
        handleClose={() => {
          setShowModal({ new: false, edit: false });
        }}
        refresh={getEmployees}
      />
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Funcionários</Typography>
          </Stack>
          <div>
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              onClick={() => {
                setShowModal({ new: true, edit: false });
              }}
            >
              Adicionar
            </Button>
          </div>
        </Stack>
        {/* <CustomersFilters /> */}
        <CustomersTable
          handleDelete={deleteEmployee}
          count={employees.length}
          page={page}
          rows={employees}
          rowsPerPage={rowsPerPage}
          editEmployee={getEmployee}
        />
      </Stack>
    </>
  );
}
