import React, { useCallback, useMemo, useState } from 'react';
import { CustomFilterCheckbox } from '../../CustomFilterCheckbox/CustomFilterCheckbox';
import { WrapperFilterCheckbox } from '../SortBy/styles';

export const Classification: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilter(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter],
    );
  }, []);

  const options = useMemo(() => {
    return [
      { value: 'stretching', label: 'Стреччинг' },
      { value: 'cardio', label: 'Кардіо' },
      { value: 'yoga', label: 'Йога' },
      { value: 'crossfit', label: 'Кросфіт' },
      { value: 'trx', label: 'TRX' },
      { value: 'fitness', label: 'Фітнес' },
    ];
  }, []);

  const checkboxes = useMemo(
    () =>
      options.map(({ value, label }) => (
        <CustomFilterCheckbox
          key={value}
          checked={selectedFilter.includes(value)}
          onChange={() => handleFilterChange(value)}
          label={label}
        />
      )),
    [options, selectedFilter, handleFilterChange],
  );
  return <WrapperFilterCheckbox>{checkboxes}</WrapperFilterCheckbox>;
};
