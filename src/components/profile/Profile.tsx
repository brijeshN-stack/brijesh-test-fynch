import React, { useEffect, useState } from 'react';
import { Avatar, Box, Dialog, DialogActions, DialogContent, IconButton, ListItemButton, Stack, styled, Typography } from '@mui/material';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { get, ref as dbRef } from 'firebase/database';
import { defaultStyle } from '@/config/colorConfig';
import CustomButton from '@/components/button/CustomButton';
import ProfileForMobile from '@/components/profile/mobile/ProfileForMobile';
import {
  getUserHomeAddress,
  getUserStationAddress,
  homeAddress,
  profile,
  profileDetailsValues,
  profileLoader,
  profileLoading,
  selectStationAddress,
} from '@/redux/slices/profileSlice';
import { dispatch, RootState } from '@/redux/store';
import { sagaActions } from '@/redux/actions';
import app, { db, storage } from '@/lib/firebase';
import { deleteAuthSessionSuccess, doLogout, selectIsSessionDeleted } from '@/redux/slices/authSlice';
import { handlePageLoading } from '@/redux/slices/pageLoader';
import { useAppSelector } from '@/redux/hooks';
import CircularLoader from '@/components/circularLoader/CircularLoader';
import { useTranslate } from '@/hooks/useTranslate';
import Logout from '@/assets/profileIcon/Logout';
import EditIcon from '@/assets/profileIcon/EditIcon';
import { triggerErrorMessage, triggerInfoMessage } from '@/utils/helpers';
import {
  defaultContactLink,
  defaultSupportLinks,
  defaultTermsAndConditionLinks,
  defaultTermsOfUseLinks,
  LOCALE,
  warningMessages,
} from '@/utils/constants';
import TermsAndConditions from '@/components/profile/TermsAndConditions';
import ProfileImageClipPath from '@/components/profile/ProfileImageClipPath';
import Support from '@/components/profile/Support';
import ProfileDetails from '@/components/profile/ProfileDetails';
import DeleteIcon from '@/assets/deleteIcon';

export default function Profile() {
  const termsAndConditonLinks = {
    en: process?.env.NEXT_PUBLIC_EN_TERMS_AND_CONDITION_LINK || defaultTermsAndConditionLinks.en,
    nl: process?.env?.NEXT_PUBLIC_NL_TERMS_AND_CONDITION_LINK || defaultTermsAndConditionLinks.nl,
  };
  const termsOfUseLinks = {
    en: process?.env?.NEXT_PUBLIC_EN_TERMS_OF_USE_LINK || defaultTermsOfUseLinks.en,
    nl: process?.env?.NEXT_PUBLIC_NL_TERMS_OF_USE_LINK || defaultTermsOfUseLinks.nl,
  };
  const supportLinks = {
    en: process?.env?.NEXT_PUBLIC_EN_SUPPORT_LINK || defaultSupportLinks.en,
    nl: process?.env?.NEXT_PUBLIC_NL_SUPPORT_LINK || defaultSupportLinks.nl,
  };
  const contactLink = `mailto:${process?.env?.NEXT_PUBLIC_CONTACT_LINK || defaultContactLink}`;

  const [locale, setLocale] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    const getLocale: any = localStorage.getItem(LOCALE);
    setLocale(getLocale);
  }, [locale]);

  const intl = useTranslate(locale);

  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userId = currentUser?.uid;
  const getProfileDetails: any = useAppSelector((state: RootState) => profile(state));
  const isDeleteSessionSuccess: any = useAppSelector((state: RootState) => selectIsSessionDeleted(state));

  const isProfileLoading = useAppSelector((state: RootState) => profileLoading(state));
  const [profileImage, setProfileImage] = useState<any>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [profileDetails, setProfileDetailsData] = useState<profileDetailsValues>({
    given_name: '',
    family_name: '',
    picture: null,
    language: '',
    retention_period: 0,
  });

  useEffect(() => {
    if (getProfileDetails) {
      setProfileDetailsData({
        ...profileDetails,
        given_name: getProfileDetails.given_name,
        family_name: getProfileDetails.family_name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProfileDetails]);

  useEffect(() => {
    if (isDeleteSessionSuccess) {
      dispatch(doLogout(true));
      dispatch(deleteAuthSessionSuccess(false));
      dispatch(getUserHomeAddress(null));
      dispatch(getUserStationAddress(null));
    }
  }, [isDeleteSessionSuccess]);

  const handleFieldChange = (e: any) => {
    const { name, value } = e.target;
    setProfileDetailsData({
      ...profileDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClickOpen = () => {
    setOpenDialog(true);
    dispatch({ type: sagaActions.GET_PROFILE_DETAILS });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedOption('');
    // setProfileDetailsData({
    //   given_name: '',
    //   family_name: '',
    //   picture: null,
    //   language: '',
    //   retention_period: 0,
    // });
  };

  const commonButtonStyle = {
    width: '162px',
    height: '38px',
    borderRadius: '6px',
    boxShadow: '0px 7px 10px 0px #00000026 !important',
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const renderDialogActionsButton = () => {
    return (
      <Stack sx={{ padding: '0 33px 25px' }}>
        <DialogActions sx={{ justifyContent: 'flex-end', padding: '0px' }}>
          <CustomButton handleClick={handleUpdate} variant='defaultSecondary' sx={{ ...commonButtonStyle }}>
            {/* {renderButtonLabel('update', locale)} */}
            {intl?.formatMessage({ id: 'update' })}
          </CustomButton>
        </DialogActions>
      </Stack>
    );
  };

  const handleUpdate = async () => {
    const profileDetailsData = {
      given_name: profileDetails.given_name,
      family_name: profileDetails.family_name,
      // language: 'nl_NL',
      retention_period: 0,
    };
    dispatch({ type: sagaActions.UPDATE_PROFILE, profileDetailsData });
  };

  const handleLogout = async () => {
    dispatch({ type: sagaActions.DELETE_AUTH_SESSION });
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!userId) {
        return;
      }
      if (userId) {
        dispatch(handlePageLoading(true));
        try {
          const storageRef = ref(storage, `ProfilePictures/${userId}/profile`);
          const downloadURL = await getDownloadURL(storageRef);
          setProfileImage(downloadURL);
        } catch (error: any) {
          const avoidErrorForThisCode = ['storage/object-not-found'];
          if (!avoidErrorForThisCode.includes(error?.code)) {
            triggerErrorMessage(null, error?.code);
          }
          dispatch(handlePageLoading(false));
        } finally {
          dispatch(handlePageLoading(false));
        }
      }
    };

    fetchProfileImage();
  }, [userId]);

  const handleProfileChange = async (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && !allowedFormats.includes(selectedFile.type)) {
      triggerInfoMessage(warningMessages.unsupported_file_format);
      return;
    }

    if (selectedFile) {
      dispatch(profileLoader(true));
      try {
        const storageRef = ref(storage, `ProfilePictures/${userId}/profile`);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setProfileImage(downloadURL);
        dispatch(profileLoader(false));
        const profileDetailsDataObj = {
          picture: downloadURL,
        };

        const profileDetailsData = {
          picture: profileDetailsDataObj.picture.replace('blob:', ''),
        };

        dispatch({ type: sagaActions.UPDATE_PROFILE, profileDetailsData });
      } catch (error: any) {
        dispatch(profileLoader(false));
        triggerErrorMessage(null, error?.code);
      } finally {
        dispatch(profileLoader(false));
      }
    }
  };

  const allowedFormats: any = ['image/jpeg', 'image/png', 'image/jpg'];

  const handleDeleteProfileImage = async () => {
    if (profileImage && userId) {
      dispatch(profileLoader(true));
      try {
        const existingProfileRef = ref(storage, `ProfilePictures/${userId}/profile`);
        await deleteObject(existingProfileRef);
        const profileDetailsData = {
          picture: null,
        };
        dispatch({ type: sagaActions.UPDATE_PROFILE, profileDetailsData });
        setProfileImage('');
      } catch (error: any) {
        dispatch(profileLoader(false));
        const avoidErrorForThisCode = ['storage/object-not-found'];
        if (!avoidErrorForThisCode.includes(error?.code)) {
          triggerErrorMessage(null, error?.code);
        }
      } finally {
        dispatch(profileLoader(false));
      }
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}>
        <IconButton
          onClick={handleClickOpen}
          size='small'
          sx={{
            ml: 2,
            ':hover': {
              background: 'none',
            },
          }}>
          {!profileImage ? (
            <Avatar sx={{ width: 50, height: 50, textTransform: 'capitalize' }}>{`${currentUser?.email?.charAt(0)}`}</Avatar>
          ) : (
            <Avatar src={profileImage} sx={{ width: 50, height: 50 }} />
          )}
        </IconButton>
      </Box>
      {isMobile ? (
        <ProfileForMobile
          openDialog={openDialog}
          handleClose={handleClose}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          isMobile={isMobile}
          currentUser={currentUser}
          getProfileDetails={getProfileDetails}
          handleFieldChange={handleFieldChange}
          handleProfileChange={handleProfileChange}
          profileDetails={profileDetails}
          handleUpdate={handleUpdate}
          intl={intl}
          locale={locale}
          supportLinks={supportLinks}
          termsAndConditonLinks={termsAndConditonLinks}
          profileImage={profileImage}
          termsOfUseLinks={termsOfUseLinks}
          contactLink={contactLink}
          handleLogout={handleLogout}
          handleDeleteProfileImage={handleDeleteProfileImage}
        />
      ) : (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          PaperProps={{
            sx: {
              background: '#FCFCFC',
              boxShadow: '0px 9px 20px 0px #00000017',
              maxWidth: '649px',
              height: '561px',
              borderRadius: '14px',
            },
          }}>
          {isProfileLoading && <CircularLoader />}
          <DialogContent
            sx={{
              display: 'flex',
              padding: 0,
            }}>
            <Stack
              sx={{
                width: '250px',
                background: '#F0F0F0',
                // height: '100%',
                height: 'fit-content',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Stack marginTop={6} position='relative' alignItems='center' sx={{ width: '250px' }}>
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
                    left: '56%',
                    top: '63.5%',
                  }}
                  onChange={handleProfileChange}>
                  <EditIcon />
                  <input id='upload-photo' type='file' style={{ display: 'none' }} accept={allowedFormats} />
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
                    left: '76%',
                    top: '63.5%',
                  }}
                  onClick={handleDeleteProfileImage}>
                  <DeleteIcon width='17' height='17' />
                </Box>
                <Box sx={{ height: '24px' }}>
                  <Typography variant='title2' textAlign={'center'}>
                    {getProfileDetails?.given_name}
                  </Typography>
                </Box>
              </Stack>
              <Stack marginTop={5.25} alignItems='center'>
                <StyledButton
                  sx={{
                    background: `${selectedOption === 'Terms & Conditions' ? defaultStyle.primaryColor : 'transparent'} !important`,
                    boxShadow: `${selectedOption === 'Terms & Conditions' ? '0px 7px 10px 0px #00000026' : 'none'}!important`,
                    color: `${selectedOption === 'Terms & Conditions' ? defaultStyle.secondaryColor : defaultStyle.primaryColor}`,
                    ':hover': {
                      background: `${selectedOption === 'Terms & Conditions' ? defaultStyle.primaryColor : 'rgba(0,0,0,0.04)'} !important `,
                      color: `${selectedOption === 'Terms & Conditions' ? defaultStyle.whiteColor : defaultStyle.primaryColor}`,
                    },
                  }}
                  onClick={() => handleOptionClick('Terms & Conditions')}>
                  <Typography variant='sidebarTitle'>{intl?.formatMessage({ id: 't&c' })}</Typography>
                </StyledButton>
                <StyledButton
                  sx={{
                    background: `${selectedOption === 'Support' ? defaultStyle.primaryColor : 'transparent'} !important`,
                    boxShadow: `${selectedOption === 'Support' ? '0px 7px 10px 0px #00000026' : 'none'}!important`,
                    color: `${selectedOption === 'Support' ? defaultStyle.secondaryColor : defaultStyle.primaryColor}`,
                    ':hover': {
                      background: `${selectedOption === 'Support' ? defaultStyle.primaryColor : 'rgba(0,0,0,0.04)'} !important `,
                      color: `${selectedOption === 'Support' ? defaultStyle.whiteColor : defaultStyle.primaryColor}`,
                    },
                  }}
                  onClick={() => handleOptionClick('Support')}>
                  <Typography variant='sidebarTitle'>{intl?.formatMessage({ id: 'support' })}</Typography>
                </StyledButton>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    height: '33px',
                    alignItems: 'center',
                    marginTop: '73px',
                    marginBottom: '73px',
                    cursor: 'pointer',
                  }}
                  onClick={handleLogout}>
                  <Typography variant='title3' sx={{ color: defaultStyle.primaryColor }}>
                    {intl?.formatMessage({ id: 'logout' })}
                  </Typography>
                  <Logout fill={defaultStyle.primaryColor} />
                </Box>
              </Stack>
            </Stack>
            <Stack
              sx={{
                width: '399px',
                background: '#FCFCFC',
                justifyContent: 'space-between',
              }}>
              {selectedOption === '' && (
                <>
                  <ProfileDetails
                    handleClose={handleClose}
                    profileDetails={profileDetails}
                    handleFieldChange={(e: any) => handleFieldChange(e)}
                    getProfileDetails={getProfileDetails}
                    intl={intl}
                  />
                  {renderDialogActionsButton()}
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
                  back={intl?.formatMessage({ id: 'back' })}
                  handleClickBack={() => setSelectedOption('')}
                />
              )}
              {selectedOption === 'Support' && (
                <Support
                  locale={locale}
                  supportLinks={supportLinks}
                  supportLabel={intl?.formatMessage({ id: 'faq' })}
                  handleClose={handleClose}
                  contact={intl?.formatMessage({ id: 'contact' })}
                  contactLink={contactLink}
                  isMobile={isMobile}
                  back={intl?.formatMessage({ id: 'back' })}
                  handleClickBack={() => setSelectedOption('')}
                />
              )}
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export const StyledButton = styled(ListItemButton)(() => ({
  width: '100% !important',
  height: 'auto',
  padding: '5px 22px !important',
  color: defaultStyle.primaryColor,
  borderRadius: '6px',
}));
