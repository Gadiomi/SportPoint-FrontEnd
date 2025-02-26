# Internationalization (i18n) Documentation

## Example JSON Translation Files

### `en.json`

```json
{
  "welcome": "Welcome to our application!",
  "description": "This is a sample description in English."
}
```

### `ua.json`

```json
{
  "welcome": "Ласкаво просимо до нашого додатку!",
  "description": "Це приклад опису українською мовою."
}
```

## Using the Translation Hook in Components

To use translations inside a React component, utilize the `useTranslation` hook:

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

export default MyComponent;
```

## Utility Function for Translating Strings

You can create a utility function for translating strings programmatically:

```js
import i18next from 'i18next';

export const translate = (key, options = {}) => {
  return i18next.t(key, options);
};
```

### Usage Example in Another File

```js
import { translate } from './utils/translate';

console.log(translate('welcome'));
```

## Changing Language Programmatically

To switch languages dynamically, use:

```js
import i18next from 'i18next';

i18next.changeLanguage('en'); // Switch to English
```

## Summary

- Use `useTranslation` in React components for dynamic text.
- Utilize the `translate` utility for functional use outside of components.
- Change languages dynamically using `i18next.changeLanguage`.

This setup ensures seamless multi-language support in your project.
