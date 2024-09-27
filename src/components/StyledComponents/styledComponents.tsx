'use client';

import { styled } from '@mui/material/styles';
import { Box, Card, Dialog, Stack, Typography } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';

export const maxWidth = '545px';

export const CalendarWrapper = styled(Box)(({ theme }: any) => ({
  width: '100%',
  // minHeight: "422px",
  // height: "422px",
  // backgroundColor: defaultStyle.primaryColor,
  // borderRadius: "25px",
  // boxShadow: "rgba(0, 0, 0, 0.09)",
  // boxSizing: "border-box",
  display: 'flex',
  flexDirection: 'column',
}));

export const CalendarContainer = styled(Card)(({ theme }: any) => ({
  maxWidth: '545px',
  width: '100%',
  padding: '0 28px',
  height: '480px',
  boxShadow: 'rgba(0, 0, 0, 0.09)',
  // boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}));

export const StyledDialog = styled(Dialog)(() => ({
  '.MuiDialog-paper': {
    borderRadius: '13px',
  },
}));

export const CardHeader = styled(Typography)(({ color, fontWeight }: any) => ({
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: fontWeight || '600',
  color: color,
}));

export const TypographyWrapper = styled(Box)(({ marginLeft }: any) => ({
  height: '70px',
  alignContent: 'center',
}));

export const CalendarTripAddSuggestionTypography = styled(Typography)(({ color, theme }: any) => ({
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '400',
  color: color,
  [theme.breakpoints.down('sm')]: {
    fontSize: '11px',
  },
}));

export const CalendarButtonWrapper = styled(Box)(() => ({
  width: '100%',
  marginTop: '18px',
  gap: '9px',
  display: 'flex',
}));

export const CalendarDateIconWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
interface StatisticsWrapperProps {
  showborderradius: boolean;
}
export const StatisticsWrapper = styled(Card)<StatisticsWrapperProps>(({ showborderradius, theme }) => ({
  padding: '0px  31px ',
  boxShadow: '0px 9px 20px 0px rgba(0, 0, 0, 0.09)  !important',
  width: '100%',
  height: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: theme.palette.custom?.statisticsVariant?.widgetBackgroundColor,
  // borderRadius: '15px',
  borderTopRightRadius: showborderradius ? theme.palette.custom?.statisticsVariant?.borderRadius : '0px',
  borderBottomRightRadius: theme.palette.custom?.statisticsVariant?.borderRadius,
  borderBottomLeftRadius: theme.palette.custom?.statisticsVariant?.borderRadius,
  borderTopLeftRadius: '0px',
  color: defaultStyle.primaryColor,
  borderColor: 'transparent',
  borderWidth: '0px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '162px',
    padding: '0px 15px ',
  },
}));

export const MyAddressWrapper = styled(Card)(({ theme }: any) => ({
  maxWidth: '547px',
  width: '100%',
  borderRadius: '25px',
  padding: '24px 27px',
  backgroundColor: defaultStyle.secondaryColor,
  boxShadow: '0px 9px 20px 0px rgba(0, 0, 0, 0.09)',
}));

export const AddTripWrapper = styled(Box)(({ theme }: any) => ({
  padding: '18px 5px',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    padding: '11px 24px 21px',
    height: '100%',
  },
}));

export const AddTripContainer = styled(Box)(({ theme }: any) => ({
  maxWidth: '485px',
  width: '100%',
  // maxHeight: '198px',
  height: '480px',
  padding: ' 24px 27px',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: defaultStyle.secondaryColor,
  boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.09)  !important',
  borderRadius: '15px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '545px',
    width: '100%',
  },
}));

export const HeaderTypography = styled(Typography)(({ theme }: any) => ({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  color: defaultStyle.primaryColor,
  [theme.breakpoints.down('sm')]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textWrap: 'nowrap',
    maxWidth: '50px',
  },
}));
export const DialogHeaderTypography = styled(Typography)(({ theme }: any) => ({
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '20px',
  color: defaultStyle.primaryColor,
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
}));
export const FieldsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  columnGap: '10px',
  rowGap: '13px',
  marginTop: '16px',
}));
export const DownloadLogoWrapper = styled(Stack)(() => ({
  width: '117px',
  height: '108px',
  borderRadius: '12px',
  boxShadow: '0px 9px 20px 0px #00000017',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}));

export const MainLayoutWrapper = styled(Box)(() => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  maxWidth: '1440px',
  justifyContent: 'center',
}));

export const StyledFootPrintIcon = styled('svg')(({ theme }: any) => ({
  [theme.breakpoints.down('sm')]: {
    width: '12px',
  },
}));

export const StyledDoubleFootprintIcon = styled('svg')(({ theme }: any) => ({
  [theme.breakpoints.down('sm')]: {
    width: '8px',
  },
}));

export const StyledBicycleIcon = styled('svg')(({ theme }: any) => ({
  [theme.breakpoints.down('sm')]: {
    width: '24px',
  },
}));

export const StyledOfficeBagIcon = styled('svg')(({ theme }: any) => ({
  [theme.breakpoints.down('sm')]: {
    width: '20px',
  },
}));

export const StyledWorkFromHomeIcon = styled('svg')(({ theme }: any) => ({
  [theme.breakpoints.down('sm')]: {
    width: '18px',
  },
}));

export const StyledWorkFromOfficeIcon = styled('svg')(({ theme }: any) => ({
  [theme.breakpoints.down('sm')]: {
    width: '18px',
  },
}));
export const AddressLabelTypographyWrapper = styled(Box)(() => ({
  height: '35px',
  display: 'flex',
  alignItems: 'center',
}));
export const CarpoolLabelTypographyWrapper = styled(Box)(() => ({
  height: '31px',
  display: 'flex',
  alignItems: 'center',
  marginTop: '11px',
}));
