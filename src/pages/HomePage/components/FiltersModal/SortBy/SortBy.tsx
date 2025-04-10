import React from 'react';
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
        checked={sortBy === 'нові'}
        onChange={() => handleFilterChange('нові')}
        label="Нові"
      />
      <CustomFilterCheckbox
        checked={sortBy === 'ціна_за_зростанням'}
        onChange={() => handleFilterChange('ціна_за_зростанням')}
        label="Ціна за зростанням"
      />
      <CustomFilterCheckbox
        checked={sortBy === 'популярні'}
        onChange={() => handleFilterChange('популярні')}
        label="Популярні"
      />
      <CustomFilterCheckbox
        checked={sortBy === 'ціна_за_спаданням'}
        onChange={() => handleFilterChange('ціна_за_спаданням')}
        label="Ціна за спаданням"
      />
    </WrapperFilterCheckbox>
  );
};
