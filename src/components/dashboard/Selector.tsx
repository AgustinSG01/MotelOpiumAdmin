import React from 'react';
import { MenuItem, Skeleton, TextField } from '@mui/material';

import { type Employee, type Suit } from '@/types/types';

interface PropsSel {
  value: string | number;
  handleChange: (value: string | number) => void;
  error: boolean;
  loading: boolean;
  items: Employee[] | Suit[];
  noItemsText: string;
  label: string;
  labelId: string;
}

function Selector({
  value,
  handleChange,
  error,
  loading,
  items,
  noItemsText,
  label,
  labelId,
}: PropsSel): React.JSX.Element {
  return (
    <TextField
      select
      id={labelId}
      value={value}
      label={label}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      fullWidth
      InputProps={{
        sx: { fontSize: { sm: '1.4rem', lg: '1rem' } },
      }} // font size of input text
      InputLabelProps={{
        sx: {
          fontSize: { sm: '1.4rem', lg: '1rem' },
          textAlign: 'center',
        },
      }} // font size of input label
      sx={{ backgroundColor: 'white', maxWidth: '300px' }}
    >
      {loading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={25} // Ajusta la altura según el tamaño de los items
        />
      ) : error ? (
        <MenuItem value={0} sx={{ fontSize: { sm: '1.4rem', lg: '1rem' } }} disabled>
          {noItemsText}
        </MenuItem>
      ) : (
        items.map((item) => (
          <MenuItem key={item.id} value={item.id} sx={{ fontSize: { sm: '1.4rem', lg: '1rem' } }}>
            {item.nome}
          </MenuItem>
        ))
      )}
    </TextField>
  );
}

export default Selector;
