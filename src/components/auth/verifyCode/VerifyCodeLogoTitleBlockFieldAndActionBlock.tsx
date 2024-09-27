import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomTextField from '@/components/textfield/CustomTextField';
import CustomButton from '@/components/button/CustomButton';
import { defaultStyle } from '@/config/colorConfig';
import { StyledStack } from '@/components/auth/style';
import CustomLink from '@/components/customLink/CustomLink';

type VerifyCodeLogoTitleBlockFieldAndActionBlockProps = {
  commonWidthHeight: any;
  enter_your_code?: string;
  have_an_account?: string;
  sign_in?: string;
  verify_and_proceed: string;
  email?: any;
  handleChange?: any;
  handleClick?: any;
  value?: any;
  formErrors?: any;
  handleSignInActionFunction: () => void;
};

export default function VerifyCodeLogoTitleBlockFieldAndActionBlock({
  commonWidthHeight,
  enter_your_code,
  have_an_account,
  sign_in,
  verify_and_proceed,
  email,
  handleChange,
  handleClick,
  value,
  formErrors,
  handleSignInActionFunction,
}: VerifyCodeLogoTitleBlockFieldAndActionBlockProps) {
  return (
    <>
      <StyledStack>
        <Typography variant='fields' sx={{ color: defaultStyle.sidebarDropdownTextColor }} marginTop='24px' width='100%'>
          {email}
        </Typography>
        <StyledStack sx={{ gap: '28px', marginTop: '16px' }}>
          <CustomTextField
            variant='primary'
            className='auth-screen'
            placeholder={enter_your_code}
            value={value}
            name='otp'
            handleChange={handleChange}
            error={formErrors?.otp ? true : false}
            helperText={formErrors?.otp ? formErrors.otp : undefined}
            sx={{
              ...commonWidthHeight,
            }}
          />
          <CustomButton
            type='submit'
            variant='defaultPrimary'
            handleClick={handleClick}
            sx={{
              ...commonWidthHeight,
            }}>
            <Typography variant='title4'>{verify_and_proceed}</Typography>
          </CustomButton>
        </StyledStack>
      </StyledStack>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'baseline',
          position: 'absolute',
          bottom: '3%',
        }}>
        <Typography variant='title4' color={defaultStyle.sidebarAndAuthScreenTextColor}>
          {have_an_account}
        </Typography>{' '}
        <CustomLink location='/login'>
          <Typography
            variant='title4'
            color={process.env.NEXT_PUBLIC_AUTH_SCREEN_LINK_COLOR || defaultStyle.authScreenButtonColor}
            fontWeight={600}
            onClick={handleSignInActionFunction}>
            {sign_in}
          </Typography>
        </CustomLink>
      </Box>
    </>
  );
}
