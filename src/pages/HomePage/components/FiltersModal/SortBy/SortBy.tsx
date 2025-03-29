import React, { useState } from 'react';
import { CustomFilterCheckbox } from '../../CustomFilterCheckbox/CustomFilterCheckbox';
import { WrapperFilterCheckbox } from './styles';

export const SortBy: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(prev => (prev === filter ? null : filter));
  };
  return (
    <WrapperFilterCheckbox>
      <CustomFilterCheckbox
        checked={selectedFilter === 'new'}
        onChange={() => handleFilterChange('new')}
        label="Нові"
      />
      <CustomFilterCheckbox
        checked={selectedFilter === 'priceAsc'}
        onChange={() => handleFilterChange('priceAsc')}
        label="Ціна за зростанням"
      />
      <CustomFilterCheckbox
        checked={selectedFilter === 'popular'}
        onChange={() => handleFilterChange('popular')}
        label="Популярні"
      />
      <CustomFilterCheckbox
        checked={selectedFilter === 'priceDesc'}
        onChange={() => handleFilterChange('priceDesc')}
        label="Ціна за спаданням"
      />
    </WrapperFilterCheckbox>
  );
};
