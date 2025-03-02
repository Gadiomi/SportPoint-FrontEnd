## Icon Component Documentation

### Overview

The `Icon` component is a reusable SVG-based component that allows rendering icons from a sprite file.

### Importing the Component

```tsx
import { Icon } from './Icon';
import { IconName } from './constants';
```

### Props

| Prop Name | Type               | Default       | Description                                         |
| --------- | ------------------ | ------------- | --------------------------------------------------- |
| `name`    | `IconName`         | Required      | The name of the icon, must be from `IconName` enum. |
| `color`   | `string`           | `black`       | The color of the icon.                              |
| `width`   | `string`           | `30px \| rem` | The width of the icon.                              |
| `height`  | `string`           | `30px \| rem` | The height of the icon.                             |
| `size`    | `string \| number` | `null`        | Overrides `width` and `height` when specified.      |

### Usage Examples

#### Basic Usage

```tsx
<Icon name={IconName.CHECK} />
```

#### Custom Color and Size

```tsx
<Icon name={IconName.CROSS} color="red" size="40px" />
```

#### Inherit color

```tsx
<Icon name={IconName.CROSS} color="currentColor" size="40px" />
```

#### Using Width and Height Separately

```tsx
<Icon name={IconName.CHECK} width="50px" height="50px" color="green" />
```

#### Adding a Custom Class

```tsx
<Icon name={IconName.CROSS} className="custom-icon" />
```

### SVG Asset Path

The component expects an SVG sprite file at `/assets/svg/symbol-defs.svg`. Ensure that the sprite contains definitions for the icons, e.g.,

```xml
<symbol id="check" viewBox="0 0 24 24">...</symbol>
<symbol id="cross" viewBox="0 0 24 24">...</symbol>
```

### Notes

- The `size` prop takes precedence over `width` and `height` if provided.
- The `color` prop applies to the `svg`, but additional styling might be required.
- The `href` and `xlinkHref` attributes reference the correct symbol inside the SVG sprite.

### Troubleshooting

- **Icons not appearing?** Ensure that the sprite file exists at `/assets/svg/symbol-defs.svg` and contains the expected symbol IDs.
- **Color not applying?** Some browsers require explicitly setting `fill="currentColor"` within the SVG symbols.
- **Wrong icon showing?** Verify that `IconName` values match the IDs inside the sprite file.

---

This documentation provides an overview of how to use the `Icon` component effectively. If you have any questions, feel free to reach out! 🚀
