import { Box, Stack, Typography } from '@mui/material';
import googleLogo from '@/assets/googleLogo.svg';
import microsoftLogo from '@/assets/microsoftLogo.svg';
import { defaultStyle } from '@/config/colorConfig';
import Image from 'next/image';

type ProviderButtonsProps = {
  handleLoginWithGoogle: () => void;
  handleLoginWithMicrosoft: () => void;
};
export default function ProviderButtons({ handleLoginWithGoogle, handleLoginWithMicrosoft }: ProviderButtonsProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: '10px',
        }}>
        <Stack alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={handleLoginWithGoogle}>
          <Image src={googleLogo} alt='Google Logo' />
          <Typography color={defaultStyle.secondaryColor} fontSize={'12px'} fontWeight={400} lineHeight={'20px'}>
            Google
          </Typography>
        </Stack>
        <Stack alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={handleLoginWithMicrosoft}>
          <Image src={microsoftLogo} alt='microsoft Logo' />
          <Typography color={defaultStyle.secondaryColor} fontSize={'12px'} fontWeight={400} lineHeight={'20px'}>
            Microsoft
          </Typography>
        </Stack>
      </Box>
    </>
  );
}
