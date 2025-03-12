# Toast Component Documentation

## Overview

The Toast component is a reusable and customizable toast notification system built with React, react-toastify, and styled-components. It provides a simple way to display success, error, information, and warning messages. The component supports custom styling and adapts to the current theme.

## Import

```tsx
import { useToast } from './useToast';
import { ToastProvider } from './ToastProvider';
import { ToastType } from './constants';
```

## Props

useToast Hook

| **Prop**  | **Type**                                          | **Default** | **Description**                                                                             | **Required** |
| --------- | ------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- | ------------ |
| `message` | `string`                                          | `''`        | The message to be displayed in the toast notification.                                      | ✅           |
| `type`    | `ToastType (enum: success, error, info, warning)` | `info`      | The type of toast to be displayed.                                                          | ✅           |
| `options` | `Record<string, unknown>`                         | `{}`        | Optional additional options for customizing the toast behavior (e.g., autoClose, position). | ❌           |

## ToastProvider Component

**position** - string - Position of the toast on the screen (e.g., top-left, top-right, bottom-left, bottom-right).
autoClose - number - Time (in milliseconds) for the toast to automatically close.
hideProgressBar - boolean - Whether to hide the progress bar of the toast.
newestOnTop - boolean - Whether the newest toast appears on top.
closeOnClick - boolean - Whether the toast closes on click.
pauseOnFocusLoss - boolean - Whether the toast pauses when focus is lost from the window.
draggable - boolean - Whether the toast is draggable.
pauseOnHover - boolean - Whether the toast pauses when hovered.

## Usage

### **Basic Usage**

```tsx
import { useToast } from './useToast';

const MyComponent = () => {
  const { showToast } = useToast();

  return (
    <button
      onClick={() => showToast('Operation successful!', ToastType.SUCCESS)}
    >
      Show Success Toast
    </button>
  );
};
```

### **With Custom Styles**

```tsx
import { useToast } from './useToast';

const MyComponent = () => {
  const { showToast } = useToast();

  return (
    <button
      onClick={() =>
        showToast('Warning! Something went wrong.', ToastType.WARNING, {
          autoClose: 5000,
        })
      }
    >
      Show Warning Toast
    </button>
  );
};
```

### **RTK Query**

```tsx
import { useGetDataQuery } from '../services/api';
import { useToast, ToastType } from './useToast';
import { useEffect } from 'react';

export const MyComponent = () => {
  const { showToast } = useToast();
  const { data, error, isSuccess } = useGetDataQuery();

  useEffect(() => {
    if (isSuccess) {
      showToast('Success', ToastType.SUCCESS);
    }
    if (error) {
      showToast('Some error!', ToastType.ERROR);
    }
  }, [isSuccess, error]);

  return <div>{data ? 'Дані отримані' : 'Завантаження...'}</div>;
};
```

## Notes

- The component uses react-toastify for displaying toasts.
- Styling is done via styled-components with access to the theme for dynamic styles.
- You can customize the colors of the toast background, text, icons, and close button.
- Use ToastProvider to ensure global toast management in your app.

## Conclusion

The Toast component provides a simple, reusable way to display notifications in your React application. It is highly customizable and supports different toast types (success, error, info, warning). With support for theming and responsive styles, it can be seamlessly integrated into your app.
