'use client';

import { GridColDef } from '@mui/x-data-grid';
import DownloadIcon from '@/assets/downloadIcon';

export const tableColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 249 },
  { field: 'month', headerName: 'Month', width: 200 },
  {
    field: 'year',
    headerName: 'Year',
    width: 200,
  },
  {
    field: 'download',
    headerName: 'Download',
    type: 'actions',
    width: 249,
    renderCell: params => {
      console.log('params', params);
      return <DownloadIcon />;
    },
  },
];

export const tableRows = [
  { id: 1, name: 'Snow', month: 'Jan', year: 2023, download: DownloadIcon },
  { id: 2, name: 'Lannister', month: 'Nov', year: 2023 },
  { id: 3, name: 'Lannister', month: 'Oct', year: 2023 },
  { id: 4, name: 'Stark', month: 'Nov', year: 2023 },
  { id: 5, name: 'Targaryen', month: 'Feb', year: 2023 },
  { id: 6, name: 'Melisandre', month: 'Nov', year: 2023 },
  { id: 7, name: 'Clifford', month: 'Nov', year: 2023 },
  { id: 8, name: 'Frances', month: 'Mar', year: 2023 },
  { id: 9, name: 'Roxie', month: 'May', year: 2023 },
  { id: 10, name: 'Jhon', month: 'May', year: 2023 },
  { id: 11, name: 'Maria', month: 'May', year: 2023 },
];
