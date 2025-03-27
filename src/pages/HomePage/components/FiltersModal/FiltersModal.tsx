import { About, Button, ButtonAppearance, Icon, IconName, Medium } from '@/kit';
import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  CloseButton,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from './styles';
import { useTheme } from 'styled-components';
import { CustomSelect } from '@/kit/Select';
import StyledHr from '@/components/StyledHr/StyledHr';
import { SortBy } from './SortBy/SortBy';
import SortPrice from './SortPrice/SortPrice';
import { Classification } from './Classification/Classification';
import { Logo } from '@/components/Logo/Logo';

interface PropsFiltersModal {
  isFiltersModalOpen: boolean;
  setIsFiltersModalOpen: (value: boolean) => void;
}

export const FiltersModal: React.FC<PropsFiltersModal> = ({
  isFiltersModalOpen,
  setIsFiltersModalOpen,
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
    { value: 'kyiv', label: 'Київ' },
    { value: 'lviv', label: 'Львів' },
    { value: 'odesa', label: 'Одеса' },
    { value: 'kharkiv', label: 'Харків' },
    { value: 'uzhhorod', label: 'Ужгород' },
  ];

  const handleClose = () => {
    setIsFiltersModalOpen(false);
  };
  const handlePriceChange = (from: number | null, to: number | null) => {
    setPriceRange({ from, to });
  };
  return (
    <Backdrop onClick={handleClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Logo />
        <ModalHeader>
          <CloseButton onClick={handleClose} type="button">
            <Icon name={IconName.X} />
          </CloseButton>
          <Medium>Фільтрувати</Medium>
          <Button
            title="очистити"
            style={{
              textDecoration: 'none',
              color: theme.color.disabled,
              position: 'absolute',
              right: `${theme.pxs.x0}px`,
              padding: `${theme.pxs.x0}px`,
            }}
            appearance={ButtonAppearance.UNDERLINED}
            testId="clean-button"
          />
        </ModalHeader>

        <ModalContent>
          <StyledHr style={{ marginBottom: theme.pxs.x4 }} />
          <About style={{ marginBottom: theme.pxs.x4 }}>Місто</About>
          <CustomSelect
            options={cityOptions}
            value={select}
            onChange={setSelect}
            placeholder="Київ"
            padding={`${theme.pxs.x1_5}px`}
          />
          <StyledHr
            style={{ marginTop: theme.pxs.x8, marginBottom: theme.pxs.x8 }}
          />
          <About style={{ marginBottom: theme.pxs.x4 }}>Впорядкувати за</About>
          <SortBy />
          <StyledHr
            style={{ marginTop: theme.pxs.x8, marginBottom: theme.pxs.x8 }}
          />

          <About style={{ marginBottom: theme.pxs.x4 }}>Ціна</About>
          <SortPrice
            priceRange={priceRange}
            onFilterChange={handlePriceChange}
          />

          <StyledHr
            style={{ marginTop: theme.pxs.x8, marginBottom: theme.pxs.x8 }}
          />
          <About style={{ marginBottom: theme.pxs.x4 }}>Класифікація</About>
          <Classification />
          <StyledHr
            style={{ marginTop: theme.pxs.x8, marginBottom: theme.pxs.x8 }}
          />
        </ModalContent>
        <ModalFooter>
          <Button
            title="Переглянути результати"
            appearance={ButtonAppearance.PRIMARY}
            testId="submit-filters-button"
          />
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};
