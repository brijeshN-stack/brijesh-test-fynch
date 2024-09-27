import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import RadioButton from '@/assets/radioIcon';
import { defaultTermsOfUseLinks, nl } from '@/utils/constants';
import { RegisterFormErrors } from '@/components/auth/register/Register';
import CustomLink from '@/components/customLink/CustomLink';

export type RegisterTermsAndConditionBlockProps = {
  i_agree: string;
  terms_of_use: string;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  locale: string;
  formErrors: RegisterFormErrors;
  agree_to_terms_of_use: string;
  fill?: string;
};

export default function RegisterTermsAndConditionBlock({
  checked,
  setChecked,
  i_agree,
  terms_of_use,
  locale,
  formErrors,
  agree_to_terms_of_use,
}: RegisterTermsAndConditionBlockProps) {
  const termsOfUseLinks = {
    en: process?.env?.NEXT_PUBLIC_EN_TERMS_OF_USE_LINK || defaultTermsOfUseLinks.en,
    nl: process?.env?.NEXT_PUBLIC_NL_TERMS_OF_USE_LINK || defaultTermsOfUseLinks.nl,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        lineHeight: '20px',
        width: { sm: '370px', xs: '300px' },
        marginTop: '21px',
        minHeight: '38px',
        position: 'relative',
      }}>
      <Box sx={{ textAlign: 'left', width: '100%', display: 'flex' }}>
        <RadioButton
          fill={process.env.NEXT_PUBLIC_CHECKMARK_COLOR}
          checked={checked}
          setChecked={setChecked}
          i_agree={''}
          terms_of_use={''}
          locale={''}
          agree_to_terms_of_use={''}
          formErrors={{
            email: '',
            password: '',
            confirmPassword: '',
            termsOfUse: '',
          }}
        />
        <Typography
          variant='title4'
          sx={{
            color: defaultStyle.sidebarAndAuthScreenTextColor,
            marginLeft: '10px',
          }}>
          {i_agree}
        </Typography>{' '}
        <CustomLink location={locale === nl ? termsOfUseLinks.nl : termsOfUseLinks.en} target='_blank'>
          <Typography variant='title4' color={process.env.NEXT_PUBLIC_AUTH_SCREEN_LINK_COLOR || defaultStyle.authScreenButtonColor}>
            {terms_of_use}
          </Typography>
        </CustomLink>
      </Box>
      {formErrors?.termsOfUse && (
        <Typography
          variant='caption'
          color='error'
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            color: '#d32f2f',
            textAlign: 'left',
            width: '100%',
            marginLeft: '30px',
          }}>
          {agree_to_terms_of_use}
        </Typography>
      )}
    </Box>
  );
}
