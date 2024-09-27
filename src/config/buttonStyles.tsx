import { defaultStyle } from './colorConfig';

const customPrimaryButtonObject = JSON.parse(process.env.NEXT_PUBLIC_PRIMARY_BUTTON_STYLE || '{}');
const customSecondaryButtonObject = JSON.parse(process.env.NEXT_PUBLIC_SECONDARY_BUTTON_STYLE || '{}');
const customSubmitExpenseButtonObject = JSON.parse(process.env.NEXT_PUBLIC_SUBMIT_EXPENSE_BUTTON_STYLE || '{}');
const customPrimaryOutlinedButtonObject = JSON.parse(process.env.NEXT_PUBLIC_PRIMARY_OUTLINED_BUTTON_STYLE || '{}');
const customPrimaryContainedButtonObject = JSON.parse(process.env.NEXT_PUBLIC_PRIMARY_CONTAINED_BUTTON_STYLE || '{}');
const customSecondaryOutlinedButtonObject = JSON.parse(process.env.NEXT_PUBLIC_SECONDARY_OUTLINED_BUTTON_STYLE || '{}');
const customSecondaryContainedButtonObject = JSON.parse(process.env.NEXT_PUBLIC_SECONDARY_CONTAINED_BUTTON_STYLE || '{}');

// Default Primary Button Styles
const defaultPrimaryButton = {
  background: defaultStyle.authScreenButtonColor,
  color: defaultStyle.secondaryColor,
  boxShadow: defaultStyle.primaryButtonBoxShadow,
  '&:hover': {
    background: defaultStyle.authScreenButtonColor,
    color: defaultStyle.secondaryColor,
    boxShadow: defaultStyle.primaryButtonBoxShadow,
  },
};
// Custom Primary Button Styles from Environment Variables
const customPrimaryButtonStyles = {
  background: customPrimaryButtonObject?.background || defaultPrimaryButton.background,
  color: customPrimaryButtonObject?.color || defaultPrimaryButton.color,
  boxShadow: customPrimaryButtonObject?.boxShadow || defaultPrimaryButton.boxShadow,
  borderColor: customPrimaryButtonObject?.borderColor || 'transparent',
  borderWidth: customPrimaryButtonObject?.borderWidth || '0px',
  borderRadius: customPrimaryButtonObject?.borderRadius || '4px',
  borderStyle: 'solid',
  '&:hover': {
    background: customPrimaryButtonObject?.background || defaultPrimaryButton.background,
    color: customPrimaryButtonObject?.color || defaultPrimaryButton.color,
    boxShadow: customPrimaryButtonObject?.boxShadow || defaultPrimaryButton.boxShadow,
  },
};

// Default Secondary Button Styles
const defaultSecondaryButton = {
  background: defaultStyle.primaryColor,
  color: defaultStyle.secondaryColor,
  boxShadow: defaultStyle.secondaryButtonBoxShadow,
  '&:hover': {
    background: defaultStyle.primaryColor,
    color: defaultStyle.secondaryColor,
    boxShadow: defaultStyle.secondaryButtonBoxShadow,
  },
};
// Custom Secondary Button Styles from Environment Variables
const customSecondaryButtonStyles = {
  background: customSecondaryButtonObject?.background || defaultSecondaryButton.background,
  color: customSecondaryButtonObject?.color || defaultSecondaryButton.color,
  boxShadow: customSecondaryButtonObject?.boxShadow || defaultSecondaryButton.boxShadow,
  borderColor: customSecondaryButtonObject?.borderColor || 'transparent',
  borderWidth: customSecondaryButtonObject?.borderWidth || '0px',
  borderRadius: `${customSecondaryButtonObject?.borderRadius || '7px'} !important`,
  borderStyle: 'solid',
  '&:hover': {
    background: customSecondaryButtonObject?.background || defaultSecondaryButton.background,
    color: customSecondaryButtonObject?.color || defaultSecondaryButton.color,
    borderColor: customSecondaryButtonObject?.borderColor || 'transparent',
  },
};

// Default Submit Expense Button Styles
const submitExpenseButtonStyles = {
  borderRadius: '8px',
  background: `${defaultStyle.submitExpenseDisableColur} !important`,
  color: `${defaultStyle.primaryColor} !important`,
  // boxShadow: defaultStyle.secondaryButtonBoxShadow,
  boxShadow: 0,
  '& svg': {
    '& path': {
      fill: `${defaultStyle.primaryColor} `,
    },
  },
  ':hover': {
    background: `${defaultStyle.primaryColor} !important`,
    color: `${defaultStyle.secondaryColor} !important`,
    '& svg': {
      '& path': {
        fill: `${defaultStyle.secondaryColor} `,
      },
    },
    boxShadow: 0,
  },
};
// Custom Submit Expense Button Styles from Environment Variables
const customSubmitExpenseButtonStyles = {
  background: customSubmitExpenseButtonObject?.background || submitExpenseButtonStyles.background,
  color: customSubmitExpenseButtonObject?.color || submitExpenseButtonStyles.color,
  borderColor: customSubmitExpenseButtonObject?.borderColor || 'transparent',
  borderWidth: customSubmitExpenseButtonObject?.borderWidth || '0px',
  borderRadius: `${customSubmitExpenseButtonObject?.borderRadius || submitExpenseButtonStyles.borderRadius} !important`,
  boxShadow: submitExpenseButtonStyles.boxShadow,
  borderStyle: 'solid',
  '& svg': {
    '& path': {
      fill: customSubmitExpenseButtonObject?.color || submitExpenseButtonStyles.color,
    },
  },
  '&:hover': {
    background: customSubmitExpenseButtonObject?.color || submitExpenseButtonStyles.color,
    color: customSubmitExpenseButtonObject?.background || submitExpenseButtonStyles.background,
    borderColor: customSubmitExpenseButtonObject?.borderColor || 'transparent',
    '& svg': {
      '& path': {
        fill: customSubmitExpenseButtonObject?.background || submitExpenseButtonStyles.background,
      },
    },
  },
};

// Default Primary Outlined Button Styles
const defaultPrimaryOutlinedButton = {
  borderColor: defaultStyle.wfhButtonColor,
  borderWidth: '0.5px',
  borderRadius: '4px',
  borderStyle: 'solid',
  color: defaultStyle.secondaryColor,
  background: defaultStyle.colorTransparent,
  '& svg': {
    '& path': {
      fill: defaultStyle.secondaryColor,
    },
  },
  ':hover': {
    color: defaultStyle.secondaryColor,
    background: defaultStyle.colorTransparent,
  },
};
// Custom Primary Outlined Button Styles from Environment Variables
const customPrimaryOutlinedButtonStyles = {
  background: customPrimaryOutlinedButtonObject?.background || defaultPrimaryOutlinedButton.background,
  color: customPrimaryOutlinedButtonObject?.color || defaultPrimaryOutlinedButton.color,
  borderColor: customPrimaryOutlinedButtonObject?.borderColor || defaultPrimaryOutlinedButton.borderColor,
  borderWidth: customPrimaryOutlinedButtonObject?.borderWidth || defaultPrimaryOutlinedButton.borderWidth,
  borderRadius: `${customPrimaryOutlinedButtonObject?.borderRadius || defaultPrimaryOutlinedButton.borderRadius} !important`,
  borderStyle: 'solid',
  '& svg': {
    '& path': {
      fill: customPrimaryOutlinedButtonObject?.color || defaultPrimaryOutlinedButton.color,
    },
  },
  '&:hover': {
    background: customPrimaryOutlinedButtonObject?.background || defaultPrimaryOutlinedButton.background,
    color: customPrimaryOutlinedButtonObject?.color || defaultPrimaryOutlinedButton.color,
    borderColor: customPrimaryOutlinedButtonObject?.borderColor || defaultPrimaryOutlinedButton.borderColor,
  },
};

// Default Primary Contained Button Styles
const defaultPrimaryContainedButton = {
  color: defaultStyle.secondaryColor,
  borderColor: defaultStyle.wfhButtonColor,
  borderWidth: '0.5px',
  borderRadius: '4px',
  borderStyle: 'solid',
  background: defaultStyle.authScreenButtonColor,
  '& svg': {
    '& path': {
      fill: defaultStyle.secondaryColor,
    },
  },
  ':hover': {
    color: defaultStyle.secondaryColor,
    background: defaultStyle.authScreenButtonColor,
  },
};
// Custom Primary Contained Button Styles from Environment Variables
const customPrimaryContainedButtonStyles = {
  background: customPrimaryContainedButtonObject?.background || defaultPrimaryContainedButton.background,
  color: customPrimaryContainedButtonObject?.color || defaultPrimaryContainedButton.color,
  borderColor: customPrimaryContainedButtonObject?.borderColor || defaultPrimaryContainedButton.borderColor,
  borderWidth: customPrimaryContainedButtonObject?.borderWidth || defaultPrimaryContainedButton.borderWidth,
  borderRadius: `${customPrimaryContainedButtonObject?.borderRadius || defaultPrimaryContainedButton.borderRadius} !important`,
  borderStyle: customPrimaryContainedButtonObject?.borderStyle || defaultPrimaryContainedButton.borderStyle,
  '& svg': {
    '& path': {
      fill: customPrimaryContainedButtonObject?.color || defaultPrimaryContainedButton.color,
    },
  },
  '&:hover': {
    background: customPrimaryContainedButtonObject?.background || defaultPrimaryContainedButton.background,
    color: customPrimaryContainedButtonObject?.color || defaultPrimaryContainedButton.color,
    borderColor: customPrimaryContainedButtonObject?.borderColor || defaultPrimaryContainedButton.borderColor,
  },
};

// Default Secondary Outlined Button Styles
const defaultSecondaryOutlinedButton = {
  borderColor: defaultStyle.wfoButtonColor,
  borderWidth: '0.5px',
  borderRadius: '4px',
  borderStyle: 'solid',
  color: defaultStyle.secondaryColor,
  background: defaultStyle.colorTransparent,
  '& svg': {
    '& path': {
      fill: defaultStyle.secondaryColor,
    },
  },
  ':hover': {
    color: defaultStyle.secondaryColor,
    background: defaultStyle.colorTransparent,
  },
};
// Custom Secondary Outlined Button Styles from Environment Variables
const customSecondaryOutlinedButtonStyles = {
  background: customSecondaryOutlinedButtonObject?.background || defaultSecondaryOutlinedButton.background,
  color: customSecondaryOutlinedButtonObject?.color || defaultSecondaryOutlinedButton.color,
  borderColor: customSecondaryOutlinedButtonObject?.borderColor || defaultSecondaryOutlinedButton.borderColor,
  borderWidth: customSecondaryOutlinedButtonObject?.borderWidth || defaultSecondaryOutlinedButton.borderWidth,
  borderRadius: `${customSecondaryOutlinedButtonObject?.borderRadius || defaultSecondaryOutlinedButton.borderRadius} !important`,
  borderStyle: customSecondaryOutlinedButtonObject?.borderStyle || defaultSecondaryOutlinedButton.borderStyle,
  '& svg': {
    '& path': {
      fill: customSecondaryOutlinedButtonObject?.color || defaultSecondaryOutlinedButton.color,
    },
  },
  '&:hover': {
    background: customSecondaryOutlinedButtonObject?.background || defaultSecondaryOutlinedButton.background,
    color: customSecondaryOutlinedButtonObject?.color || defaultSecondaryOutlinedButton.color,
    borderColor: customSecondaryOutlinedButtonObject?.borderColor || defaultSecondaryOutlinedButton.borderColor,
  },
};

// Default Secondary Contained Button Styles
const defaultSecondaryContainedButton = {
  borderColor: defaultStyle.wfoButtonColor,
  borderWidth: '0.5px',
  borderStyle: 'solid',
  borderRadius: '4px',
  color: defaultStyle.secondaryColor,
  background: defaultStyle.wfoButtonColor,
  '& svg': {
    '& path': {
      fill: defaultStyle.secondaryColor,
    },
  },
  ':hover': {
    color: defaultStyle.secondaryColor,
    background: defaultStyle.wfoButtonColor,
  },
};
// Custom Secondary Contained Button Styles from Environment Variables
const customSecondaryContainedButtonStyles = {
  background: customSecondaryContainedButtonObject?.background || defaultSecondaryContainedButton.background,
  color: customSecondaryContainedButtonObject?.color || defaultSecondaryContainedButton.color,
  borderColor: customSecondaryContainedButtonObject?.borderColor || defaultSecondaryContainedButton.borderColor,
  borderWidth: customSecondaryContainedButtonObject?.borderWidth || defaultSecondaryContainedButton.borderWidth,
  borderRadius: `${customSecondaryContainedButtonObject?.borderRadius || defaultSecondaryContainedButton.borderRadius} !important`,
  borderStyle: customSecondaryContainedButtonObject?.borderStyle || 'solid',
  '& svg': {
    '& path': {
      fill: customSecondaryContainedButtonObject?.color || defaultSecondaryContainedButton.color,
    },
  },
  '&:hover': {
    background: customSecondaryContainedButtonObject?.background || defaultSecondaryContainedButton.background,
    color: customSecondaryContainedButtonObject?.color || defaultSecondaryContainedButton.color,
    borderColor: customSecondaryContainedButtonObject?.borderColor || defaultSecondaryContainedButton.borderColor,
  },
};

const buttonTheme = {
  MuiButton: {
    variants: [
      {
        props: { variant: 'defaultPrimary' },
        style: customPrimaryButtonStyles,
      },
      {
        props: { variant: 'defaultSecondary' },
        style: customSecondaryButtonStyles,
      },
      {
        props: { variant: 'submitExpense' },
        style: customSubmitExpenseButtonStyles,
      },
      {
        props: { variant: 'defaultPrimaryOutlined' },
        style: customPrimaryOutlinedButtonStyles,
      },
      {
        props: { variant: 'defaultPrimaryContained' },
        style: customPrimaryContainedButtonStyles,
      },
      {
        props: { variant: 'defaultSecondaryOutlined' },
        style: customSecondaryOutlinedButtonStyles,
      },
      {
        props: { variant: 'defaultSecondaryContained' },
        style: customSecondaryContainedButtonStyles,
      },
    ],
  },
};

export default buttonTheme;
