import React, { useState } from 'react';
import { CustomFilterCheckbox } from '../../CustomFilterCheckbox/CustomFilterCheckbox';
import styled from 'styled-components';

export const SortBy: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(prev => (prev === filter ? null : filter)); // Якщо фільтр вже вибраний, то скидаємо вибір
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
const WrapperFilterCheckbox = styled.div(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
}));
