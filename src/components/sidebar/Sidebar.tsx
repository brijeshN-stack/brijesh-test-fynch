'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
// import fynchLogo from '@/assets/fynchLogo.svg';
import MyTripIcon from '@/assets/sidebarIcons/MyTripIcon';
import MyVehicles from '@/assets/sidebarIcons/MyVehiclesIcon';
import MenuIcon from '@/assets/menuIcon';
// import menuBgImage from '@/assets/sidebarMenuBgImage.png';
import { lastPathOfUrl, sidebarBgImage } from '@/utils/constants';
import { en, EN, LOCALE, nl, NL, SUBSCRIPTION_DETAILS } from '@/utils/constants';
import { useAppSelector } from '@/redux/hooks';
import { dispatch, RootState } from '@/redux/store';
import { profile, subscription } from '@/redux/slices/profileSlice';
import { sagaActions } from '@/redux/actions';
import { selectIsLoading } from '@/redux/slices/pageLoader';
import { useTranslate } from '@/hooks/useTranslate';
import Profile from '@/components/profile/Profile';
import SelectDropdown from '@/components/selectDropdownWithIcons/SelectDropdown';
import CircularLoader from '@/components/circularLoader/CircularLoader';
import { saveLocaleToCookies } from '@/app/actions';
import ProductLogo from '../sharedUi/ProductLogo';
import MyAddressIcon from '@/assets/sidebarIcons/MyAddressIcon';
import LanguageIcon from '@/assets/sidebarIcons';
import { defaultStyle } from '@/config/colorConfig';
import { destructurePathValues, generateAdditionalPath } from '@/utils/helpers';

const drawerWidth = 264;

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [additionalUrlPath, setAdditionalUrlPath] = useState<any>({
    wpm: undefined,
    month: undefined,
    year: undefined,
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const { getwpmValue, getYearValue, getMonthValue } = destructurePathValues(searchParams);
    if (getwpmValue && getMonthValue && getYearValue) {
      setAdditionalUrlPath({
        wpm: 'wpm',
        month: getMonthValue,
        year: getYearValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [licenseDataFromLocal, setLicensetDataFromLocal] = useState();
  const theme = useTheme();
  const color = theme?.palette?.custom?.sidebarColors?.color;

  const [locale, setLocale] = useState<any>('');
  const intl = useTranslate(locale);
  // const additionalPath = `${additionalUrlPath.wpm ? `?wpm` : ''}${additionalUrlPath.month ? `&month=${additionalUrlPath.month}` : ''}${additionalUrlPath.year ? `&year=${additionalUrlPath.year}` : ''}`;
  const additionalPath = generateAdditionalPath(additionalUrlPath);

  const sidebarItems = [
    {
      id: 1,
      label: intl?.formatMessage({ id: 'my_trips' }),
      icon: <MyTripIcon fill={defaultStyle.sidebarAndAuthScreenTextColor} />,
      baseRoute: `/${locale}/dashboard`,
      route: `/${locale}/dashboard${additionalPath}`,
    },
    {
      id: 2,
      label: intl?.formatMessage({ id: 'my_vehicles' }),
      icon: <MyVehicles fill={defaultStyle.sidebarAndAuthScreenTextColor} />,
      baseRoute: `/${locale}/dashboard/my-vehicles`,
      route: `/${locale}/dashboard/my-vehicles${additionalPath}`,
    },
    {
      id: 3,
      label: intl?.formatMessage({ id: 'my_address' }),
      icon: <MyAddressIcon fill={defaultStyle.sidebarAndAuthScreenTextColor} />,
      baseRoute: `/${locale}/dashboard/my-address`,
      route: `/${locale}/dashboard/my-address${additionalPath}`,
    },

    // this screen will use after discussion
    // { id: 3, label: "My Expenses", icon: <MyExpense />, route: "/dashboard/my-expense" },
  ];

  useEffect(() => {
    dispatch({ type: sagaActions.GET_PROFILE_DETAILS });
    const getSubscriptionDataFromLocal = JSON.parse(localStorage.getItem(SUBSCRIPTION_DETAILS) || '{}');
    if (!getSubscriptionDataFromLocal.hasOwnProperty('license')) {
      dispatch({ type: sagaActions.GET_SUBSCRIPTION_DETAILS });
    }
    if (getSubscriptionDataFromLocal) {
      setLicensetDataFromLocal(getSubscriptionDataFromLocal);
    }
  }, []);

  useEffect(() => {
    const getLocale: any = localStorage.getItem(LOCALE);
    setLocale(getLocale);
  }, [locale]);

  const getProfileDetails: any = useAppSelector((state: RootState) => profile(state));
  const getSubscriptionDetails: any = useAppSelector((state: RootState) => subscription(state));
  const subscriptionDetails = getSubscriptionDetails || licenseDataFromLocal;

  const isLoading: any = useAppSelector((state: RootState) => selectIsLoading(state));

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const selectValue = [
    {
      value: en,
      name: EN,
      icon: <LanguageIcon fill={color} />,
    },
    {
      value: nl,
      name: NL,
      icon: <LanguageIcon fill={color} />,
    },
  ];

  const handleChange = (e: any) => {
    const newLocale = e.target.value;
    localStorage.removeItem(LOCALE);
    localStorage.setItem(LOCALE, newLocale);
    saveLocaleToCookies(newLocale);
    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    router.push(newPathname + additionalPath);
  };

  const drawer = (
    <>
      <Box sx={{ marginTop: '50px' }}>
        <Typography variant='headerTitle' fontWeight={500} sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }} lineHeight={'20px'}>
          Fynch {additionalUrlPath.wpm ? 'WPM' : ''}
        </Typography>
      </Box>
      <SidebarProfileNameWrapper>
        {subscriptionDetails?.license?.logo_url ? (
          <SidebarAvtar
            variant='square'
            alt=''
            src={subscriptionDetails?.license?.logo_url}
            slotProps={{
              img: {
                sx: {
                  objectFit: 'unset',
                },
              },
            }}
          />
        ) : (
          <Box sx={{ height: '29.13px' }} />
        )}
        <Typography fontSize={'16px'} fontWeight={500} sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }} lineHeight={'20px'}>
          {subscriptionDetails && subscriptionDetails.license && subscriptionDetails.license.name
            ? subscriptionDetails?.license?.name
            : intl?.formatMessage({ id: 'default_employer_name' })}
        </Typography>
        <StyledList>
          {sidebarItems.map((item, index) => (
            <Fragment key={index}>
              <StyledListItem
                key={item.id}
                disablePadding
                selected={item.route === pathname}
                onClick={() => {
                  router.push(item.route);
                  handleDrawerClose();
                }}
                sx={{
                  background: `${item.baseRoute === pathname ? '#A5ABC730 !important' : 'transparent !important'}`,
                  borderRadius: `${item.baseRoute === pathname ? '7px' : 0}`,
                }}>
                <StyledListItemButton>
                  <ListItemText sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }} primary={item.label} />
                  <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                </StyledListItemButton>
              </StyledListItem>
              {index !== sidebarItems.length - 1 && <StyledDivider variant='middle' />}
            </Fragment>
          ))}
        </StyledList>
      </SidebarProfileNameWrapper>
      <Stack sx={{ marginTop: '137px', gap: '85px', alignItems: 'center', justifyContent: 'flex-end', height: 'inherit' }}>
        {/* <Image src={fynchLogo} alt='Fynch Logo' priority /> */}
        <ProductLogo />
        <Box
          sx={{
            // position: 'absolute', bottom: '9.5%'
            marginBottom: '79px',
          }}>
          <SelectDropdown
            className='sidebar-dropdown'
            width='110px'
            height='29px'
            borderRadius='4px'
            selectValue={selectValue}
            selectedValue={locale}
            handleChange={handleChange}
            iconMinWidth='25px !important'
            marginLeft='5px'
            padding='0px !important'
            filter='none'
            label={intl?.formatMessage({ id: 'select_language' })}
            color={color}
          />
        </Box>
      </Stack>
    </>
  );

  const commonStyle = {
    // backgroundImage: `url(${menuBgImage.src})`,
    backgroundImage: `url(${sidebarBgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
  };

  return (
    <StyledLayoutWrapper>
      <CssBaseline />
      <StyledAppBar>
        {/* <Toolbar
          sx={{
            minHeight: '55px !important',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '33px !important',
            paddingRight: { sm: '50px !important', xs: '23px !important' },
          }}>
          <Box display={'flex'}>
            <StyledMenuIconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle}>
              <MenuIcon />
            </StyledMenuIconButton>
            <Typography variant='heading' noWrap component='div' color={'#0E163B'} padding={1.25}>
              {`${intl?.formatMessage({ id: 'welcome_business_name' })} ${getProfileDetails && getProfileDetails.given_name} ${getProfileDetails && getProfileDetails.family_name}`}
            </Typography>
          </Box>
          <Profile />
        </Toolbar> */}
      </StyledAppBar>
      <Box
        component='nav'
        sx={{
          width: { sm: drawerWidth },
          '@media (min-width: 1400px)': {
            width: '295px',
          },
          flexShrink: { sm: 0 },
          display: { lg: 'block', sm: 'none' },
        }}
        aria-label='mailbox folders'>
        <StyledDrawer
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: {
              ...commonStyle,
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
          }}>
          {drawer}
        </StyledDrawer>
        <StyledDrawer
          variant='permanent'
          PaperProps={{
            sx: {
              ...commonStyle,
            },
          }}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
          open>
          {drawer}
        </StyledDrawer>
      </Box>
      <Box
        sx={{
          position: 'relative',
        }}>
        {isLoading && <CircularLoader />}
        <RightSideContainer component='main'>
          {/* <Toolbar
            sx={{
              minHeight: '55px !important',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: '33px !important',
              paddingRight: { sm: '50px !important', xs: '23px !important' },
            }}
          /> */}
          <Toolbar
            sx={{
              height: '55px !important',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '29px',
              paddingLeft: '33px !important',
              paddingRight: { sm: '50px !important', xs: '23px !important' },
              display: 'flex',
            }}>
            <Box display={'flex'}>
              <StyledMenuIconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle}>
                <MenuIcon />
              </StyledMenuIconButton>
              <Typography variant='heading' noWrap component='div' color={defaultStyle.primaryColor} padding={1.25}>
                {intl?.formatMessage({ id: 'welcome_business_name' })} {getProfileDetails?.given_name}
                {/* {getProfileDetails?.family_name} */}
              </Typography>
            </Box>
            <Profile />
          </Toolbar>
          {children}
        </RightSideContainer>
      </Box>
    </StyledLayoutWrapper>
  );
}

// Styled Components
export const SidebarContainer = styled(Stack)(({ theme }: any) => ({
  height: '100vh',
  [theme.breakpoints.up('lg')]: {
    width: '295px',
  },
  background: '#0E163B',
  boxShadow: '9px 0px 15px 0px #00000026',
  border: '0.2 px solid',
  color: '#E2E2E2',
  justifyContent: 'space-evenly',
  alignItems: 'center',
}));

const StyledList = styled(List)({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '63px',
});

const StyledListItem = styled(ListItem)(() => ({
  height: '41px',
}));

export const StyledListItemButton = styled(ListItemButton)(() => ({
  width: '235px',
  '@media (min-width: 1400px)': {
    width: '262px',
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)(() => ({
  minWidth: 0,
}));

export const StyledDivider = styled(Divider)(() => ({
  borderBottomWidth: '0.5px',
  borderColor: defaultStyle.sidebarDeviderColor,
}));

export const StyledDrawer = styled(Drawer)(({ theme }: any) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
    '@media (min-width: 1400px)': {
      width: '295px',
    },
    borderTopRightRadius: '22px !important',
    borderBottomRightRadius: '22px !important',
    [theme.breakpoints.down('sm')]: {
      height: `100%`,
    },
    boxShadow: '9px 0px 15px 0px #00000026',
    border: '0.2 px solid',
    color: '#E2E2E2',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

export const RightSideContainer = styled(Box)(({ theme }: any) => ({
  [theme.breakpoints.up('lg')]: {
    width: `calc(100vw - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down('lg')]: {
    width: `100vw`,
  },
  [theme.breakpoints.down('sm')]: {
    width: `100%`,
    height: `calc(100vh - 115px)`,
  },
  height: 'calc(100vh - 30px)',

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

export const StyledAppBar = styled(AppBar)(({ theme }: any) => ({
  position: 'fixed',
  background: 'transparent !important',
  boxShadow: 'none',
  marginTop: '29px',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  },
  '@media (min-width: 1400px)': {
    width: `calc(100% - 295px)`,
    marginLeft: `295px`,
  },
}));

export const StyledMenuIconButton = styled(IconButton)(({ theme }: any) => ({
  marginRight: '0',
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const StyledLayoutWrapper = styled(Box)(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  background: '#EEECEC',
  height: '100vh',
  // [theme.breakpoints.down('sm')]: {
  //   height: `calc(100vh - 115px)`,
  // },
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
  overflow: 'hidden',
}));

export const SidebarProfileNameWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '5px',
  marginTop: '92px',
});

export const SidebarAvtar = styled(Avatar)({
  width: '60%',
  height: 'auto',
});
