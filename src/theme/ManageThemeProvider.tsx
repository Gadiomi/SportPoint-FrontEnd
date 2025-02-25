import React from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { ThemeState } from './constants';
import { ThemeContextType } from './types';
import { LocalStorageKey } from 'constants';

interface Props {
  children: React.ReactNode;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ManageThemeProvider = ({ children }: Props) => {
  const [themeState, setThemeState] = useLocalStorage<ThemeState>(
    LocalStorageKey.THEME,
    ThemeState.LIGHT,
  );

  const toggleTheme = () => {
    setThemeState(
      themeState === ThemeState.LIGHT ? ThemeState.DARK : ThemeState.LIGHT,
    );
  };

  const setTheme = (themeState: ThemeState) => {
    switch (themeState) {
      case ThemeState.LIGHT:
        return lightTheme;
      case ThemeState.DARK:
        return darkTheme;
      default:
        return lightTheme;
    }
  };

  const theme = React.useMemo(() => setTheme(themeState), [themeState]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
export { ManageThemeProvider, ThemeContext };
