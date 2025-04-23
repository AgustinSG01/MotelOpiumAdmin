import React from 'react';
import { MenuItem, Skeleton, SxProps, TextField, TextFieldVariants } from '@mui/material';

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
  InputSx?: SxProps;
  labelSx?: SxProps;
  textFieldSx?: SxProps;
  menuItemSx?: SxProps;
  variant?: TextFieldVariants;
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
  InputSx,
  labelSx,
  textFieldSx,
  menuItemSx,
  variant = 'outlined',
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
        sx: { fontSize: { sm: '1.4rem', lg: '1rem' }, ...InputSx },
      }} // font size of input text
      InputLabelProps={{
        sx: {
          fontSize: { sm: '1.4rem', lg: '1rem' },
          textAlign: 'center',
          ...labelSx,
        },
      }} // font size of input label
      sx={{ backgroundColor: 'white', maxWidth: '300px', ...textFieldSx }}
      variant={variant}
    >
      {loading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={25} // Ajusta la altura según el tamaño de los items
        />
      ) : error ? (
        <MenuItem value={0} sx={{ fontSize: { sm: '1.4rem', lg: '1rem' }, ...menuItemSx }} disabled>
          {noItemsText}
        </MenuItem>
      ) : (
        items.map((item) => (
          <MenuItem key={item.id} value={item.id} sx={{ fontSize: { sm: '1.4rem', lg: '1rem' }, ...menuItemSx }}>
            {item.nome}
          </MenuItem>
        ))
      )}
    </TextField>
  );
}

export default Selector;
