import { FC, useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { useTheme } from 'styled-components';
import { CitySelectProps, OptionType } from './types';

const CitySelect: FC<CitySelectProps> = ({
  options,
  field,
  placeholder,
  onMenuOpen,
  onMenuClose,
  onInputChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<OptionType | null>(null);
  console.log(options);
  useEffect(() => {
    const currentValue =
      options.find(
        option => option.value !== '' && option.value === field.value,
      ) || null;
    setSelectedValue(currentValue);
  }, [field.value, options]);

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
      padding: theme.pxs.x1,
      fontSize: '14px',

      '&:hover': {
        border: `1px solid ${theme.color.secWhite}`,
      },
    }),
    valueContainer: base => ({
      ...base,
      padding: '0px 8px',
    }),
    input: base => ({
      ...base,
      color: theme.color.mainWhite,
    }),
    indicatorsContainer: base => ({
      ...base,
      width: 'auto',
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
      ':not(:last-of-type)': {
        borderBottom: `1px solid ${theme.color.secWhite}`,
      },
    }),
    singleValue: base => ({
      ...base,
      color: theme.color.white,
      padding: theme.pxs.x0,
      margin: theme.pxs.x0,
    }),
    // ...styles,
  };

  return (
    <Select
      {...field}
      options={options}
      value={selectedValue}
      onChange={selectedOption =>
        field.onChange(selectedOption ? selectedOption.value : '')
      }
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      placeholder={placeholder}
      styles={customStyles}
      menuPortalTarget={null}
      menuPosition="absolute"
      onInputChange={onInputChange}
    />
  );
};

export default CitySelect;
