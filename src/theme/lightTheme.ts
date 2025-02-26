import { pxs } from './pxs';
import { fonts } from './fonts';
import { breakpoints } from './breakpoints';
import { colorsLight } from './colors';
import { mediaRules } from './mediaRules';
import { ThemeState } from './constants';

const lightTheme = {
  mediaRules,
  breakpoints,
  pxs,
  fonts,
  color: colorsLight,
  themeName: ThemeState.LIGHT,
};

export { lightTheme };
