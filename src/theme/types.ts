type colorsMap = {
  background: string;
  mainOrange: string;
  mainWhite: string;
  mainBlue: string;
  inputBar: string;
  darkGray: string;
  secWhite: string;
  white: string;
  writing: string;
  success: string;
  error: string;
  disabled: string;
};

type fontsMap = {
  [key: string]: {
    fontFamily: string;
    fontWeight: string;
    fontSize: string;
    lineHeight?: string;
  };
};

type pxsMap = {
  x0: number;
  x0_5: number;
  x1: number;
  x1_5: number;
  x2: number;
  x2_5: number;
  x3: number;
  x3_5: number;
  x4: number;
  x4_5: number;
  x5: number;
  x5_5: number;
  x6: number;
  x6_5: number;
  x7: number;
  x7_5: number;
  x8: number;
  x8_5: number;
  x9: number;
  x9_5: number;
  x10: number;
  x10_5: number;
  x11: number;
  x11_5: number;
  x12: number;
};

type breakpointsMap = {
  mobile: number;
  tablet: number;
  desktop: number;
};

type mediaRulesMap = {
  up: (breakpoint: number, vertical?: boolean) => string;
  down: (breakpoint: number, vertical?: boolean) => string;
  between: (
    breakpointMin: number,
    breakpointMax: number,
    vertical?: boolean,
  ) => string;
};

type transitionsMap = {
  base: string;
};

type themeType = {
  pxs: pxsMap;
  fonts: fontsMap;
  color: colorsMap;
  breakpoints: breakpointsMap;
  mediaRules: mediaRulesMap;
  transitions: transitionsMap;
};

interface ThemeContextType {
  theme: themeType;
  toggleTheme: () => void;
}

export type {
  breakpointsMap,
  colorsMap,
  fontsMap,
  mediaRulesMap,
  pxsMap,
  themeType,
  ThemeContextType,
  transitionsMap,
};
