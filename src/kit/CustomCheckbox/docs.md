# CustomCheckbox Component Documentation

## Overview

The `CustomCheckbox` component is a reusable, styled checkbox input field built with React and styled-components. It allows users to select or unselect an option by clicking on a checkbox. It accepts a `checked` state to reflect its current status and an `onChange` function to update the checkbox's state.

## Import

```tsx
import { CustomCheckbox } from './CustomCheckbox';
```

## Props

| Prop       | Type                         | Required | Default | Description                                                                                                |
| ---------- | ---------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `checked`  | `boolean`                    | ❌       | `false` | Optional prop to control the checked state of the checkbox. Defaults to false.                             |
| `onChange` | `(checked: boolean) => void` | ✅       | `N/A`   | A function that is called when the checkbox state changes. The new checked state is passed as an argument. |
| `label`    | `string`                     | ✅       | `N/A`   | The label text that is displayed next to the checkbox.                                                     |

## Usage

### Basic CustomCheckbox Component

```tsx
import { CustomCheckbox } from '@/kit';

<CheckboxContainer>
  <CheckboxInput
    type="checkbox"
    checked={checked}
    onChange={() => onChange(!checked)}
  />
  <CheckboxLabel>{label}</CheckboxLabel>
</CheckboxContainer>;
```

### Example with Styled Components

```tsx
import styled from 'styled-components';
import { CustomCheckbox } from '@/kit';

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border: 1px solid ${({ theme }) => theme.color.mainWhite};
  border-radius: 6px;
  accent-color: ${({ theme }) => theme.color.mainOrange};
`;

const CheckboxLabel = styled.span`
  ${({ theme }) => theme.fonts.lightManrope};
  color: ${({ theme }) => theme.color.mainWhite};
`;

## Notes

- `Default State:` The checked prop defaults to false if not provided, but it is a good practice to always define it explicitly, especially when managing form states to avoid any unexpected behaviors.
- `Theming:` Ensure that your theme object contains appropriate color and font values for theme.color.mainWhite, theme.color.mainOrange, and theme.fonts.lightManrope. Otherwise, the component may not render properly or as expected.
- `State Management:` The onChange callback provides the updated checkbox state (i.e., true for checked, false for unchecked), which can be used to control the state externally. If you are using this component in forms, make sure to manage the state properly to ensure proper form validation and submission.

## Conclusion

The `CustomCheckbox` component is a flexible and easy-to-use checkbox component with a clean, modern design that can be easily integrated into your React application. It is customizable through theming and allows for a seamless user experience with the ability to toggle checkbox states.
```
