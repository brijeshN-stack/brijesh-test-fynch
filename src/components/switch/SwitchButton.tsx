import React from 'react';
import { styled, Switch } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';

type SwitchButtonProps = {
  checked?: boolean;
  setChecked?: any;
};

export default function SwitchButton({ checked, setChecked }: SwitchButtonProps) {
  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  return <StyledSwitch onChange={handleChange} checked={checked} />;
}

const StyledSwitch = styled(Switch)(({ theme }: any) => ({
  width: 35,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 4,
    color: `${defaultStyle.primaryColor}`,
    '&.Mui-checked': {
      transform: 'translateX(15px)',
      color: `${defaultStyle.primaryColor}`,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'transparent',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: '12px',
    opacity: 1,
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    border: `3px solid ${defaultStyle.primaryColor}`,
  },
}));
