"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  Theme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import typography from "@/config/typography";
import buttonTheme from "@/config/buttonStyles";
import inputFieldTheme from "@/config/inputFieldStyles";
import { selectDropdownTheme } from "@/config/selectDropdownStyles";
import { sidebarSvgColors } from "@/config/selectDropdownStyles";
import { widgetStyles, widgetContentColors } from "@/config/widgetStyles";

interface ThemeOptions {
  // palette?: {
  //   primary: {
  //     main: string;
  //   };
  //   secondary: {
  //     main: string;
  //   };
  //   info: {
  //     main: string;
  //   };
  // };
  typography: any;
  palette: any;
  components: any;
}
const mergedColors = {
  ...widgetContentColors,
  ...sidebarSvgColors,
  custom: {
    ...widgetContentColors.custom,
    ...sidebarSvgColors.custom,
  },
};
interface ThemeProviderProps {
  children: ReactNode;
}

const themeOptions: ThemeOptions = {
  typography,
  palette: {
    ...mergedColors,
  },
  components: {
    ...buttonTheme,
    ...inputFieldTheme,
    ...selectDropdownTheme,
    ...widgetStyles,
  },
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme: Theme = useMemo(() => createTheme(themeOptions), []);
  useEffect(() => {
    const root = document.documentElement;
    root?.style?.setProperty(
      "--calendartextColor",
      theme.palette?.custom?.calendarVariant?.textColor,
    );
  }, [theme.palette?.custom?.calendarVariant?.textColor]);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
