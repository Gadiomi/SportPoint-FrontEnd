import React from 'react';
import { CustomFilterCheckbox } from '../../CustomFilterCheckbox/CustomFilterCheckbox';
import { WrapperFilterCheckbox } from './styles';
import { useTranslation } from 'react-i18next';

interface SortByProps {
  sortBy: string | null;
  onSortChange: (newSortBy: string | null) => void;
}

export const SortBy: React.FC<SortByProps> = ({ sortBy, onSortChange }) => {
  const { t } = useTranslation();
  const handleFilterChange = (filter: string) => {
    onSortChange(filter === sortBy ? null : filter);
  };
  return (
    <WrapperFilterCheckbox>
      <CustomFilterCheckbox
        checked={sortBy === 'new'}
        onChange={() => handleFilterChange('new')}
        label={t('filters.new')}
      />
      <CustomFilterCheckbox
        checked={sortBy === 'price_asc'}
        onChange={() => handleFilterChange('price_asc')}
        label={t('filters.price_asc')}
      />
      <CustomFilterCheckbox
        checked={sortBy === 'popular'}
        onChange={() => handleFilterChange('popular')}
        label={t('filters.popular')}
      />
      <CustomFilterCheckbox
        checked={sortBy === 'price_dec'}
        onChange={() => handleFilterChange('price_dec')}
        label={t('filters.price_dec')}
      />
    </WrapperFilterCheckbox>
  );
};
