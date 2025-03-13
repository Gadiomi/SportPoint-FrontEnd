import React from 'react';
import styled from 'styled-components';

interface CustomCheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked = false,
  onChange,
  label,
}) => (
  <CheckboxContainer>
    <CheckboxInput
      type="checkbox"
      checked={checked}
      onChange={() => onChange(!checked)}
    />
    <CheckboxLabel>{label}</CheckboxLabel>
  </CheckboxContainer>
);

const CheckboxContainer = styled.label`
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
