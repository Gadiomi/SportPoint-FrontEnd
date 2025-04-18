import React from 'react';
import styled from 'styled-components';

interface CustomCheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  errorMessage?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked = false,
  onChange,
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  errorMessage,
}) => (
  <CheckboxContainer style={containerStyle}>
    <CheckboxInput
      type="checkbox"
      checked={checked}
      onChange={() => onChange(!checked)}
      style={inputStyle}
    />
    <CheckboxLabel style={labelStyle}>{label}</CheckboxLabel>
    {errorMessage && <ErrorText>{errorMessage}</ErrorText>}{' '}
    {/* Відображення помилки */}
  </CheckboxContainer>
);

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border: 1px solid ${({ theme }) => theme.color.mainWhite};
  border-radius: 6px;
  accent-color: ${({ theme }) => theme.color.mainOrange};
`;

const CheckboxLabel = styled.span`
  ${({ theme }) => theme.fonts.lightManrope};
  color: ${({ theme }) => theme.color.mainWhite};
`;

const ErrorText = styled.span(({ theme }) => ({
  color: theme.color.error,
  ...theme.fonts.lightManrope,
}));
