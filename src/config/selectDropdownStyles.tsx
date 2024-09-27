import { defaultFormsFields, defaultSidebarDropdown, defaultOrderPriorityDropdpwn } from './colorConfig';

const customSecondaryTextFieldStyles = JSON?.parse(process?.env?.NEXT_PUBLIC_SECONDARY_INPUT_FIELD_STYLE || '{}');
const secondaryTextFieldStyles = { ...defaultFormsFields, ...customSecondaryTextFieldStyles };

const customSidebarDropdownStyles = JSON.parse(process?.env?.NEXT_PUBLIC_SIDEBAR_DROPDOWN_STYLE || '{}');
const sidebarDropdownStyles = { ...defaultSidebarDropdown, ...customSidebarDropdownStyles };

const customOrderPriorityDropdownStyles = JSON.parse(process?.env?.NEXT_PUBLIC_ORDER_PRIORITY_DROPDOWN_STYLE || '{}');
const orderPriorityDropdownStyles = { ...defaultOrderPriorityDropdpwn, ...customOrderPriorityDropdownStyles };

export const selectDropdownTheme = {
  MuiSelect: {
    styleOverrides: {
      root: {
        '&.form-fields': {
          '& .MuiSelect-select': {
            color: secondaryTextFieldStyles?.color,
            zIndex: '1',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${secondaryTextFieldStyles?.borderColor} !important `,
            borderWidth: `${secondaryTextFieldStyles?.borderWidth} !important`,
            backgroundColor: secondaryTextFieldStyles?.backgroundColor,
            borderRadius: secondaryTextFieldStyles?.borderRadius,
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: secondaryTextFieldStyles?.borderWidth,
              borderColor: secondaryTextFieldStyles?.borderColor,
            },
          },
          '&:hover:not(.Mui-focused)': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: `${secondaryTextFieldStyles?.borderColor} !important `,
              borderWidth: `${secondaryTextFieldStyles?.borderWidth} !important`,
              backgroundColor: secondaryTextFieldStyles?.backgroundColor,
              borderRadius: secondaryTextFieldStyles?.borderRadius,
            },
          },
        },
        '&.sidebar-dropdown': {
          '& .MuiSelect-select': {
            color: sidebarDropdownStyles.color,
            zIndex: '1',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${sidebarDropdownStyles.borderColor} !important`,
            borderWidth: `${sidebarDropdownStyles.borderWidth} !important`,
            backgroundColor: sidebarDropdownStyles?.backgroundColor,
            borderRadius: sidebarDropdownStyles?.borderRadius,
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: sidebarDropdownStyles?.borderWidth,
              borderColor: sidebarDropdownStyles.borderColor,
            },
          },
          '&:hover:not(.Mui-focused)': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: `${sidebarDropdownStyles.borderColor} !important`,
              borderWidth: `${sidebarDropdownStyles.borderWidth} !important`,
              backgroundColor: sidebarDropdownStyles?.backgroundColor,
              borderRadius: sidebarDropdownStyles?.borderRadius,
            },
          },
        },
        '&.orderPriority-dropdown': {
          '& .MuiSelect-select': {
            color: orderPriorityDropdownStyles.color,
            zIndex: '1',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${orderPriorityDropdownStyles.borderColor} !important`,
            borderWidth: `${orderPriorityDropdownStyles.borderWidth} !important`,
            backgroundColor: orderPriorityDropdownStyles?.backgroundColor,
            borderRadius: orderPriorityDropdownStyles?.borderRadius,
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: orderPriorityDropdownStyles?.borderWidth,
              borderColor: orderPriorityDropdownStyles.borderColor,
            },
          },
          '&:hover:not(.Mui-focused)': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: `${orderPriorityDropdownStyles.borderColor} !important`,
              borderWidth: `${orderPriorityDropdownStyles.borderWidth} !important`,
              backgroundColor: orderPriorityDropdownStyles?.backgroundColor,
              borderRadius: orderPriorityDropdownStyles?.borderRadius,
            },
          },
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        '&.form-fields': {
          '&.MuiTypography-title3': {
            color: secondaryTextFieldStyles?.placeholderColor,
            fontSize: 'initial',
            fontWeight: 400,
          },
        },
      },
    },
  },
};

export const sidebarSvgColors = {
  custom: {
    sidebarColors: {
      color: sidebarDropdownStyles.color,
    },
  },
};
