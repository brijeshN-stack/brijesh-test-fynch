import React, { useState } from 'react';
import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import MenuIcon from '@/assets/menuIcon';
import CancelIcon from '@/assets/cancelIcon';
import CustomButton from '@/components/button/CustomButton';
import { defaultStyle } from '@/config/colorConfig';
import ArrowBackIcon from '@/assets/profileIcon/ArrowBackIcon';
import EditIcon from '@/assets/profileIcon/EditIcon';
import { StyledButton } from '@/components/profile/Profile';
import ProfileDetails from '@/components/profile/ProfileDetails';
import ProfileImageClipPath from '@/components/profile/ProfileImageClipPath';
import TermsAndConditions from '@/components/profile/TermsAndConditions';
import Support from '@/components/profile/Support';
import DeleteIcon from '@/assets/deleteIcon';

interface ProfileForMobile {
  openDialog?: boolean;
  handleClose?: () => void;
  setSelectedOption?: any;
  selectedOption?: string;
  isMobile?: any;
  currentUser?: any;
  profileDetails?: any;
  handleFieldChange?: any;
  getProfileDetails?: any;
  handleProfileChange?: any;
  handleUpdate?: any;
  intl?: any;
  locale: string;
  termsAndConditonLinks?: any;
  supportLinks?: any;
  profileImage?: any;
  termsOfUseLinks?: any;
  contactLink?: any;
  handleLogout?: () => void;
  handleDeleteProfileImage?: () => void;
}

export default function ProfileForMobile({
  openDialog,
  handleClose,
  setSelectedOption,
  selectedOption,
  isMobile,
  currentUser,
  profileDetails,
  handleFieldChange,
  getProfileDetails,
  handleProfileChange,
  handleUpdate,
  intl,
  locale,
  termsAndConditonLinks,
  supportLinks,
  profileImage,
  termsOfUseLinks,
  contactLink,
  handleLogout,
  handleDeleteProfileImage,
}: ProfileForMobile) {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  const handleProfileMenuOpen = () => {
    setIsMenu(true);
  };
  const handleProfileMenuClose = () => {
    setIsMenu(false);
  };
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsMenu(false);
  };

  const commonButtonStyle = {
    width: '162px',
    height: '38px',
    borderRadius: '6px',
    boxShadow: '0px 7px 10px 0px #00000026 !important',
    margin: '30% auto 10px',
    // position: 'absolute',
    // bottom: '5%',
  };

  const renderMobileDeviceDialogAction = () => {
    return (
      <CustomButton variant='defaultSecondary' sx={{ ...commonButtonStyle }} handleClick={handleUpdate}>
        {intl?.formatMessage({ id: 'update' })}
      </CustomButton>
    );
  };

  const handleClickBack = () => {
    setSelectedOption('');
  };

  return (
    <>
      <Dialog
        open={openDialog ? openDialog : false}
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: '#FCFCFC',
            boxShadow: '0px 9px 20px 0px #00000017',
            width: '100%',
            height: '610px',
            borderRadius: '14px',
          },
        }}>
        <DialogContent
          sx={{
            display: 'flex',
            padding: '17px',
          }}>
          <Stack sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box onClick={handleProfileMenuOpen}>{!isMenu && <MenuIcon />}</Box>
              <Box onClick={handleClose}>{<CancelIcon />}</Box>
            </Box>
            <Stack
              sx={{
                height: '100%',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Stack gap={0.75} sx={{ alignItems: 'center', width: '100%' }}>
                {selectedOption !== '' && (
                  <Box
                    sx={{
                      display: 'flex',
                      cursor: 'pointer',
                      alignItems: 'center',
                      gap: 1,
                      padding: '0 15px',
                      width: '100%',
                    }}
                    onClick={handleClickBack}>
                    <ArrowBackIcon />
                    <Typography variant='title4' color='#C3C3C3'>
                      {intl?.formatMessage({ id: 'back' })}
                    </Typography>
                  </Box>
                )}
                {selectedOption === '' && (
                  <>
                    <Stack position='relative'>
                      {!profileImage ? (
                        <ProfileImageClipPath label={currentUser?.email?.charAt(0)} paddingLeft='20px' />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                        <ProfileImageClipPath imageUrl={profileImage} paddingLeft='20px' />
                      )}
                      <Box
                        component='label'
                        htmlFor='upload-photo'
                        sx={{
                          width: '34px',
                          height: '34px',
                          display: 'flex',
                          justifyContent: 'center',
                          background: defaultStyle.primaryColor,
                          alignItems: 'center',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          position: 'absolute',
                          right: '35%',
                          top: '66.5%',
                        }}
                        onChange={handleProfileChange}>
                        <EditIcon />
                        <input id='upload-photo' type='file' style={{ display: 'none' }} />
                      </Box>
                      <Box
                        sx={{
                          width: '34px',
                          height: '34px',
                          display: 'flex',
                          justifyContent: 'center',
                          background: defaultStyle.primaryColor,
                          alignItems: 'center',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          position: 'absolute',
                          right: '14%',
                          top: '66.5%',
                        }}
                        onClick={handleDeleteProfileImage}>
                        <DeleteIcon width='17' height='17' />
                      </Box>
                      <Typography variant='title2' textAlign={'center'}>
                        {getProfileDetails?.given_name}
                      </Typography>
                    </Stack>
                    <ProfileDetails
                      isMobile={isMobile}
                      handleClose={handleClose}
                      profileDetails={profileDetails}
                      handleFieldChange={(e: any) => handleFieldChange(e)}
                      getProfileDetails={getProfileDetails}
                    />
                    {renderMobileDeviceDialogAction()}
                  </>
                )}
                {selectedOption === 'Terms & Conditions' && (
                  <TermsAndConditions
                    locale={locale}
                    termsAndConditonLinks={termsAndConditonLinks}
                    termsOfUseLinks={termsOfUseLinks}
                    termsAndConditonLabel={intl?.formatMessage({ id: 't&c' })}
                    termsOfUse={intl?.formatMessage({ id: 'terms_of_use' })}
                    handleClose={handleClose}
                    isMobile={isMobile}
                  />
                )}
                {selectedOption === 'Support' && (
                  <Support
                    locale={locale}
                    supportLinks={supportLinks}
                    supportLabel={intl?.formatMessage({ id: 'faq' })}
                    contact={intl?.formatMessage({ id: 'contact' })}
                    contactLink={contactLink}
                    handleClose={handleClose}
                    isMobile={isMobile}
                    back={intl?.formatMessage({ id: 'back' })}
                    handleClickBack={() => setSelectedOption('')}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>

          {isMenu && (
            <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                background: defaultStyle.pageBackgroundColor,
                top: 0,
                left: 0,
                width: '100%',
                height: '140px',
                justifyContent: 'space-between',
              }}>
              <Stack
                sx={{
                  height: '140px',
                }}>
                <StyledButton onClick={() => handleOptionClick('Terms & Conditions')}>
                  <Typography variant='sidebarTitle'>{intl?.formatMessage({ id: 't&c' })}</Typography>
                </StyledButton>
                <StyledButton onClick={() => handleOptionClick('Support')}>
                  <Typography variant='sidebarTitle'>{intl?.formatMessage({ id: 'support' })}</Typography>
                </StyledButton>
                <StyledButton onClick={handleLogout}>
                  <Typography variant='sidebarTitle'>{intl?.formatMessage({ id: 'logout' })}</Typography>
                </StyledButton>
              </Stack>
              <span onClick={handleProfileMenuClose} style={{ padding: '17px 17px 0 0' }}>
                <CancelIcon />
              </span>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
