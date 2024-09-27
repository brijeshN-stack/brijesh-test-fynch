import { defaultStyle } from './colorConfig';

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    calendarVariant: true;
    statisticsVariant: true;
    addVehicleVariant: true;
    addedVehicleVariant: true;
  }
}
declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    calendarVariant: true;
    statisticsVariant: true;
    addVehicleVariant: true;
    addedVehicleVariant: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      sidebarColors: {
        color: string;
      };
      calendarVariant: {
        textColor: string;
        wfhSvgBackground: string;
        wfhSvgInnerColor: string;
        wfoSvgBackground: string;
        wfoSvgInnerColor: string;
      };
      statisticsVariant: {
        textColor: string;
        widgetBackgroundColor: string;
        borderRadius: string;
        borderWidth: string;
        svgBackground: string;
        svgInnerColor: string;
      };
      addVehicleVariant: {
        textColor: string;
        widgetBackgroundColor: string;
      };
      addedVehicleVariant: {
        textColor: string;
        textBelowLabelColor: string;
      };
    };
  }
  interface PaletteOptions {
    custom?: {
      calendarVariant?: {
        textColor?: string;
        wfhSvgBackground: string;
        wfhSvgInnerColor: string;
        wfoSvgBackground: string;
        wfoSvgInnerColor: string;
      };
      statisticsVariant?: {
        textColor?: string;
        widgetBackgroundColor?: string;
        svgBackground: string;
        svgInnerColor: string;
      };
      addVehicleVariant?: {
        textColor?: string;
        widgetBackgroundColor?: string;
      };
      addedVehicleVariant?: {
        textColor?: string;
        textBelowLabelColor?: string;
      };
    };
  }
}
const defaultStatisticsStyles = {
  background: defaultStyle.secondaryColor,
  borderRadius: '15px',
  color: defaultStyle.primaryColor,
  borderColor: 'transparent',
  borderWidth: '0px',
  svgBackground: defaultStyle.primaryColor,
  svgInnerColor: defaultStyle.secondaryColor,
};
const customStatisticsWidgetStyles = JSON?.parse(process?.env?.NEXT_PUBLIC_STATISTICS_WIDGET_STYLE || '{}');
const statisticsWidgetStyles = {
  ...defaultStatisticsStyles,
  ...customStatisticsWidgetStyles,
};
const defaultAddVehicleWidgetStyles = {
  background: defaultStyle.primaryColor,
  borderRadius: '24px',
  color: defaultStyle.addVehicleTextColor,
  borderColor: 'transparent',
  borderWidth: '0px',
};
const customAddVehicleWidgetStyles = JSON?.parse(process?.env?.NEXT_PUBLIC_ADD_VEHICLE_WIDGET_STYLE || '{}');

const addVehicleWidgetStyles = {
  ...defaultAddVehicleWidgetStyles,
  ...customAddVehicleWidgetStyles,
};
const defaultAddedVehicleWidgetStyles = {
  background: defaultStyle.whiteColor,
  borderRadius: '24px',
  color: defaultStyle.primaryColor,
  textBelowLabelColor: defaultStyle.addedVehicleCo2Text,
  borderColor: 'transparent',
  borderWidth: '0px',
};
const customAddedVehicleWidgetStyles = JSON?.parse(process?.env?.NEXT_PUBLIC_ADDED_VEHICLE_WIDGET_STYLE || '{}');
const addedVehicleWidgetStyles = {
  ...defaultAddedVehicleWidgetStyles,
  ...customAddedVehicleWidgetStyles,
};
const customCalendarWidgetStyles = JSON?.parse(process?.env?.NEXT_PUBLIC_CALENDAR_WIDGET_STYLE || '{}');
const defaultCalendarWidgetStyles = {
  background: defaultStyle.primaryColor,
  borderRadius: '25px',
  borderColor: 'transparent',
  borderWidth: '0px',
  color: defaultStyle.secondaryColor,
  wfhSvgBackground: defaultStyle.wfhButtonColor,
  wfhSvgInnerColor: defaultStyle.secondaryColor,
  wfoSvgBackground: defaultStyle.wfoButtonColor,
  wfoSvgInnerColor: defaultStyle.secondaryColor,
};
const calendarWidgetStyles = {
  ...defaultCalendarWidgetStyles,
  ...customCalendarWidgetStyles,
};

export const widgetStyles = {
  MuiCard: {
    variants: [
      {
        props: { variant: 'calendarVariant' },
        style: {
          backgroundColor: calendarWidgetStyles?.background,
          borderRadius: calendarWidgetStyles?.borderRadius,
          borderColor: calendarWidgetStyles?.borderColor,
          borderWidth: calendarWidgetStyles?.borderWidth,
          color: calendarWidgetStyles?.color,
          borderStyle: 'solid',
        },
      },
      {
        props: { variant: 'statisticsVariant' },
        style: {
          backgroundColor: statisticsWidgetStyles?.background,
          borderRadius: statisticsWidgetStyles?.borderRadius,
          borderColor: statisticsWidgetStyles?.borderColor,
          borderWidth: statisticsWidgetStyles?.borderWidth,
          color: statisticsWidgetStyles?.color,
          borderStyle: 'solid',
        },
      },
      {
        props: { variant: 'addVehicleVariant' },
        style: {
          backgroundColor: addVehicleWidgetStyles?.background,
          borderRadius: addVehicleWidgetStyles?.borderRadius,
          borderColor: addVehicleWidgetStyles?.borderColor,
          borderWidth: addVehicleWidgetStyles?.borderWidth,
          color: addVehicleWidgetStyles?.color,
          borderStyle: 'solid',
        },
      },
      {
        props: { variant: 'addedVehicleVariant' },
        style: {
          backgroundColor: addedVehicleWidgetStyles?.background,
          borderRadius: addedVehicleWidgetStyles?.borderRadius,
          borderColor: addedVehicleWidgetStyles?.borderColor,
          borderWidth: addedVehicleWidgetStyles?.borderWidth,
          color: addedVehicleWidgetStyles?.color,
          borderStyle: 'solid',
        },
      },
    ],
  },
};

export const widgetContentColors = {
  custom: {
    calendarVariant: {
      textColor: calendarWidgetStyles?.color,
      wfhSvgBackground: calendarWidgetStyles.wfhSvgBackground,
      wfhSvgInnerColor: calendarWidgetStyles.wfhSvgInnerColor,
      wfoSvgBackground: calendarWidgetStyles.wfoSvgBackground,
      wfoSvgInnerColor: calendarWidgetStyles.wfoSvgInnerColor,
    },
    statisticsVariant: {
      textColor: statisticsWidgetStyles?.color,
      widgetBackgroundColor: statisticsWidgetStyles?.background,
      borderRadius: statisticsWidgetStyles?.borderRadius,
      borderWidth: statisticsWidgetStyles?.borderWidth,
      svgBackground: statisticsWidgetStyles.svgBackground,
      svgInnerColor: statisticsWidgetStyles.svgInnerColor,
    },
    addVehicleVariant: {
      textColor: addVehicleWidgetStyles?.color,
      widgetBackgroundColor: addVehicleWidgetStyles?.background,
    },
    addedVehicleVariant: {
      textColor: addedVehicleWidgetStyles?.color,
      textBelowLabelColor: addedVehicleWidgetStyles?.textBelowLabelColor,
    },
  },
};
