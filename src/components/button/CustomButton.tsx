import React from 'react';
import { Button } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';

type CustomButtonProps = {
  children: React.ReactNode;
  handleClick?: () => void;
  sx?: object;
  disabled?: boolean;
  showStartIcon?: React.ReactNode;
  showEndIcon?: React.ReactNode;
  variant?: any;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  type?: 'submit' | 'button';
};

export default function CustomButton({
  children,
  handleClick,
  sx,
  disabled,
  showStartIcon,
  showEndIcon,
  variant,
  onMouseEnter,
  onMouseLeave,
  type,
}: CustomButtonProps) {
  // const buttonStyle =
  //   disabled === true
  //     ? {
  //         background: defaultStyle.disableButtonColor,
  //         color: `${defaultStyle.primaryColor} !important`,
  //       }
  //     : variant === 'primary'
  //       ? {
  //           background: defaultStyle.authScreenButtonColor,
  //           color: defaultStyle.secondaryColor,
  //           boxShadow: defaultStyle.primaryButtonBoxShadow,
  //         }
  //       : {
  //           background: defaultStyle.primaryColor,
  //           color: defaultStyle.secondaryColor,
  //           boxShadow: defaultStyle.secondaryButtonBoxShadow,
  //         };
  const buttonStyle = disabled && {
    background: defaultStyle.disableButtonColor,
    color: `${defaultStyle.primaryColor} !important`,
  };
  return (
    <Button
      variant={variant || 'contained'}
      type={type}
      size='small'
      disabled={disabled}
      sx={{
        ...(disabled && {
          ':hover': buttonStyle,
          ...buttonStyle,
        }),
        ...sx,
        textTransform: 'none',
      }}
      startIcon={showStartIcon}
      onClick={handleClick}
      endIcon={showEndIcon}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
    </Button>
  );
}
