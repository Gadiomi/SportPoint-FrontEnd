# CustomSelect Component Documentation

## Overview

The CustomSelect component is a reusable and customizable dropdown select input built with react-select. It supports different styles, searchable functionality, and customizable options. It allows seamless integration into your application with flexible customization options.

## Import

import { CustomSelect } from './CustomSelect';

## Props

**Prop** | **Type** | **Default** | **Description** | **Required**
_options_ | "OptionType[]" | N/A | An array of options to display in the dropdown. | ✅
_value_ | "OptionType | null" | null | --- | ✅
_onChange_ | "(
newValue: OptionType | null,
actionMeta: ActionMeta<OptionType>,
) => void;" | N/A | --- | ✅
_styles_ | "" | {} | Custom styles to override the default styles. | ❌
_placeholder_ | "" | '' | Placeholder text displayed when no option is selected. | ❌
_isSearchable_ | "" | true | Whether the select input is searchable. | ❌

## Usage

**Basic Usage**

```tsx
import { CustomSelect } from './CustomSelect';

<CustomSelect
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  value={null}
  onChange={newValue => console.log(newValue)}
  placeholder="Select an option"
/>;
```

**Custom Styles**

```tsx
import { CustomSelect } from './CustomSelect';
import { useTheme } from 'styled-components';

const customStyles = {
  control: base => ({
    ...base,
    backgroundColor: 'lightblue',
    border: '1px solid gray',
  }),
};

<CustomSelect
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  value={null}
  onChange={newValue => console.log(newValue)}
  styles={customStyles}
/>;
```

## Notes

The options prop should contain an array of objects with value and label properties.
The value prop should be set to an object from the options array, or null if no option is selected.
The onChange function provides the new value of the select input, which can be used to update the selected value in the parent component.
The styles prop allows full customization of the react-select styles.
Make sure the theme object is available in the styled-components context to customize styles effectively.

## Conclusion

The CustomSelect component is a highly customizable and reusable dropdown UI element designed for flexible usage in React applications. It supports options for searchability, styles, and handling changes, making it an excellent choice for forms or any other UI where a select input is needed.
