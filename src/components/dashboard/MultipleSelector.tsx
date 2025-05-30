import * as React from 'react';
import { Checkbox } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { type SxProps } from '@mui/system';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export type Value = string | number;
type Text = string | number;

interface Item {
  valor: Value;
  text: Text;
}

interface MultipleSelectorProps {
  items: Item[];
  selectedItems: Value[]; // Cambiado de string[] | number[] a Value[]
  setSelectedItems: (items: Value[]) => void; // Actualizado para usar Value[]
  label?: string;
  formSx?: SxProps;
  labelSx?: SxProps;
  selectSx?: SxProps;
  itemSx?: SxProps;
  checkboxSx?: SxProps;
  listItemSx?: SxProps;
}

export default function MultipleSelector({
  items,
  selectedItems,
  setSelectedItems,
  label,
  formSx,
  selectSx,
  itemSx,
  checkboxSx,
  listItemSx,
}: MultipleSelectorProps): React.JSX.Element {
  const handleChange = (event: SelectChangeEvent<Value[]>): void => {
    const {
      target: { value },
    } = event;

    const newValue = typeof value === 'string' ? value.split(',') : value;

    // Filtrar valores vacíos o undefined
    const filteredValue = newValue.filter((item) => item !== '' && item !== null);

    setSelectedItems(filteredValue);
  };

  return (
    <FormControl sx={{ m: 1, width: 300, padding: 0, ...formSx }}>
      <Select
        id="multiple-checkbox"
        multiple
        value={selectedItems.length > 0 ? selectedItems : ['']}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={() => label}
        MenuProps={MenuProps}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '& .mui-1idmfta-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.mui-1idmfta-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.mui-1idmfta-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
            { padding: 0 },
          color: '#667085',
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: 0,
          ...selectSx,
        }}
        displayEmpty
      >
        {items.map((item: Item) => (
          <MenuItem key={item.valor} value={item.valor} sx={{ ...itemSx }}>
            <Checkbox checked={selectedItems.includes(item.valor)} sx={{ ...checkboxSx }} />
            <ListItemText primary={item.text} sx={{ ...listItemSx }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
