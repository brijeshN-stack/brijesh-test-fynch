import { defaultStyle } from '@/config/colorConfig';
import { Box, Typography } from '@mui/material';

type noDataProps = {
  height?: string;
  label: string;
};
export default function NoDataAvailable({ height, label }: noDataProps) {
  return (
    <Box sx={{ height: height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant='title3' sx={{ color: defaultStyle.primaryColor }}>
        {label}
      </Typography>
    </Box>
  );
}
