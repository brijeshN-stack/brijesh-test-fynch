import { Box, CircularProgress } from '@mui/material';

export default function CircularLoader() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        opacity: 0.9,
        borderRadius: 'inherit',
        background: '#d6d6d5c2',
        zIndex: '3',
      }}>
      <CircularProgress />
    </Box>
  );
}
