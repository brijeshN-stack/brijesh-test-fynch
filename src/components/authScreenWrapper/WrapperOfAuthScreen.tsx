'use client';

import React from 'react';
import { Box, Card, styled } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
// import loginScreenBgImage from '@/assets/loginScreenBgImage.png';
import { loginScreenBgImage } from '@/utils/constants';

type WrapperOfAuthScreenProps = {
  children: any;
};

// [loginscreenbgimagepath] The browser warning prevents us from using camelcase because we are providing props in a mui-styled component.
export default function WrapperOfAuthScreen({ children }: WrapperOfAuthScreenProps) {
  return (
    <Box>
      <StyledAuthScreenWrapper>
        <StyledCard>{children}</StyledCard>
      </StyledAuthScreenWrapper>
    </Box>
  );
}

const StyledAuthScreenWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundImage: `url(${loginScreenBgImage})`,
  // backgroundImage: `url(${loginScreenBgImagePath.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('sm')]: {
    height: '100vh',
  },
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  },
}));

const StyledCard = styled(Card)(({ theme }: any) => ({
  display: 'flex',
  justifyContent: 'center',
  background: defaultStyle.cardBackground,
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  [theme.breakpoints.up('md')]: {
    width: '500px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '587px',
  },
  height: '100%',
  borderTopLeftRadius: '22px',
  borderBottomLeftRadius: '22px',
  border: '0.2px solid #f5f4f430',
  position: 'relative',
  backdropFilter: 'blur(6px)',
  overflowY: 'auto',
  borderImageSource: 'linear-gradient(180deg, #EBEBEB 0%, rgba(0, 0, 0, 0) 100%)',
  '&::-webkit-scrollbar': {
    width: '2px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    border: '4px solid #E1E1E1',
    borderRadius: '10px',
  },
}));
