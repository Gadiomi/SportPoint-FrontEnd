# Input Component Documentation

## Overview

The `Input` component is a reusable text input field that includes support for validation status, error messages, label, and custom styles. It can be used to collect text input in a form or UI while providing visual feedback such as success, warning, or error states. The component is styled with `styled-components` and can be customized with different styles and behaviors.

## Props

- **`testId`** (string): A unique identifier for testing purposes.
- **`value`** (string): The value of the input field.
- **`onChange`** (function): The callback function that handles the change event when the value of the input is modified.
- **`inputValidateStatus`** (InputValidateStatus): The validation status of the input field, used to determine the input's appearance (e.g., success, error).
- **`errorMessage`** (string | null): The error message to display when the validation status is an error. If null, no error message will be shown.
- **`label`** (string | undefined): The label text that appears above the input field. If not provided, no label is rendered.
- **`appendChild`** (React.ReactNode | undefined): A React node (e.g., an icon or button) that will be rendered after the input field.
- **`containerStyles`** (React.CSSProperties | undefined): Custom styles for the container of the input field (wraps the input and other elements).
- **`inputStyles`** (React.CSSProperties | undefined): Custom styles for the input element itself.
- **`labelStyles`** (React.CSSProperties | undefined): Custom styles for the label element.
- **`errorTextStyles`** (React.CSSProperties | undefined): Custom styles for the error message element.
- **`disabled`** (boolean | undefined): Boolean value to disable the input field, preventing user interaction. Default is `false`.

## Usage

### Basic Example

```tsx
<Input
  testId="email-input"
  value={email}
  onChange={e => setEmail(e.target.value)}
  inputValidateStatus={InputValidateStatus.SUCCESS}
  errorMessage={null}
  label="Email Address"
/>
```

### React hook forms usage

```tsx
const {
  register,
  handleSubmit,
  reset,
  control,
  formState: { errors },
  clearErrors,
} = useForm<logInFormInputs>({
  resolver: yupResolver(LogInFormSchema),
  defaultValues: { email: '', password: '' },
  mode: 'onBlur',
});

<Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => {
    return (
      <Input
        {...field}
        testId="email-input"
        label="Email"
        errorMessage={fieldState.error?.message || null}
        invalid={fieldState.invalid}
      />
    );
  }}
/>;
```
