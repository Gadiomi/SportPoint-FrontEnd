import { pxs } from './pxs';
import { fonts } from './fonts';
import { breakpoints } from './breakpoints';
import { colorsDark } from './colors';
import { mediaRules } from './mediaRules';
import { ThemeState } from './constants';
import { transitions } from './transitions';

const darkTheme = {
  mediaRules,
  breakpoints,
  pxs,
  fonts,
  color: colorsDark,
  themeName: ThemeState.DARK,
  transitions,
};

export { darkTheme };
