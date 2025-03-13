## Typography Component Documentation

### Overview

The Typography components provide reusable text elements with predefined styles, ensuring consistent typography across the application.

### Import

```tsx
import {
  Title,
  Subtitle,
  Name,
  Main,
  Medium,
  Light,
  ButtonTypogr,
  Card,
  Small,
  About,
  PopUp,
} from './Typography';
import { FontSizes, FontWeights, LineHeights, FontFamily } from './constants';
```

### Props

Prop | Type | Required | Default | Description

children | React.ReactNode | ✅ | N/A |Content inside the text component.

style | React.CSSProperties | ❌ | undefined | Additional custom styles.

className | string | ❌ | undefined | CSS class for styling purposes.

### Components

Title

```tsx
<Title className="custom-class">Main Heading</Title>

Subtitle


<Subtitle>Subheading</Subtitle>

Name

<Name>John Doe</Name>

Main

<Main>Main paragraph text.</Main>

Medium

<Medium>Medium-weight text.</Medium>

Light

<Light>Light-weight text.</Light>

Button Typography

<ButtonTypogr>Button Text</ButtonTypogr>

Card

<Card>Card description text.</Card>

Small

<Small>Small-sized text.</Small>

About

<About>About section text.</About>

PopUp

<PopUp>Pop-up text.</PopUp>
```

### Notes

All components inherit styles from the constants.ts file.

Use style and className props for further customization.

Ensures a uniform look across the application.

### Conclusion

The Typography components provide a structured and consistent way to manage text styles, ensuring a seamless user experience across the application.
