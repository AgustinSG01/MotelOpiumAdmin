/* eslint-disable react/prop-types */
import React from 'react';
import { MenuItem, TextField } from '@mui/material';

interface Props {
  value: string | number;
  updateForm: (stateName: string, value: string | number) => void;
  stateName: string;
  error: boolean;
  loading: boolean;
  items: string[] | number[];
  noItemsText: string;
  label: string;
  labelId: string;
}

function Selector({ value, updateForm, stateName, error, loading, items, noItemsText, label, labelId }: Props) {
  return (
    <TextField
      select
      id={labelId}
      value={value}
      label={label}
      onChange={(e) => {
        updateForm(stateName, e.target.value);
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
      {!error && !loading ? (
        items.map((item) => (
          <MenuItem key={item.id} value={item.id} sx={{ fontSize: { sm: '1.4rem', lg: '1rem' } }}>
            {item.nome}
          </MenuItem>
        ))
      ) : (
        <MenuItem value={0} sx={{ fontSize: { sm: '1.4rem', lg: '1rem' } }} disabled>
          {noItemsText}
        </MenuItem>
      )}
    </TextField>
  );
}

export default Selector;
