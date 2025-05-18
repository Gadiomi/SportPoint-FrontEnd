import React, { useCallback, useMemo } from 'react';
import { CustomFilterCheckbox } from '../../CustomFilterCheckbox/CustomFilterCheckbox';
import { WrapperFilterCheckbox } from '../SortBy/styles';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const options = useMemo(
    () => [
      { value: 'стрейчинг', label: t('filters.stretching') },
      { value: 'кардіо', label: t('filters.cardio') },
      { value: 'йога', label: t('filters.yoga') },
      { value: 'кросфіт', label: t('filters.crossfit') },
      { value: 'TRX', label: t('filters.trx') },
      { value: 'фітнес', label: t('filters.fitness') },
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
