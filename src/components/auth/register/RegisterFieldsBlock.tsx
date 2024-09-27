import React from 'react';
import CustomTextField from '@/components/textfield/CustomTextField';
import { RegisterFormErrors } from '@/components/auth/register/Register';
import { StyledStack } from '@/components/auth/style';

type RegisterFieldsBlockProps = {
  commonWidthHeight?: object;
  commonPlaceholderStyle?: object;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors: RegisterFormErrors;
  enter_your_business_email: string;
  password: string;
  confirm_password: string;
};

export default function RegisterFieldsBlock({
  commonWidthHeight,
  commonPlaceholderStyle,
  handleOnChange,
  formErrors,
  enter_your_business_email,
  password,
  confirm_password,
}: RegisterFieldsBlockProps) {
  return (
    <>
      <StyledStack sx={{ gap: '28px', marginTop: '43px' }}>
        <CustomTextField
          className='auth-screen'
          placeholder={enter_your_business_email}
          sx={{ ...commonWidthHeight }}
          name='email'
          autocomplete='new-password'
          handleChange={handleOnChange}
          error={formErrors?.email ? true : false}
          helperText={formErrors?.email ? formErrors.email : undefined}
          inputProps={{
            sx: {
              ...commonPlaceholderStyle,
            },
          }}
        />
        <CustomTextField
          className='auth-screen'
          placeholder={password}
          sx={{ ...commonWidthHeight }}
          type='password'
          name='password'
          autocomplete='new-password'
          handleChange={handleOnChange}
          error={formErrors?.password ? true : false}
          helperText={formErrors?.password ? formErrors.password : undefined}
          inputProps={{
            sx: {
              ...commonPlaceholderStyle,
            },
          }}
        />
        <CustomTextField
          className='auth-screen'
          placeholder={confirm_password}
          sx={{ ...commonWidthHeight }}
          type='password'
          name='confirmPassword'
          handleChange={handleOnChange}
          error={formErrors?.confirmPassword ? true : false}
          helperText={formErrors?.confirmPassword ? formErrors.confirmPassword : undefined}
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
