import { About, Button, ButtonAppearance, Icon, IconName, Medium } from '@/kit';
import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  CloseButton,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledButton,
} from './styles';
import { useTheme } from 'styled-components';
import { CustomSelect } from '@/kit/Select';
import StyledHr from '@/components/StyledHr/StyledHr';
import { SortBy } from './SortBy/SortBy';
import SortPrice from './SortPrice/SortPrice';
import { Classification } from './Classification/Classification';
import { Logo } from '@/components/Logo/Logo';
import { FilterParams } from '@/types';
import { useTranslation } from 'react-i18next';

interface PropsFiltersModal {
  isFiltersModalOpen: boolean;
  setIsFiltersModalOpen: (value: boolean) => void;
  getFilteredCards: (filters: FilterParams) => void;
  setFilters: (filters: FilterParams) => void;
}

export const FiltersModal: React.FC<PropsFiltersModal> = ({
  setFilters,
  isFiltersModalOpen,
  setIsFiltersModalOpen,
  getFilteredCards,
}) => {
  const theme = useTheme();
  const [select, setSelect] = useState<{ value: string; label: string } | null>(
    null,
  );
  const [priceRange, setPriceRange] = useState<{
    from: number | null;
    to: number | null;
  }>({
    from: null,
    to: null,
  });
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [classification, setClassification] = useState<string[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    if (isFiltersModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFiltersModalOpen]);
  if (!isFiltersModalOpen) return null;

  const cityOptions = [
    { value: 'kyiv', label: t('filters.kyiv') },
    { value: 'lviv', label: t('filters.lviv') },
    { value: 'odesa', label: t('filters.odesa') },
    { value: 'kharkiv', label: t('filters.kharkiv') },
    { value: 'uzhhorod', label: t('filters.uzhhorod') },
  ];

  const handleClose = () => {
    setIsFiltersModalOpen(false);
  };

  const handlePriceChange = (from: number | null, to: number | null) => {
    setPriceRange({ from, to });
  };
  const filters = {
    address: select?.value || undefined,
    minPrice: priceRange.from || 0,
    maxPrice: priceRange.to || 0,
    abilities: classification.length > 0 ? classification.join(',') : undefined,
    sort: sortBy || 'new',
  };
  const handleSubmit = () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined),
    );

    getFilteredCards(cleanedFilters);
    setIsFiltersModalOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = filters;
    setSelect(null);
    setPriceRange({ from: null, to: null });
    setSortBy(null);
    setClassification([]);
    setFilters(clearedFilters);
  };

  return (
    <Backdrop onClick={handleClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Logo />
        <ModalHeader>
          <CloseButton onClick={handleClose} type="button">
            <Icon name={IconName.X} />
          </CloseButton>
          <Medium>{t('home_page.filtering')}</Medium>
          <Button
            title={t('home_page.clean')}
            style={{
              textDecoration: 'none',
              color: theme.color.disabled,
              position: 'absolute',
              right: `${theme.pxs.x0}px`,
              padding: `${theme.pxs.x0}px`,
            }}
            appearance={ButtonAppearance.UNDERLINED}
            testId="clean-button"
            onClick={handleClearFilters}
          />
        </ModalHeader>

        <ModalContent>
          <StyledHr style={{ marginBottom: theme.pxs.x4 }} />
          <About style={{ marginBottom: theme.pxs.x4 }}>
            {t('home_page.city')}
          </About>
          <CustomSelect
            options={cityOptions}
            value={select}
            onChange={setSelect}
            placeholder={t('filters.kyiv')}
            padding={`${theme.pxs.x1_5}px`}
          />
          <StyledHr
            style={{ marginTop: theme.pxs.x8, marginBottom: theme.pxs.x8 }}
          />
          <About style={{ marginBottom: theme.pxs.x4 }}>
            {t('home_page.sortBy')}
          </About>
          <SortBy sortBy={sortBy} onSortChange={setSortBy} />
          <StyledHr
            style={{ marginTop: theme.pxs.x8, marginBottom: theme.pxs.x8 }}
          />

          <About style={{ marginBottom: theme.pxs.x4 }}>
            {t('home_page.price')}
          </About>
          <SortPrice
            priceRange={priceRange}
            onFilterChange={handlePriceChange}
          />

          <StyledHr
            style={{ marginTop: theme.pxs.x8, marginBottom: theme.pxs.x8 }}
          />
          <About style={{ marginBottom: theme.pxs.x4 }}>
            {t('home_page.classification')}
          </About>
          <Classification
            classification={classification}
            onChange={setClassification}
          />
          <StyledHr
            style={{ marginTop: theme.pxs.x8, marginBottom: theme.pxs.x8 }}
          />
        </ModalContent>
        <ModalFooter>
          <StyledButton
            title={t('home_page.resultFilter')}
            appearance={ButtonAppearance.PRIMARY}
            testId="submit-filters-button"
            onClick={handleSubmit}
          />
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};
