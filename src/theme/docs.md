# Themed Application Documentation

## Components and Code Explanation

```tsx
import styled from 'styled-components';
import { useTheme } from 'hooks';

function App() {
  const { theme } = useTheme();
  return <Wrapper $props={'hello there'}>{JSON.stringify(theme)}</Wrapper>;
}

const Wrapper = styled.div<{ $props: string }>(({ theme, $props }) => {
  console.log('$props', $props);
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.color.mainColor,

    [theme.mediaRules.up(theme.breakpoints.tablet)]: {
      backgroundColor: 'red',
    },

    [theme.mediaRules.up(theme.breakpoints.desktop)]: {
      backgroundColor: 'blue',
    },
  };
});
```
