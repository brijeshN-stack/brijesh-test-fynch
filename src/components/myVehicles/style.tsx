'use client';

import { styled, Card } from '@mui/material';

export const AddVehicleWrapper = styled(Card)(({ theme }: any) => ({
  padding: '18px 5px',
  width: '100% !important',
  height: '100% !important',
  [theme.breakpoints.up('md')]: {
    maxWidth: '272px !important',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '272px',
  },
}));
