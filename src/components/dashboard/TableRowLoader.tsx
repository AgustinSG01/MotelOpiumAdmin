import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

const TableRowsLoader = ({ rowsNum, columnsNum }: { rowsNum: number; columnsNum: number }): React.ReactElement => {
  return [...Array(rowsNum)].map((_, index) => (
    <TableRow key={index}>
      {[...Array(columnsNum)].map((_, index) => (
        <TableCell key={index}>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default TableRowsLoader;
