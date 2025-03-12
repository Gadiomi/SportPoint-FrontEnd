import React from 'react';
import Select, { ActionMeta, StylesConfig } from 'react-select';
import { useTheme } from 'styled-components';

interface OptionType {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: OptionType[];
  value: OptionType | null;
  onChange: (
    newValue: OptionType | null,
    actionMeta: ActionMeta<OptionType>,
  ) => void;
  styles?: StylesConfig<OptionType, false>;
  placeholder?: string;
  isSearchable?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  styles = {},
  placeholder = '',
  isSearchable = true,
}) => {
  const theme = useTheme();

  const customStyles: StylesConfig<OptionType, false> = {
    control: (base, state) => ({
      ...base,
      outline: 'none',
      boxShadow: 'none',
      backgroundColor: theme.color.background,
      border: `1px solid ${theme.color.secWhite}`,
      color: theme.color.white,
      borderRadius: state.menuIsOpen ? '6px 6px 0 0' : '6px',
      padding: theme.pxs.x2,
      '&:hover': {
        border: `1px solid ${theme.color.secWhite}`,
      },
    }),
    input: base => ({
      ...base,
      color: theme.color.mainWhite,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.selectProps.menuIsOpen
        ? theme.color.mainWhite
        : theme.color.secWhite,
      transition: `transform  ${theme.transitions.rotate}`,
      transform: state.selectProps.menuIsOpen
        ? 'rotate(180deg)'
        : 'rotate(0deg)',
      padding: theme.pxs.x0,
      '& svg': {
        width: theme.pxs.x6,
        height: theme.pxs.x6,
      },
      '&:hover svg': {
        fill: theme.color.mainWhite,
        stroke: theme.color.mainWhite,
      },
    }),
    indicatorSeparator: base => ({
      ...base,
      display: 'none',
    }),
    menu: base => ({
      ...base,
      backgroundColor: theme.color.background,
      borderRadius: '0 0 6px 6px',
      marginTop: '-1px',
      padding: theme.pxs.x2,
      border: `1px solid ${theme.color.secWhite}`,
      borderTop: 'none',
    }),

    option: base => ({
      ...base,
      color: theme.color.background,
      backgroundColor: theme.color.white,
      padding: theme.pxs.x2,
      cursor: 'pointer',
      ':first-of-type': {
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
      },
      ':last-of-type': {
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
      },
    }),
    singleValue: base => ({
      ...base,
      color: theme.color.white,
      padding: theme.pxs.x0,
      margin: theme.pxs.x0,
    }),
    ...styles,
  };
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      styles={customStyles}
      isSearchable={isSearchable}
    />
  );
};
