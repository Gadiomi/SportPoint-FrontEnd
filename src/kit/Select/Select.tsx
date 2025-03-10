import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { useTheme } from '../../hooks/useTheme';

interface OptionType {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: OptionType[];
  value: OptionType | null;
  onChange: (selectedOption: OptionType | null) => void;
  customStyles?: StylesConfig<any, false>;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  customStyles = {},
  placeholder = '',
}) => {
  const mergedStyles = { ...defaultSelectStyles, ...customStyles };

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      styles={mergedStyles}
    />
  );
};

const defaultSelectStyles: StylesConfig<any, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'rgba(28, 27, 32, 1)',
    border: state.isFocused
      ? '1px solid rgba(237, 119, 47, 1)'
      : '1px solid rgba(73, 73, 73, 1)',
    color: 'rgba(248, 247, 244, 1)',
    borderRadius: '6px',
    padding: '7px 11px',
  }),
  menu: base => ({
    ...base,
    backgroundColor: 'rgba(28, 27, 32, 1)',
    borderRadius: '6px',
  }),
  option: (base, { isFocused }) => ({
    ...base,
    color: 'rgba(248, 247, 244, 1)',
    backgroundColor: isFocused ? 'rgba(237, 119, 47, 1)' : 'transparent',
    padding: '8px',
  }),
  singleValue: base => ({
    ...base,
    color: 'rgba(248, 247, 244, 1)',
  }),
};
