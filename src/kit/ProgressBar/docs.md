# ProgressBar Component Documentation

## Overview

The `ProgressBar` component is a reusable and customizable progress bar built with React and styled-components. It visually represents the progress of a task by filling up based on the current step and total steps. It is fully responsive and adjusts to different screen sizes using theme breakpoints.

## Import

```tsx
import { ProgressBar } from './ProgressBar';
```

## Props

| **Prop**          | **Type**            | **Default** | **Description**                                                 | **Required** |
| ----------------- | ------------------- | ----------- | --------------------------------------------------------------- | ------------ |
| step              | number              | 0           | The current step (should be a number between 1 and totalSteps). | ✅           |
| totalSteps        | number              | 1           | The total number of steps for the progress bar.                 | ✅           |
| containerStyles   | React.CSSProperties | {}          | Custom styles for the container of the progress bar.            | ❌           |
| progressBarStyles | React.CSSProperties | {}          | Custom styles for the actual progress bar.                      | ❌           |

## Usage

### **Basic Usage**

```tsx
import { ProgressBar } from './ProgressBar';

const Example = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  return (
    <div>
      <ProgressBar step={step} totalSteps={totalSteps} />
      {/* Other content */}
    </div>
  );
};
```

### **With Custom Step Changes**

You can modify the current step value based on user interaction (e.g., button clicks):

```tsx
import { ProgressBar } from './ProgressBar';
import { useState } from 'react';

const Example = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  return (
    <div>
      <ProgressBar step={step} totalSteps={totalSteps} />
      <button onClick={() => setStep(prev => prev + 1)}>Next</button>
      <button onClick={() => setStep(prev => prev - 1)}>Back</button>
    </div>
  );
};
```

## Notes

- The component is styled using styled-components.
- The width of the progress bar is calculated as (step / totalSteps) \* 100.
- It uses the theme object for consistent styling across the application.
- The progress bar's width is animated with a smooth transition for visual effect.
- The component adapts to different screen sizes via theme.mediaRules.
- You can customize the appearance of the progress bar and its container by passing containerStyles and progressBarStyles props.

## Conclusion

The ProgressBar component is a simple, responsive, and customizable progress indicator. It allows you to visualize progress in tasks or processes with ease, making it suitable for forms, multi-step processes, or any UI that requires step-based progress tracking.
