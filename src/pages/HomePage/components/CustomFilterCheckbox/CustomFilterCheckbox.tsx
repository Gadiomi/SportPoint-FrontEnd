import React from 'react';
import styled from 'styled-components';

interface CustomFilterCheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const CustomFilterCheckbox: React.FC<CustomFilterCheckboxProps> = ({
  checked = false,
  onChange,
  label,
}) => {
  return (
    <CheckboxWrapper>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        id={`checkbox-${label}`}
      />
      <CheckboxLabel htmlFor={`checkbox-${label}`} checked={checked}>
        {label}
      </CheckboxLabel>
    </CheckboxWrapper>
  );
};
export const CheckboxWrapper = styled.div({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'auto',
});
export const CheckboxInput = styled.input({
  display: 'none',
});

export const CheckboxLabel = styled.label<{ checked: boolean }>(
  ({ theme, checked }) => ({
    padding: '5px 12px',
    borderRadius: '60px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '400',
    userSelect: 'none',
    textAlign: 'center',
    border: `1px solid ${theme.color.mainBlue}`,
    transition: 'background-color 0.3s ease, color 0.3s ease',
    backgroundColor: checked ? theme.color.mainBlue : theme.color.background,
    color: theme.color.white,

    '&:hover': {
      opacity: 0.9,
    },
  }),
);
