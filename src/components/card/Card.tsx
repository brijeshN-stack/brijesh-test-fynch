import React from 'react';
import { Box } from '@mui/material';

type CradProps = {
  childern?: React.ReactNode;
  sx?: object;
};

export default function Card({ childern, sx }: CradProps) {
  return (
    <Box
      sx={{
        ...sx,
      }}>
      {childern}
    </Box>
  );
}
