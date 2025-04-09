import React, { useState } from 'react';
import { CustomFilterCheckbox } from '../../CustomFilterCheckbox/CustomFilterCheckbox';
import { WrapperFilterCheckbox } from './styles';

interface SortByProps {
  sortBy: string | null;
  onSortChange: (newSortBy: string | null) => void;
}

export const SortBy: React.FC<SortByProps> = ({ sortBy, onSortChange }) => {
  const handleFilterChange = (filter: string) => {
    onSortChange(filter === sortBy ? null : filter); // Викликаємо функцію, що надає батьківський компонент
  };
  return (
    <WrapperFilterCheckbox>
      <CustomFilterCheckbox
        checked={sortBy === 'new'}
        onChange={() => handleFilterChange('new')}
        label="Нові"
      />
      <CustomFilterCheckbox
        checked={sortBy === 'priceAsc'}
        onChange={() => handleFilterChange('priceAsc')}
        label="Ціна за зростанням"
      />
      <CustomFilterCheckbox
        checked={sortBy === 'popular'}
        onChange={() => handleFilterChange('popular')}
        label="Популярні"
      />
      <CustomFilterCheckbox
        checked={sortBy === 'priceDesc'}
        onChange={() => handleFilterChange('priceDesc')}
        label="Ціна за спаданням"
      />
    </WrapperFilterCheckbox>
  );
};
