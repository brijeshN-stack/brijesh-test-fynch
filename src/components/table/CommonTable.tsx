'use client';

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import './commonTable.css';

type CommonTableProps = {
  rows: any;
  columns: any;
};

// do not delete commented code it's necessary
export default function CommonTable({ rows, columns }: CommonTableProps) {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleCheckboxSelectionChange = (newSelection: any) => {
    setSelectedRows(newSelection);
  };

  // const renderCell = (params: any) => {
  //   const field = params.field;
  //   if (field === "download") {
  //     return (
  //       <DownloadIcon
  //         fillColor={
  //           selectedRows.includes(params.row.id) ? "#0E163B" : "#979595"
  //         }
  //       />
  //     );
  //   }
  //   return params.value;
  // };
  return (
    <Box
      sx={{
        maxHeight: '552px',
        maxWidth: '920px',
        '@media (min-width: 1300px)': {
          maxWidth: '1049px',
        },
        // maxWidth: "1049px",
        width: '100%',
        height: '100%',
        padding: '26px',
        marginTop: '38px',
        background: '#FCFCFC',
        borderRadius: '14px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          border: '4px solid #E1E1E1',
          borderRadius: '10px',
        },
      }}>
      <DataGrid
        rows={rows}
        columns={columns?.map((column: any) => ({
          ...column,
          // renderCell: renderCell,
        }))}
        pagination
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleCheckboxSelectionChange}
        disableColumnMenu
        sx={{
          borderColor: 'transparent',
        }}
      />
    </Box>
  );
}
