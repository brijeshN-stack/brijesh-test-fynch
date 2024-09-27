import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, IconButton, ListItemText, Typography } from '@mui/material';
import DropdownDownArrowIcon from '@/assets/dropdownDownArrowIcon';
import { defaultStyle } from '@/config/colorConfig';
import { ValueAndIconProps } from '@/types';
import DropdownsvgIcon from '../dropdownsvgIcon/DropdownsvgIcon';

type SelectDropdownProps = {
  selectedValue?: string;
  handleChange?: (event: SelectChangeEvent) => void;
  selectValue: ValueAndIconProps[] | any;
  width?: string;
  height?: string;
  borderRadius?: string;
  type?: 'primary' | 'secondary';
  name?: string;
  label?: string;
  selectedNameColor?: any;
  border?: any;
  disabled?: boolean;
  iconMinWidth?: string;
  marginLeft?: string;
  padding?: string;
  widthForText?: string;
  maxWidth?: string;
  filter?: string;
  mobileViewWidth?: string;
  className?: string;
  color?: string;
  sx?: object;
};

export default function SelectDropdown({
  selectedValue,
  handleChange,
  selectValue,
  width = '',
  height,
  borderRadius,
  type = 'primary',
  name,
  label = '',
  selectedNameColor,
  border,
  disabled,
  iconMinWidth,
  marginLeft,
  padding,
  widthForText,
  maxWidth,
  filter,
  mobileViewWidth,
  className,
  color,
  sx,
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Select
      disabled={disabled}
      className={className}
      sx={{
        border: border ? border : defaultStyle.greyBorder,
        borderRadius: borderRadius ? borderRadius : '8px',
        maxWidth: { sm: width, xs: mobileViewWidth },
        width: '100%',
        height: height ? height : '38px',
        '&:hover': {
          border: 'red',
        },
        '.MuiBox-root': {
          maxWidth: maxWidth,
          width: widthForText,
        },
        '.MuiListItemIcon-root ': {
          minWidth: iconMinWidth || '45px',
          marginLeft: marginLeft,
        },
        '.MuiSelect-select': {
          color: selectedNameColor,
          padding: padding,
        },
        '.MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb': {
          paddingRight: '0px !important',
        },
        ' .MuiSelect-outlined': {
          padding: type === 'secondary' ? '16.5px 8px !important' : '',
          fontSize: type === 'secondary' ? '14px !important' : '',
        },
        ...sx,
      }}
      labelId='demo-simple-select-error-label'
      id='demo-simple-select-error'
      displayEmpty
      name={name}
      value={selectedValue}
      onChange={handleChange}
      onOpen={handleOpen}
      onClose={handleClose}
      open={open}
      IconComponent={() =>
        disabled ? null : (
          <IconButton sx={{ marginRight: '5px' }} edge='end' onClick={() => setOpen(!open)}>
            {open ? <DropdownDownArrowIcon /> : <DropdownDownArrowIcon inverse={true} />}
          </IconButton>
        )
      }
      renderValue={(value: any) => {
        if (value) {
          const selectedOption = selectValue?.find((item: any) => item.value === value);
          if (selectedOption) {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {type === 'primary' && selectedOption.icon && (
                  <DropdownsvgIcon iconUrl={selectedOption.icon} filter={filter} color={color} />
                )}
                <Typography overflow='hidden' textOverflow='ellipsis'>
                  {selectedOption.name}
                </Typography>
              </Box>
            );
          }
        }
        return (
          <Typography className={className} variant='title3'>
            {label}
          </Typography>
        );
      }}>
      {selectValue?.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          {type === 'primary' && <DropdownsvgIcon iconUrl={option.icon} color={color} />}
          <ListItemText primary={option.name} />
        </MenuItem>
      ))}
    </Select>
  );
}
