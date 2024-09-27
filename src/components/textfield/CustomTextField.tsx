import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import { forwardRef } from 'react';

export type CustomTextFieldProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | undefined;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: any;
  InputLabelProps?: Object;
  sx?: object;
  inputProps?: object;
  InputProps?: object;
  variant?: 'primary' | 'secondary';
  width?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
  disable?: boolean;
  autocomplete?: any;
  ref?: any;
  fieldWidth?: string;
  className?: string;
};

const CustomTextField = forwardRef<HTMLInputElement, CustomTextFieldProps>(function CustomTextField(
  {
    label,
    type,
    placeholder,
    value,
    handleChange,
    handleBlur,
    InputLabelProps,
    sx,
    inputProps,
    InputProps,
    variant,
    width = '',
    name,
    error,
    helperText,
    disable = false,
    autocomplete,
    fieldWidth,
    className,
    ...other
  },
  ref,
) {
  const defaultInputProps = {
    primary: {
      sx: {
        height: '46px',
      },
    },
    secondary: {
      sx: {
        height: '38px',
        borderRadius: '7px',
        width: width || '100%',
      },
    },
  };

  const defaultInputLabelProps = {
    primary: {
      style: {
        lineHeight: '1em',
        opacity: '30%',
      },
    },
    secondary: {
      style: {},
    },
  };
  return (
    <TextField
      className={className}
      inputRef={ref}
      autoComplete={autocomplete}
      value={value}
      name={name}
      placeholder={placeholder}
      type={type}
      label={label}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
      disabled={disable}
      InputLabelProps={{
        shrink: true,
        ...defaultInputLabelProps[variant || 'primary'],
        ...InputLabelProps,
      }}
      inputProps={inputProps}
      InputProps={{
        classes: {
          input: className,
        },
        ...defaultInputProps[variant || 'primary'],
        ...InputProps,
      }}
      {...other}
      sx={{
        ...sx,
        '&.MuiTextField-root': {
          width: fieldWidth,
        },
        '& .MuiFormHelperText-root': {
          // maxWidth: '220px',
          textWrap: 'wrap',
        },
      }}
    />
  );
});

export default CustomTextField;
