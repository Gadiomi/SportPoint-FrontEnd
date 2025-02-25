const mediaRules = {
  up: (breakpoint: number, vertical = false) =>
    `@media (min-${vertical ? 'height' : 'width'}: ${breakpoint}px)`,
  down: (breakpoint: number, vertical = false) =>
    `@media (max-${vertical ? 'height' : 'width'}: calc(${breakpoint}px - 0.02px))`,
  between: (breakpointMin: number, breakpointMax: number, vertical = false) =>
    `@media (max-${vertical ? 'height' : 'width'}: ${breakpointMax}px) and (min-${
      vertical ? 'height' : 'width'
    }: ${breakpointMin}px)`,
};

export { mediaRules };
