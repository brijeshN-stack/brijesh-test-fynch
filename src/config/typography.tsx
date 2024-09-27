import { pxToRem, responsiveFontSizes } from '@/utils/helpers';
import { defaultStyle } from '@/config/colorConfig';

const PrimaryFont = 'HK Grotesk';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heading: true;
    subHeading: true;
    subHeading2: true;
    unitsNumber: true;
    title: true;
    sidebarTitle: true;
    title2: true;
    title3: true;
    title4: true;
    addressHeading: true;
    dropdown: true;
    fields: true;
    headerTitle: true;
    selectDatelabel: true;
  }
}

const typography = {
  fontFamily: PrimaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  lineHeight: '20px',
  heading: {
    fontSize: pxToRem(40),
    fontWeight: 700,
    textAlign: 'left',
    ...responsiveFontSizes({ xs: 18, sm: 32, md: 32, lg: 32 }),
    '@media (min-width: 1400px)': {
      fontSize: 40,
    },
  },
  selectDatelabel: {
    fontSize: pxToRem(36),
    fontWeight: 800,
    ...responsiveFontSizes({ xs: 28, sm: 28, md: 36, lg: 36 }),
  },
  subHeading: {
    fontSize: pxToRem(16),
    fontWeight: 600,
    // ...responsiveFontSizes({ sm: 20, md: 24, lg: 28 }),
  },
  subHeading2: {
    fontSize: pxToRem(20),
    fontWeight: 700,
    lineHeight: '20px',
    // ...responsiveFontSizes({ sm: 24, md: 28, lg: 32 }),
  },
  unitsNumber: {
    fontSize: pxToRem(40),
    fontWeight: 600,
    ...responsiveFontSizes({ xs: 24, sm: 52, md: 58, lg: 64 }),
  },
  title: {
    fontSize: pxToRem(32),
    fontWeight: 500,
    textAlign: 'left',
    color: defaultStyle.secondaryColor,
    // ...responsiveFontSizes({ xs: 32, sm: 40, md: 48, lg: 56 }),
  },
  sidebarTitle: {
    fontSize: pxToRem(16),
    fontWeight: 500,
    // ...responsiveFontSizes({ sm: 20, md: 24, lg: 28 }),
  },
  title2: {
    fontSize: pxToRem(16),
    fontWeight: 600,
    // ...responsiveFontSizes({ sm: 20, md: 24, lg: 28 }),
  },
  title3: {
    fontSize: pxToRem(14),
    fontWeight: 500,
    // lineHeight: '20px',
    ...responsiveFontSizes({ xs: 10, sm: 14, md: 14, lg: 14 }),
  },
  title4: {
    fontSize: pxToRem(12),
    fontWeight: 400,
    lineHeight: '20px',
    // ...responsiveFontSizes({ sm: 14, md: 16, lg: 20 }),
  },
  dropdown: {
    fontSize: pxToRem(16),
    fontWeight: 400,
    ...responsiveFontSizes({ xs: 14, sm: 18, md: 20, lg: 24 }),
  },
  fields: {
    fontSize: pxToRem(14),
    fontWeight: 400,
    color: '#CCCACA !important',
    // ...responsiveFontSizes({ xs: 12, sm: 16, md: 18, lg: 20 }),
  },
  addressHeading: {
    fontSize: pxToRem(20),
    fontWeight: 800,
    ...responsiveFontSizes({ xs: 14, sm: 18, md: 20, lg: 20 }),
  },
  headerTitle: {
    fontSize: pxToRem(24),
    fontWeight: 600,
    // ...responsiveFontSizes({ xs: 12, sm: 16, md: 18, lg: 20 }),
    '@media (min-width: 1400px)': {
      fontSize: 24,
    },
    color: defaultStyle.primaryColor,
  },
};

export default typography;
