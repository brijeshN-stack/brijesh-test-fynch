import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';
import { StyledStack } from '@/components/auth/style';
import CustomButton from '@/components/button/CustomButton';
import { defaultStyle } from '@/config/colorConfig';
import ProviderButtons from '@/components/authProviderButtons/ProviderButtons';
import CustomLink from '@/components/customLink/CustomLink';

type RegisterActionBlockProps = {
  commonWidthHeight?: object;
  handleLoginWithGoogle: () => void;
  handleLoginWithMicrosoft: () => void;
  create_your_account: string;
  or_signup_with: string;
  have_an_account: string;
  sign_in: string;
};

export default function RegisterActionBlock({
  commonWidthHeight,
  handleLoginWithGoogle,
  handleLoginWithMicrosoft,
  create_your_account,
  or_signup_with,
  have_an_account,
  sign_in,
}: RegisterActionBlockProps) {
  return (
    <>
      <StyledStack
        sx={{
          gap: '16px',
          padding: '40px 0 27px',
        }}>
        <CustomButton
          type='submit'
          variant='defaultPrimary'
          sx={{
            ...commonWidthHeight,
          }}>
          <Typography variant='title4'>{create_your_account}</Typography>
        </CustomButton>
        <Typography variant='title4' color={defaultStyle.sidebarAndAuthScreenTextColor}>
          {or_signup_with}
        </Typography>
        <ProviderButtons handleLoginWithGoogle={handleLoginWithGoogle} handleLoginWithMicrosoft={handleLoginWithMicrosoft} />
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'baseline',
            marginTop: '24px',
          }}>
          <Typography variant='title4' color={defaultStyle.sidebarAndAuthScreenTextColor}>
            {have_an_account}
          </Typography>{' '}
          <CustomLink location='/login'>
            <Typography
              variant='title4'
              color={process.env.NEXT_PUBLIC_AUTH_SCREEN_LINK_COLOR || defaultStyle.authScreenButtonColor}
              fontWeight={600}>
              {sign_in}
            </Typography>
          </CustomLink>
        </Box>
      </StyledStack>
    </>
  );
}
