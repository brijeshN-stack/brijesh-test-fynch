import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import { StyledStack } from '@/components/auth/style';
import CustomButton from '@/components/button/CustomButton';
import { defaultStyle } from '@/config/colorConfig';
import CustomLink from '@/components/customLink/CustomLink';

type VerificationActionBlockProps = {
  handleResendEmail: () => void;
  handleContinueAction: () => void;
  intl: any;
  locale: string;
};

export default function VerificationActionBlock({ handleResendEmail, handleContinueAction, intl, locale }: VerificationActionBlockProps) {
  return (
    <>
      <StyledStack sx={{ gap: '15px', marginTop: '62px' }}>
        <CustomButton
          variant='defaultPrimary'
          sx={{
            width: { sm: '370px', xs: '300px' },
            height: '46px',
          }}
          handleClick={handleContinueAction}>
          <Typography variant='title3'>
            {/* {renderButtonLabel('verify_and_proceed', locale)} */}
            {intl?.formatMessage({ id: 'verify_and_proceed' })}
          </Typography>
        </CustomButton>
        <Typography
          variant='title4'
          sx={{ cursor: 'pointer', color: defaultStyle.sidebarAndAuthScreenTextColor }}
          onClick={handleResendEmail}>
          {intl?.formatMessage({ id: 'resend_email' })}
        </Typography>

        <Box
          sx={{
            display: 'inline-flex',
            position: 'absolute',
            bottom: '3%',
            alignItems: 'baseline',
          }}>
          <Typography variant='title4' color={defaultStyle.sidebarAndAuthScreenTextColor}>
            {intl?.formatMessage({ id: 'have_an_account' })}
          </Typography>{' '}
          <CustomLink location='/login'>
            <Typography
              variant='title4'
              color={process.env.NEXT_PUBLIC_AUTH_SCREEN_LINK_COLOR || defaultStyle.authScreenButtonColor}
              fontWeight={600}>
              {intl?.formatMessage({ id: 'sign_in' })}
            </Typography>
          </CustomLink>
        </Box>
      </StyledStack>
    </>
  );
}
