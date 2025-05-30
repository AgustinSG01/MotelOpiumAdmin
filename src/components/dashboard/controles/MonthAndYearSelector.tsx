import React, { useState } from 'react';
import { Button, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';

interface MonthAndYearSelectorProps {
  onDateChange?: (year: number, month: number) => void;
  initialYear?: number;
  initialMonth?: number;
  onApply?: () => void;
}

function MonthAndYearSelector({
  onDateChange,
  initialYear = new Date().getFullYear(),
  initialMonth = new Date().getMonth(),
  onApply,
}: MonthAndYearSelectorProps): React.JSX.Element {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i);

  // Meses del año
  const months = [
    { value: 0, label: 'Janeiro' },
    { value: 1, label: 'Fevereiro' },
    { value: 2, label: 'Março' },
    { value: 3, label: 'Abril' },
    { value: 4, label: 'Maio' },
    { value: 5, label: 'Junho' },
    { value: 6, label: 'Julho' },
    { value: 7, label: 'Agosto' },
    { value: 8, label: 'Setembro' },
    { value: 9, label: 'Outubro' },
    { value: 10, label: 'Novembro' },
    { value: 11, label: 'Dezembro' },
  ];

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const year = event.target.value as number;
    setSelectedYear(year);
    onDateChange?.(year, selectedMonth);
  };

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const month = event.target.value as number;
    setSelectedMonth(month);
    onDateChange?.(selectedYear, month);
  };

  return (
    <Stack spacing={3} direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '1.2rem' }}>
        MEDIA PARA CALCULOS DE PREMIOS
      </Typography>

      <Stack direction="row" spacing={3} sx={{ minWidth: 300 }}>
        <FormControl fullWidth>
          <Select
            labelId="month-select-label"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            variant="standard"
            sx={{ fontWeight: 'bold', color: '1.2rem' }}
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            variant="standard"
            sx={{ fontWeight: 'bold', color: '1.2rem' }}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Button onClick={onApply} sx={{ fontWeight: 'bold', color: '1.2rem' }}>
        Aplicar
      </Button>
    </Stack>
  );
}

export default MonthAndYearSelector;
