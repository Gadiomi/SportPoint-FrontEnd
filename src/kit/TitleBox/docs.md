# TitleBox Component Documentation

## Overview

TitleBox is a component that displays an icon and a title with customizable styles for the icon, text, and container. It uses React, styled-components, and @/kit.

## Import

```tsx
import { TitleBox } from './TitleBox';
```

## Props

| **Prop**    | **Type**              | **Default**   | **Description**                                                | **Required** |
| ----------- | --------------------- | ------------- | -------------------------------------------------------------- | ------------ |
| `iconName`  | `IconName`            | `ARROW_RIGHT` | The icon name from the IconName set.                           | ❌           |
| `title`     | `string`              | `-`           | The title text.                                                | ✅           |
| `iconColor` | `string`              | `-`           | The icon color.                                                | ❌           |
| `iconSize`  | `string`              | `-`           | The icon size.                                                 | ❌           |
| `iconStyle` | `React.CSSProperties` | `-`           | Custom styles for the icon.                                    | ❌           |
| `boxStyle`  | `React.CSSProperties` | `-`           | Custom styles for the container that holds the title and icon. | ✅           |

## Usage

### **Basic Usage**

```tsx
<TitleBox title="Contacts" />
```

### **With Custom Styles**

```tsx
<TitleBox
  title="Contacts"
  iconName={IconName.PHONE}
  iconSize="24px"
  iconColor="blue"
  iconStyles={{ marginRight: '10px' }}
  boxStyle={{ padding: '10px', backgroundColor: 'lightgray' }}
/>
```

## Notes

- The component uses styled-components for styling.
- The props iconName, iconSize, and iconStyles allow customizing the icon, while boxStyle allows customizing the container.
- The component is flexible for various UI needs and provides easy styling customization.

## Conclusion

TitleBox is a flexible component for displaying titles with icons, offering customization options for both the icon and container styles. This makes it a versatile choice for various UI layouts.
