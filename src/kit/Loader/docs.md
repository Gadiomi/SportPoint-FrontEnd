# Loader Component

The `Loader` component is an animated SVG loader that can be used to display a loading indicator in your application.

## Description

The `Loader` component renders a rotating circle icon. You can customize its size, stroke color, and stroke width. It uses the `StyledSVG` component to apply the rotation animation.

## Example Usage

```jsx
import { Loader } from './Loader';

function App() {
  return (
    <div>
      <Loader size="50px" stroke="blue" strokeWidth="3" />
    </div>
  );
}
```

## Props

Required
`strokeWidth`: string — The stroke width of the icon. For example: "2".
Optional
`size`: string (default: '16px') — The size of the icon. This can be any valid CSS value, such as "50px", "2rem".
`stroke`: string (default: undefined) — The stroke color. You can pass any color, such as "red", "blue", or use theme color variables.
`...rest`: Any other attributes that can be passed to the SVG element, such as className, style, etc.

## Component Structure

The component consists of the following main parts:

`Loader`: This is the main functional component that renders the SVG element with a path that defines the animation.
`StyledSVG`: A styled SVG component that applies the rotation animation and sets the size and stroke color.
