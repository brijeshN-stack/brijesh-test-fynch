import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { defaultStyle } from '@/config/colorConfig';
import CancelIcon from '@/assets/cancelIcon';
import ArrowBackIcon from '@/assets/profileIcon/ArrowBackIcon';
import { nl } from '@/utils/constants';

type TermsAndConditionsProps = {
  locale: string;
  termsAndConditonLinks: any;
  termsOfUseLinks?: any;
  termsAndConditonLabel?: string;
  termsOfUse?: string;
  handleClose?: () => void;
  isMobile?: boolean;
  back?: string;
  handleClickBack?: () => void;
};

export default function TermsAndConditions({
  locale,
  termsAndConditonLinks,
  termsOfUseLinks,
  termsAndConditonLabel,
  termsOfUse,
  handleClose,
  isMobile,
  back,
  handleClickBack,
}: TermsAndConditionsProps) {
  return (
    <Stack
      sx={{
        padding: { sm: '0', xs: '0 15px' },
        marginTop: '15px',
        flexDirection: { xs: 'row', sm: 'column' },
        justifyContent: { xs: 'flex-start' },
        width: { xs: '100%' },
      }}>
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 13px 0 15px',
          }}>
          <Box
            sx={{
              display: 'flex',
              cursor: 'pointer',
              alignItems: 'center',
              gap: 1,
            }}
            onClick={handleClickBack}>
            <ArrowBackIcon />
            <Typography variant='title4' color='#C3C3C3'>
              {back}
            </Typography>
          </Box>
          <span onClick={handleClose} style={{ cursor: 'pointer' }}>
            <CancelIcon />
          </span>
        </Box>
      )}
      <Box
        sx={{
          padding: { sm: '0 31px', xs: '0px' },
          marginTop: { sm: '15px', xs: '0px' },
        }}>
        <Link
          href={locale === nl ? termsAndConditonLinks.nl : termsAndConditonLinks.en || ''}
          style={{
            textDecoration: 'underline',
            color: defaultStyle.primaryColor,
          }}
          target={termsAndConditonLinks.nl || termsAndConditonLinks.en ? '_blank' : ''}>
          {termsAndConditonLabel}
        </Link>
        <br />
        <Link
          href={locale === nl ? termsOfUseLinks.nl : termsOfUseLinks.en || ''}
          style={{
            textDecoration: 'underline',
            color: defaultStyle.primaryColor,
          }}
          target={termsOfUseLinks.nl || termsOfUseLinks.en ? '_blank' : ''}>
          {termsOfUse}
        </Link>
      </Box>
    </Stack>
  );
}
