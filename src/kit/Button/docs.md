# Button Component Documentation

## Overview

The `Button` component is a reusable UI element that supports different styles, customizable content, and accessibility attributes.

## Import

```tsx
import { Button, ButtonAppearance } from './Button';
```

## Props

| Prop           | Type                                        | Required | Default                    | Description                            |
| -------------- | ------------------------------------------- | -------- | -------------------------- | -------------------------------------- |
| `title`        | `string`                                    | ✅       | `N/A`                      | Text to display inside the button.     |
| `appendChild`  | `React.ReactNode`                           | ❌       | `undefined`                | Element to be placed after the text.   |
| `prependChild` | `React.ReactNode`                           | ❌       | `undefined`                | Element to be placed before the text.  |
| `testId`       | `string`                                    | ✅       | `N/A`                      | Test identifier for automated testing. |
| `textStyle`    | `React.CSSProperties`                       | ❌       | `undefined`                | Custom styles for the button text.     |
| `appearance`   | `ButtonAppearance` (`primary`, `secondary`) | ❌       | `ButtonAppearance.PRIMARY` | Defines the button style.              |
| `disabled`     | `boolean`                                   | ❌       | `false`                    | Disables the button when `true`.       |
| `type`         | `button` \| `submit` \| `reset`             | ❌       | `'button'`                 | Specifies the button type.             |

## Usage

### Basic Button

```tsx
<Button testId="submit-button" title="Submit" />
```

### Button with Icons

```tsx
import { Icon, IconName } from './Icon';

<Button
  testId="icon-button"
  title="Confirm"
  prependChild={<Icon name={IconName.CHECK} />}
  appendChild={<Icon name={IconName.CHECK} />}
/>;
```

### Styled Button

```tsx
import styled from 'styled-components';
import { Button } from '@/kit';

const StyledButton = styled(Button).attrs(({ theme }) => ({
  textStyle: { fontSize: theme.pxs.x1 },
}))({});

<StyledButton testId="styled-button" title="Styled" />;
```

## Notes

- The `appearance` prop can be extended to support more styles.
- Ensure that the `theme` object is available in the `styled-components` context.
- The `testId` prop is useful for automated testing frameworks like Jest and Cypress.

## Conclusion

The `Button` component is a flexible and customizable UI element that supports various styles and interactions. Use it to create consistent button elements across your application.
