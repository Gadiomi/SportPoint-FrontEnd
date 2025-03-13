# TextArea Component Documentation

## Overview

The `TextArea` component is a reusable and customizable text input field built with React and styled-components. It supports custom styling, adaptive resizing, and a styled scrollbar. The component is fully responsive and adjusts to different screen sizes.

## Import

```tsx
import { TextArea } from './TextArea';
```

## Props

| **Prop**          | **Type**                                                  | **Default** | **Description**                              | **Required** |
| ----------------- | --------------------------------------------------------- | ----------- | -------------------------------------------- | ------------ |
| `value`           | `string`                                                  | `''`        | The value of the textarea.                   | ✅           |
| `placeholder`     | `string`                                                  | `''`        | Placeholder text displayed when empty.       | ❌           |
| `containerStyles` | `React.CSSProperties`                                     | `{}`        | Custom styles for the container wrapper.     | ❌           |
| `textAreaStyles`  | `React.CSSProperties`                                     | `{}`        | Custom styles for the textarea.              | ❌           |
| `disabled`        | `boolean`                                                 | `false`     | Disables user input if set to `true`.        | ❌           |
| `onChange`        | `(event: React.ChangeEvent<HTMLTextAreaElement>) => void` | `undefined` | Callback function triggered on input change. | ✅           |

## Usage

### **Basic Usage**

```tsx
import { TextArea } from './TextArea';

<TextArea
  value=""
  placeholder="Enter text here..."
  onChange={e => console.log(e.target.value)}
/>;
```

### **With Custom Styles**

```tsx
<TextArea
  value="Custom Styled"
  placeholder="Enter text here..."
  containerStyles={{ width: '400px', border: '2px solid blue' }}
  textAreaStyles={{ fontSize: '18px', color: 'blue' }}
  onChange={e => console.log(e.target.value)}
/>
```

## Responsive Behavior

The `TextArea` component is responsive and adapts to different screen sizes using `mediaRules`.

| **Breakpoint**   | **Width** | **Height** | **Padding** |
| ---------------- | --------- | ---------- | ----------- |
| `< 768px`        | `''`      | `100px`    | `6px`       |
| `768px - 1440px` | `''`      | `110px`    | `8px`       |
| `> 1440px`       | `''`      | `125px`    | `12px`      |

## Notes

- The component is styled using `styled-components`.
- The scrollbar is customized for better UI aesthetics.
- Сan Use `theme.mediaRules` for responsive adjustments.
- To fully customize the styles, pass `containerStyles` and `textAreaStyles` props.

## Conclusion

The `TextArea` component is a flexible and customizable textarea field for React applications. It provides adaptive styling, smooth resizing, and a clean user experience, making it a great choice for forms or any UI requiring text input.
