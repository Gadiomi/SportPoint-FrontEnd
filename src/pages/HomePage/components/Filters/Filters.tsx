import React, { useState } from 'react';
import { ButtonAppearance, Icon, IconName } from '@/kit';
import { FiltersModal } from '../FiltersModal/FiltersModal';
import { StyledButton } from '@/pages/HomePage/components/Filters/styles';

export const Filters: React.FC = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsFiltersModalOpen(true);
  };
  return (
    <>
      <StyledButton
        onClick={handleOpenModal}
        testId="filter-button"
        title="Фільтр"
        style={{ textDecoration: 'none' }}
        appearance={ButtonAppearance.UNDERLINED}
        appendChild={<Icon name={IconName.FILTER} />}
      />

      <FiltersModal
        isFiltersModalOpen={isFiltersModalOpen}
        setIsFiltersModalOpen={setIsFiltersModalOpen}
      />
    </>
  );
};
