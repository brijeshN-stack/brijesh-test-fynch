import { Fragment } from 'react';
import { Box, styled, Typography, useTheme } from '@mui/material';
import FootPrintIcon from '@/assets/footprintIcon';
import BicycleIcon from '@/assets/bicycleIcon';
import OfficeBagIcon from '@/assets/officeBagIcon';
import WorkFromHomeIcon from '@/assets/workFromHomeIcon';
import WorkFromOfficeIcon from '@/assets/workFromOfficeIcon';
import DoubleFootprintIcon from '@/assets/doubleFootprintIcon';
import { CardHeader, StatisticsWrapper } from '../StyledComponents/styledComponents';
import ArrowForwardIcon from '@/assets/arrowIcon/ArrowForwardIcon';
import CustomButton from '../button/CustomButton';
import { defaultStyle } from '@/config/colorConfig';

type StatisticsProps = {
  heading: string;
  co2_footprints: string;
  total_co2_footprints: string;
  bicycle_km: string;
  business_trip: string;
  work_from_home: string;
  work_from_office: string;
  gm_km: string;
  kg: string;
  handleSubmitExpense: any;
  handleMouseEnter: any;
  handleMouseLeave: any;
  submit_expense: string;
  submitExpenseVisibility: boolean;
};

export default function Statistics({
  heading,
  co2_footprints,
  total_co2_footprints,
  bicycle_km,
  business_trip,
  work_from_home,
  work_from_office,
  gm_km,
  kg,
  handleSubmitExpense,
  handleMouseEnter,
  handleMouseLeave,
  submit_expense,
  submitExpenseVisibility,
}: StatisticsProps) {
  const theme = useTheme();
  const widgetBackgroundColor = theme?.palette?.custom?.statisticsVariant?.widgetBackgroundColor;
  const textColor = theme?.palette?.custom?.statisticsVariant?.textColor;
  const borderRadius = theme.palette.custom?.statisticsVariant?.borderRadius;
  const svgInnerColor = theme.palette.custom?.statisticsVariant?.svgInnerColor;

  const statisticsData = [
    {
      icon: <FootPrintIcon fill={svgInnerColor} />,
      content: co2_footprints,
      count: 10,
      measuresIn: gm_km,
    },
    {
      icon: <DoubleFootprintIcon fill={svgInnerColor} />,
      content: total_co2_footprints,
      count: 10,
      measuresIn: kg,
    },
    {
      icon: <BicycleIcon fill={svgInnerColor} />,
      content: bicycle_km,
      count: 60,
      measuresIn: '',
    },

    {
      icon: <OfficeBagIcon fill={svgInnerColor} />,
      content: business_trip,
      count: 5,
      measuresIn: '',
    },
    {
      icon: <WorkFromHomeIcon fill={svgInnerColor} height='17.47px' width='18.99px' />,
      content: work_from_home,
      count: 7,
      measuresIn: '',
    },
    {
      icon: <WorkFromOfficeIcon fill={svgInnerColor} height='20.24px' width='15.85px' />,
      content: work_from_office,
      count: 5,
      measuresIn: '',
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '67px',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Box
            sx={{
              background: widgetBackgroundColor,
              maxWidth: '545px',
              width: '100%',
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: submitExpenseVisibility ? borderRadius : 0,
              display: 'flex',
              alignItems: 'center',
              visibility: 'hidden', // remove when you need to show statistics
            }}>
            <CardHeader marginLeft='21px' color={textColor}>
              {heading}
            </CardHeader>
          </Box>
          <Box
            sx={{
              height: '67px',
              maxWidth: '503px',
              width: '100%',
              // backgroundColor: widgetBackgroundColor,
              backgroundColor: 'transparent',
              borderTopRightRadius: submitExpenseVisibility ? 0 : borderRadius,
            }}>
            {submitExpenseVisibility && (
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  maxWidth: '503px',
                  backgroundColor: defaultStyle.pageBackgroundColor,
                  display: 'flex',
                  justifyContent: 'end',
                  borderBottomLeftRadius: borderRadius,
                  paddingLeft: '17px',
                }}>
                <CustomButton
                  variant='submitExpense'
                  sx={{
                    height: '49px',
                    justifyContent: 'space-between',
                    padding: '0 23px',
                    maxWidth: '485px',
                    width: '100%',
                    '.MuiTypography-root': {
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: '20px',
                    },
                  }}
                  handleClick={handleSubmitExpense}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  showEndIcon={<ArrowForwardIcon />}>
                  <Typography variant='subHeading'> {submit_expense}</Typography>
                </CustomButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <StatisticsWrapper
        sx={{
          visibility: 'hidden', // remove when you need to show statistics
        }}
        showborderradius={submitExpenseVisibility}>
        <DataContainer>
          {statisticsData.map((item, index) => (
            <Fragment key={index}>
              <DataWrapper>
                <IconAndCountContainer>
                  <IconWrapper>{item.icon}</IconWrapper>
                  <CountWrapper>
                    <CountTypography>{item.count}</CountTypography>
                    <MeasuresInTypography>{item.measuresIn}</MeasuresInTypography>
                  </CountWrapper>
                </IconAndCountContainer>
                <ContentTypographyWrapper>{item.content}</ContentTypographyWrapper>
              </DataWrapper>
            </Fragment>
          ))}
        </DataContainer>
      </StatisticsWrapper>
    </>
  );
}

const DataWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
const DataContainer = styled(Box)(({ theme }: any) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
  },
}));
const IconAndCountContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  '@media (min-width: 1400px)': {
    gap: '10px',
  },
}));

const IconWrapper = styled(Box)(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: theme.palette.custom?.statisticsVariant?.svgBackground,
}));

const ContentTypographyWrapper = styled(Typography)(({ theme }: any) => ({
  fontSize: '12px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '9px',
    width: '46px',
  },
  // width: '59px',
  fontWeight: 400,
  wordWrap: 'break-word',
  // color: defaultStyle.primaryColor,
  color: theme.palette.custom?.statisticsVariant?.textColor,
}));

const CountWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'baseline',
}));

const CountTypography = styled(Typography)(({ theme }: any) => ({
  minWidth: '40px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '23px',
    minWidth: '0',
  },
  display: 'flex',
  justifyContent: 'center',
  fontSize: '32px',
  fontWeight: 600,
  color: theme.palette.custom?.statisticsVariant?.textColor,
  // color: defaultStyle.primaryColor,
}));

const MeasuresInTypography = styled(Typography)(({ theme }: any) => ({
  fontSize: '12px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '9px',
  },
  fontWeight: 400,
  color: theme.palette.custom?.statisticsVariant?.textColor,
  // color: defaultStyle.primaryColor,
}));
