'use client';
import React, { Fragment, useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { defaultStyle } from '@/config/colorConfig';
import LocationIcon from '@/assets/profileIcon/LocationIcon';
import { Place } from '@/types';
import CustomTextField from '../textfield/CustomTextField';

interface SlotProps {
  width: string;
  marginLeft: string;
}

interface CustomAutocompleteProps {
  setInputValue: (value: string, reason?: string | undefined, event?: any) => void | any;
  setValue: any;
  value: string | null;
  inputValue: string;
  googleSuggestion: any;
  placeholder: string;
  slotProps?: SlotProps;
  className?: string;
  disabled?: boolean;
}

export default function CustomAutocomplete<T extends Place>({
  setInputValue,
  setValue,
  value,
  inputValue,
  googleSuggestion,
  placeholder,
  slotProps,
  className,
  disabled,
}: CustomAutocompleteProps) {
  const [open, setOpen] = useState<boolean>(false);

  // const defaultProps = {
  //   options: googleSuggestion,
  //   getOptionLabel: (option: any) => (option === 'string' ? option : option.description),
  // };

  return (
    <Stack gap='5px'>
      <Autocomplete
        includeInputInList
        disabled={disabled}
        filterOptions={x => x}
        open={open}
        options={googleSuggestion}
        getOptionLabel={(option: Place | string) => (typeof option === 'string' ? option : option.description)}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        // clearOnEscape
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue, reason) => {
          setInputValue(newInputValue, reason, event);
        }}
        slotProps={{
          popper: {
            sx: { ...slotProps },
          },
        }}
        freeSolo
        renderOption={(props, option: any) => (
          <Fragment key={option?.place_id}>
            <ListItem
              {...props}
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setValue(option);
                setOpen(false);
              }}>
              <ListItemIcon>
                <LocationIcon />
              </ListItemIcon>
              <ListItemText primary={option.description} />
            </ListItem>
          </Fragment>
        )}
        // options={googleSuggestion ? googleSuggestion : []}
        sx={{
          width: '100%',
          '& .MuiInputBase-root': {
            height: '38px',
          },
          '& .MuiAutocomplete-input': {
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            color: defaultStyle.primaryColor,
          },
          '&.MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input': {
            width: '100%',
          },
        }}
        renderInput={params => <CustomTextField className={className} {...params} placeholder={placeholder} />}
      />
    </Stack>
  );
}
