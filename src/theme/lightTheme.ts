import { pxs } from './pxs';
import { fonts } from './fonts';
import { breakpoints } from './breakpoints';
import { colorsLight } from './colors';
import { mediaRules } from './mediaRules';
import { ThemeState } from './constants';
import { transitions } from './transitions';

const lightTheme = {
  mediaRules,
  breakpoints,
  pxs,
  fonts,
  color: colorsLight,
  themeName: ThemeState.LIGHT,
  transitions,
};

export { lightTheme };
