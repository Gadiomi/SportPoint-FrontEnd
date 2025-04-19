import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  testId: string;
  value: string;
  errorMessage?: string;
  label?: ReactNode;
  appendChild?: React.ReactNode;
  containerStyles?: React.CSSProperties;
  labelStyles?: React.CSSProperties;
  inputStyles?: React.CSSProperties;
  errorTextStyles?: React.CSSProperties;
  invalid?: boolean;
}

export function Input({
  testId,
  type = 'text',
  value,
  onChange,
  errorMessage,
  label,
  appendChild,
  containerStyles,
  inputStyles,
  labelStyles,
  errorTextStyles,
  disabled,
  invalid,
  name,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer
      disabled={disabled}
      style={containerStyles}
      $isFocused={isFocused}
      $hasValue={value.length > 0}
      $invalid={invalid}
    >
      <InputField
        {...rest}
        style={inputStyles}
        data-test-id={testId}
        type={type}
        id={name}
        name={name}
        autoComplete="off"
        value={value}
        onFocus={e => {
          setIsFocused(true);
          if (rest.onFocus) {
            rest.onFocus(e);
          }
        }}
        onBlur={e => {
          setIsFocused(false);
          if (rest.onBlur) {
            rest.onBlur(e);
          }
        }}
        onChange={onChange}
        disabled={disabled}
      />
      {label && (
        <PlaceholderLabel
          style={labelStyles}
          $isFocused={isFocused || Boolean(errorMessage)}
          $hasValue={value.length > 0}
        >
          {label}
        </PlaceholderLabel>
      )}
      {errorMessage && (
        <ErrorText style={errorTextStyles}>{errorMessage}</ErrorText>
      )}
      {appendChild && appendChild}
    </InputContainer>
  );
}

const InputContainer = styled.div<{
  disabled?: boolean;
  $isFocused: boolean;
  $hasValue: boolean;
  $invalid?: boolean;
}>(({ theme, disabled, $isFocused, $hasValue, $invalid }) => {
  const transitionElements = ['border-color', 'color'];

  return {
    position: 'relative',
    display: 'flex',
    ...theme.fonts.lightManrope,
    color: theme.color.secWhite,
    borderRadius: `${theme.pxs.x1}px`,
    border: `0.5px solid ${theme.color.secWhite}`,
    transition: transitionElements
      .map(prop => `${prop} ${theme.transitions.base}`)
      .join(', '),

    ...($invalid && {
      color: theme.color.error,
      borderColor: theme.color.error,
    }),
    ...(!$invalid &&
      $hasValue && {
        color: theme.color.success,
        borderColor: theme.color.success,
      }),

    ...($isFocused && {
      color: theme.color.writing,
      borderColor: theme.color.writing,
    }),
    ...(disabled && {
      color: theme.color.disabled,
      borderColor: theme.color.disabled,
      cursor: 'not-allowed',
    }),
  };
});

const InputField = styled.input(({ theme }) => {
  const resetBorders = { outline: 'none', border: 'none' };
  return {
    all: 'unset',
    flex: 1,
    padding: `${theme.pxs.x2}px`,
    ...resetBorders,
    ['&:focus']: {
      ...resetBorders,
    },
    ['&:disabled']: {
      ...resetBorders,
    },
  };
});

const PlaceholderLabel = styled.label<{
  $isFocused: boolean;
  $hasValue: boolean;
}>(({ $isFocused, $hasValue, theme }) => {
  return {
    position: 'absolute',
    top: $isFocused || $hasValue ? '0' : '50%',
    left: theme.pxs.x2,
    backgroundColor: theme.color.background,
    transform: 'translateY(-50%)',
    transition: `top ${theme.transitions.base}`,
    pointerEvents: 'none',
  };
});

const ErrorText = styled.span(({ theme }) => ({
  color: theme.color.error,
  position: 'absolute',
  bottom: '0',
  transform: 'translateY(50%)',
  left: theme.pxs.x2,
  backgroundColor: theme.color.background,
}));
