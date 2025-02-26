import React from 'react';

import { ThemeContext, ThemeContextType } from 'theme';

export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ManageThemeProvider');
  }
  return context;
};
