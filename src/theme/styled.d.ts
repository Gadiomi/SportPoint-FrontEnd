import 'styled-components';

import {
  colorsMap,
  fontsMap,
  pxsMap,
  breakpointsMap,
  mediaRulesMap,
} from './types';

declare module 'styled-components' {
  export interface DefaultTheme {
    pxs: pxsMap;
    fonts: fontsMap;
    color: colorsMap;
    breakpoints: breakpointsMap;
    mediaRules: mediaRulesMap;
  }
}
