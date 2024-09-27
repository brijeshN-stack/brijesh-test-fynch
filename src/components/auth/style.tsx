import Link from 'next/link';
import { Box, Stack, styled } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';

export const StyledMainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
});

export const StyledFormContainer = styled(Stack)(({ theme }: any) => ({
  justifyContent: 'center',
  alignItems: 'center',
  gap: '15px',
  [theme.breakpoints.down('md')]: {
    marginTop: '60px',
  },
  [theme.breakpoints.up('md')]: {
    marginTop: '104px',
  },
}));

export const StyledLink = styled(Link)(({}) => ({
  display: 'inline-flex',
  justifyContent: 'flex-end',
  width: '100%',
  maxWidth: '370px',
  color: defaultStyle.secondaryColor,
  opacity: '60%',
  marginTop: '4px',
}));

export const StyledStack = styled(Stack)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
}));
