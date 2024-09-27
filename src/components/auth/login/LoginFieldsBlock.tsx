import React, { useImperativeHandle, useRef } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import CustomTextField from '@/components/textfield/CustomTextField';
import PasswordToggleIcon from '@/assets/passwordIcon';
import { StyledStack } from '@/components/auth/style';
import { LoginFormErrors } from '@/components/auth/login/Login';

type LoginFieldsBlockProps = {
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors?: LoginFormErrors;
  showPassword?: boolean;
  handleTogglePassword?: () => void;
  commonWidthHeight?: object;
  commonPlaceholderStyle?: object;
  enter_registered_email: string;
  password: string;
  emailRef?: any;
  passwordRef?: any;
};

export default function LoginFieldsBlock({
  handleOnChange,
  formErrors,
  showPassword,
  handleTogglePassword,
  commonWidthHeight,
  commonPlaceholderStyle,
  enter_registered_email,
  password,
  emailRef,
  passwordRef,
}: LoginFieldsBlockProps) {
  const getEmailRef = useRef<HTMLInputElement>(null);
  const getPasswordRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(emailRef, () => ({
    get value() {
      return getEmailRef.current?.value;
    },
  }));
  useImperativeHandle(passwordRef, () => ({
    get value() {
      return getPasswordRef.current?.value;
    },
  }));

  return (
    <>
      <StyledStack sx={{ gap: '28px', marginTop: '1.5rem' }}>
        <CustomTextField
          ref={getEmailRef}
          variant='primary'
          className='auth-screen'
          placeholder={enter_registered_email}
          sx={{ ...commonWidthHeight }}
          name='email'
          handleChange={handleOnChange}
          error={formErrors?.email ? true : false}
          helperText={formErrors?.email ? formErrors.email : undefined}
          // autocomplete='email'
          inputProps={{
            sx: {
              ...commonPlaceholderStyle,
            },
          }}
        />
        <CustomTextField
          ref={getPasswordRef}
          // autocomplete='current-password'
          variant='primary'
          className='auth-screen'
          placeholder={password}
          sx={{ ...commonWidthHeight }}
          type={showPassword ? 'text' : 'password'}
          name='password'
          handleChange={handleOnChange}
          error={formErrors?.password ? true : false}
          helperText={formErrors?.password ? formErrors.password : undefined}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleTogglePassword} edge='end'>
                  <PasswordToggleIcon showPassword={showPassword} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            sx: {
              ...commonPlaceholderStyle,
            },
          }}
        />
      </StyledStack>
    </>
  );
}
