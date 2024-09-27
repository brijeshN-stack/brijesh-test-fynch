'use client';

import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DropdownDownArrowIcon from '@/assets/dropdownDownArrowIcon';
import { IconButton, ListItemText, Typography } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import DropdownsvgIcon from '@/components/dropdownsvgIcon/DropdownsvgIcon';

export type SelectValueProps = {
  name: string;
  id: any;
  icon: string;
};

type SelectWithEndIconProps = {
  selectedValue: string | any;
  handleChange?: (event: SelectChangeEvent) => void;
  selectValue: SelectValueProps[];
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  sx?: object;
  name?: string;
  disabled?: boolean;
  label?: any;
  labelVariant?: string | any;
  setShowDropdownIcon?: any;
  showDropdownIcon?: any;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export default function SelectWithEndIcon({
  selectedValue,
  handleChange,
  selectValue,
  maxWidth = '192.80px',
  maxHeight = '',
  minWidth = '',
  sx,
  name,
  disabled = false,
  label,
  labelVariant = '',
  showDropdownIcon,
  setShowDropdownIcon,
  variant = 'primary',
  className,
}: SelectWithEndIconProps) {
  const handleIconVisibility = (value: string) => {
    setShowDropdownIcon(value === '');
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Select
      className={className}
      sx={{
        border: defaultStyle.greyBorder,
        minWidth: { xs: minWidth },
        borderRadius: '8px',
        maxWidth: { sm: maxWidth },
        width: '100%',
        maxHeight: maxHeight || '38px',
        height: '100%',
        '.MuiListItemIcon-root ': {
          minWidth: '45px',
          position: 'absolute !important',
          right: '5px !important',
          height: '100%',
          top: 0,
          alignItems: 'center',
        },
        '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
          {
            color: defaultStyle.primaryColor,
          },
        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          // border: `1px solid ${defaultStyle.greyBorder}`,
        },
        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          // border: `1px solid ${defaultStyle.greyBorder}`,
        },
        ...sx,
      }}
      labelId='demo-simple-select-error-label'
      id='demo-simple-select-error'
      displayEmpty
      value={selectedValue}
      name={name}
      disabled={disabled}
      onOpen={handleOpen}
      onClose={handleClose}
      open={open}
      onChange={event => {
        handleChange && handleChange(event);
        handleIconVisibility(event?.target?.value);
      }}
      IconComponent={() => (
        <IconButton sx={{ marginRight: '5px' }} edge='end' onClick={() => setOpen(!open)}>
          {/* remove variant after adding icon in modalities api */}
          {variant === 'primary' ? (
            showDropdownIcon && (open ? <DropdownDownArrowIcon /> : <DropdownDownArrowIcon inverse={true} />)
          ) : open ? (
            <DropdownDownArrowIcon />
          ) : (
            <DropdownDownArrowIcon inverse={true} />
          )}
        </IconButton>
      )}
      renderValue={value => {
        if (value) {
          const selectedOption = selectValue.find(item => item?.id === value);
          if (selectedOption) {
            return (
              <>
                {selectedOption && selectedOption?.name}
                {selectedOption && selectedOption?.icon && (
                  <>
                    <span style={{ marginLeft: '10px' }}>
                      <DropdownDownArrowIcon inverse={true} />
                    </span>
                    <DropdownsvgIcon iconUrl={selectedOption.icon} />
                  </>
                )}
              </>
            );
          }
        }
        return (
          <Typography className={className} variant={labelVariant}>
            {label}
          </Typography>
        );
      }}>
      {selectValue?.map(option => (
        <MenuItem key={option?.id} value={option?.id}>
          <ListItemText primary={option?.name} />
          {variant === 'primary' && <DropdownsvgIcon iconUrl={option.icon} />}
        </MenuItem>
      ))}
    </Select>
  );
}
