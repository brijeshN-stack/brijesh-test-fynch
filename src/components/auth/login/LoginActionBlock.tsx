import React from 'react';
import { Typography } from '@mui/material';
import { StyledLink, StyledStack } from '@/components/auth/style';
import CustomButton from '@/components/button/CustomButton';
import { defaultStyle } from '@/config/colorConfig';
import ProviderButtons from '@/components/authProviderButtons/ProviderButtons';

type LoginActionBlockProps = {
  commonWidthHeight?: object;
  handleCreateNewAccount?: () => void;
  handleForgotPassword: () => void;
  forgot_password: string;
  sign_in: string;
  or: string;
  create_new_account: string;
  handleLoginWithGoogle: () => void;
  handleLoginWithMicrosoft: () => void;
  or_signin_with: string;
};

export default function LoginActionBlock({
  commonWidthHeight,
  handleCreateNewAccount,
  handleForgotPassword,
  forgot_password,
  sign_in,
  or,
  create_new_account,
  handleLoginWithGoogle,
  handleLoginWithMicrosoft,
  or_signin_with,
}: LoginActionBlockProps) {
  return (
    <>
      <StyledLink href='#'>
        <Typography variant='title4' sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }} onClick={handleForgotPassword}>
          {' '}
          {forgot_password}
        </Typography>
      </StyledLink>
      <StyledStack
        sx={{
          gap: '15px',
          marginTop: '36px',
        }}>
        <CustomButton
          type='submit'
          variant='defaultPrimary'
          sx={{
            ...commonWidthHeight,
          }}>
          <Typography variant='title4'>{sign_in}</Typography>
        </CustomButton>
        <Typography variant='title4' color={defaultStyle.sidebarAndAuthScreenTextColor}>
          {or}
        </Typography>

        <CustomButton
          variant='defaultPrimary'
          sx={{
            ...commonWidthHeight,
          }}
          handleClick={handleCreateNewAccount}>
          <Typography variant='title4'>{create_new_account}</Typography>
        </CustomButton>
        <Typography variant='title4' color={defaultStyle.sidebarAndAuthScreenTextColor}>
          {or_signin_with}
        </Typography>
        <ProviderButtons handleLoginWithGoogle={handleLoginWithGoogle} handleLoginWithMicrosoft={handleLoginWithMicrosoft} />
      </StyledStack>
    </>
  );
}
