import React, { useCallback, useMemo, useState } from 'react';
import { CustomFilterCheckbox } from '../../CustomFilterCheckbox/CustomFilterCheckbox';
import { WrapperFilterCheckbox } from '../SortBy/styles';

interface ClassificationProps {
  classification: string[];
  onChange: (newFilters: string[]) => void;
}

export const Classification: React.FC<ClassificationProps> = ({
  classification,
  onChange,
}) => {
  const handleFilterChange = useCallback(
    (filter: string) => {
      const newSelectedFilters = classification.includes(filter)
        ? classification.filter(f => f !== filter)
        : [...classification, filter];
      onChange(newSelectedFilters);
    },
    [classification, onChange],
  );

  const options = useMemo(
    () => [
      { value: 'stretching', label: 'Стреччинг' },
      { value: 'cardio', label: 'Кардіо' },
      { value: 'yoga', label: 'Йога' },
      { value: 'crossfit', label: 'Кросфіт' },
      { value: 'TRX', label: 'TRX' },
      { value: 'fitness', label: 'Фітнес' },
    ],
    [],
  );

  const checkboxes = useMemo(
    () =>
      options.map(({ value, label }) => (
        <CustomFilterCheckbox
          key={value}
          checked={classification.includes(value)}
          onChange={() => handleFilterChange(value)}
          label={label}
        />
      )),
    [options, classification, handleFilterChange],
  );

  return <WrapperFilterCheckbox>{checkboxes}</WrapperFilterCheckbox>;
};
