import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

interface TableRowsLoaderProps {
  rowsNum: number;
  columnsNum: number;
}

function TableRowsLoader({ rowsNum, columnsNum }: TableRowsLoaderProps): React.JSX.Element[] {
  return Array(rowsNum)
    .fill(undefined)
    .map((_, rowIndex) => (
      <TableRow key={`row-${rowIndex}`}>
        {Array(columnsNum)
          .fill(undefined)
          .map((__, colIndex) => (
            <TableCell key={`cell-${rowIndex}-${colIndex}`}>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          ))}
      </TableRow>
    ));
}

export default TableRowsLoader;
