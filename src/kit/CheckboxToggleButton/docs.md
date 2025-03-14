# CheckboxToggleButton Component Documentation

## Overview

The `CheckboxToggleButton` is a styled React component designed to act as a toggle switch for boolean states. It is built using React and styled-components. This component allows users to toggle between two states, visually represented by a switch that moves when clicked. It accepts an isChecked prop to indicate the current state of the toggle and an onChange function to update the state when toggled.

## Import

```tsx
import { CheckboxToggleButton } from './CheckboxToggleButton';
```

## Props

| Prop        | Type                         | Required | Default | Description                                                                                              |
| ----------- | ---------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `isChecked` | `boolean`                    | ✅       | `N/A`   | A boolean value that controls the current checked state of the toggle.                                   |
| `onChange`  | `(checked: boolean) => void` | ✅       | `N/A`   | A function that is called when the toggle is clicked. It receives the new checked state (true or false). |

## Usage

### Basic CheckboxToggleButton Component

```tsx
import { CheckboxToggleButton } from '@/kit';

<CheckboxToggleButton isChecked={isChecked} onChange={handleToggle} />;
```

### Example with Styled Components

```tsx
import styled from 'styled-components';
import { CheckboxToggleButton } from '@/kit';

const CheckboxToggleWrapper = styled.div<{ isChecked: boolean }>`
  display: inline-block;
  width: ${({ theme }) => `${theme.pxs.x9}px`}
  height: ${({ theme }) => `${theme.pxs.x5}px`};
  border-radius: ${({ theme }) => `${theme.pxs.x4}px`};
  border: 2px solid ${({ theme }) => theme.color.mainOrange};
  background: transparent;
  position: relative;
  cursor: pointer;
`;

const CheckboxToggleCircle = styled.div<{ isChecked: boolean }>`
  width: ${({ theme }) => `${theme.pxs.x4}px`};
  height: ${({ theme }) => `${theme.pxs.x4}px`};
  border-radius: 50%;
  background: ${({ theme }) => theme.color.mainOrange};
  position: absolute;
  top: 0;
  left: ${props => (props.isChecked ? 'calc(100% - 16px)' : '0px')};
  transition: left 0.3s;
`;

## Notes

- `Default State:`  The isChecked prop does not have a default value. It should be controlled by the parent component and passed as a prop.
- `Theming:` The component relies on a theme for values like theme.pxs (for sizes) and theme.color.mainOrange. Ensure these are defined in your theme to avoid any styling issues.
- `State Management:` The onChange function will provide the updated state (true for checked, false for unchecked). This state should be controlled externally for proper usage.

## Conclusion

The `CheckboxToggleButton` is a simple, visually appealing toggle component for React applications. It is flexible and easy to integrate, allowing for a seamless user experience when toggling between two states. The component is highly customizable through styling and state management, making it suitable for a variety of use cases in modern React applications.
```
