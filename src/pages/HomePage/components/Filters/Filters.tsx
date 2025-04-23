import React, { useState } from 'react';
import { ButtonAppearance, Icon, IconName } from '@/kit';
import { FiltersModal } from '../FiltersModal/FiltersModal';
import { StyledButton } from '@/pages/HomePage/components/Filters/styles';
import { FilterParams } from '@/types';
import { t } from 'i18next';

interface FiltersProps {
  getFilteredCards: (filters: FilterParams) => void;
  setFilters: (filters: FilterParams) => void;
}
export const Filters: React.FC<FiltersProps> = ({
  setFilters,
  getFilteredCards,
}) => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsFiltersModalOpen(true);
  };

  return (
    <>
      <StyledButton
        onClick={handleOpenModal}
        testId="filter-button"
        title={t('home_page.filters')}
        style={{ textDecoration: 'none' }}
        appearance={ButtonAppearance.UNDERLINED}
        appendChild={<Icon name={IconName.FILTER} />}
      />

      <FiltersModal
        isFiltersModalOpen={isFiltersModalOpen}
        setIsFiltersModalOpen={setIsFiltersModalOpen}
        getFilteredCards={getFilteredCards}
        setFilters={setFilters}
      />
    </>
  );
};
