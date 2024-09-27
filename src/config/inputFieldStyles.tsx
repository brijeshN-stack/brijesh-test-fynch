import { defaultAuthScreenFields } from './colorConfig';
import { defaultFormsFields } from './colorConfig';

const customPrimaryTextFieldsStyles = JSON?.parse(process?.env?.NEXT_PUBLIC_PRIMARY_INPUT_FIELD_STYLE || '{}');
const customSecondaryTextFieldStyles = JSON?.parse(process?.env?.NEXT_PUBLIC_SECONDARY_INPUT_FIELD_STYLE || '{}');

const primaryTextFieldStyles = { ...defaultAuthScreenFields, ...customPrimaryTextFieldsStyles };

const secondaryTextFieldStyles = { ...defaultFormsFields, ...customSecondaryTextFieldStyles };
const inputFieldTheme = {
  MuiTextField: {
    styleOverrides: {
      root: {
        '&.auth-screen': {
          '& .MuiInputBase-input': {
            color: primaryTextFieldStyles?.color,
            zIndex: '1',
          },
          '& .MuiOutlinedInput-root': {
            zIndex: '1',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: `${primaryTextFieldStyles?.borderColor} !important`,
              borderWidth: primaryTextFieldStyles?.borderWidth,
              backgroundColor: primaryTextFieldStyles?.background,
              borderRadius: primaryTextFieldStyles?.borderRadius,
            },
            '&.Mui-focused': {
              color: primaryTextFieldStyles?.color,
              zIndex: '1',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: primaryTextFieldStyles?.borderColor,
                borderWidth: primaryTextFieldStyles?.borderWidth,
              },
            },
            '&:hover:not(.Mui-focused)': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: primaryTextFieldStyles?.borderColor,
                borderWidth: primaryTextFieldStyles?.borderWidth,
                backgroundColor: primaryTextFieldStyles?.background,
                borderRadius: primaryTextFieldStyles?.borderRadius,
              },
            },
          },
        },
        '&.form-fields': {
          '& .MuiInputBase-input': {
            color: secondaryTextFieldStyles?.color,
            zIndex: '1',
          },
          '& .MuiOutlinedInput-root': {
            zIndex: '1',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: `${secondaryTextFieldStyles?.borderColor} !important`,
              borderWidth: secondaryTextFieldStyles?.borderWidth,
              backgroundColor: secondaryTextFieldStyles?.background,
              borderRadius: secondaryTextFieldStyles?.borderRadius,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: secondaryTextFieldStyles?.borderColor,
              borderWidth: secondaryTextFieldStyles?.borderWidth,
            },
            '&:hover:not(.Mui-focused):not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
              borderColor: secondaryTextFieldStyles?.borderColor,
              borderWidth: secondaryTextFieldStyles?.borderWidth,
              backgroundColor: secondaryTextFieldStyles?.background,
              borderRadius: secondaryTextFieldStyles?.borderRadius,
            },
            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: secondaryTextFieldStyles?.borderColor,
              borderWidth: secondaryTextFieldStyles?.borderWidth,
              borderRadius: secondaryTextFieldStyles?.borderRadius,
            },
            '&.Mui-disabled .MuiInputBase-input': {
              color: secondaryTextFieldStyles?.disabledColor,
            },
          },
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        '&.Mui-error': {
          color: primaryTextFieldStyles.errorColor,
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        '&.auth-screen::placeholder': {
          color: primaryTextFieldStyles?.placeholderColor,
          opacity: '60%',
          fontWeight: 400,
        },
        '&.form-fields::placeholder': {
          color: secondaryTextFieldStyles?.placeholderColor,
          opacity: 1,
          fontWeight: 400,
        },
      },
    },
  },
};

export default inputFieldTheme;
