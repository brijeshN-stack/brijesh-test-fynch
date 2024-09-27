import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import CancelIcon from '@/assets/cancelIcon';
import ArrowBackIcon from '@/assets/profileIcon/ArrowBackIcon';
import { nl } from '@/utils/constants';

type SupportProps = {
  locale: string;
  supportLinks: any;
  supportLabel?: string;
  handleClose?: () => void;
  isMobile?: boolean;
  back?: string;
  handleClickBack?: () => void;
  contact?: string;
  contactLink?: any;
};

export default function Support({
  locale,
  supportLinks,
  supportLabel,
  handleClose,
  isMobile,
  back,
  handleClickBack,
  contact,
  contactLink,
}: SupportProps) {
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
          href={locale === nl ? supportLinks.nl : supportLinks.en || ''}
          style={{
            textDecoration: 'underline',
            color: defaultStyle.primaryColor,
          }}
          target={supportLinks.nl || supportLinks.en ? '_blank' : ''}>
          {supportLabel}
        </Link>
        <br />
        <Link
          href={contactLink}
          style={{
            textDecoration: 'underline',
            color: defaultStyle.primaryColor,
          }}
          target='_blank'>
          {contact}
        </Link>
      </Box>
    </Stack>
  );
}
