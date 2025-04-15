import React from 'react';
import { CustomFilterCheckbox } from '../../CustomFilterCheckbox/CustomFilterCheckbox';
import { WrapperFilterCheckbox } from './styles';

interface SortByProps {
  sortBy: string | null;
  onSortChange: (newSortBy: string | null) => void;
}

export const SortBy: React.FC<SortByProps> = ({ sortBy, onSortChange }) => {
  const handleFilterChange = (filter: string) => {
    onSortChange(filter === sortBy ? null : filter);
  };
  return (
    <WrapperFilterCheckbox>
      <CustomFilterCheckbox
        checked={sortBy === 'new'}
        onChange={() => handleFilterChange('new')}
        label="Нові"
      />
      <CustomFilterCheckbox
        checked={sortBy === 'price_asc'}
        onChange={() => handleFilterChange('price_asc')}
        label="Ціна за зростанням"
      />
      <CustomFilterCheckbox
        checked={sortBy === 'popular'}
        onChange={() => handleFilterChange('popular')}
        label="Популярні"
      />
      <CustomFilterCheckbox
        checked={sortBy === 'price_dec'}
        onChange={() => handleFilterChange('price_dec')}
        label="Ціна за спаданням"
      />
    </WrapperFilterCheckbox>
  );
};
