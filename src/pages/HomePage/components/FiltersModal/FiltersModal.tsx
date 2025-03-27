import {
  About,
  Button,
  ButtonAppearance,
  Icon,
  IconName,
  Input,
  Medium,
} from '@/kit';
import React, { useState } from 'react';
import {
  Backdrop,
  CloseButton,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyleStyledHr,
} from './styles';
import { useTheme } from 'styled-components';
import { CustomSelect } from '@/kit/Select';

import { CustomFilterCheckbox } from '../CustomFilterCheckbox/CustomFilterCheckbox';
import StyledHr from '@/components/StyledHr/StyledHr';
import { SortBy } from './SortBy/SortBy';
import SortPrice from './SortPrice/SortPrice';

interface PropsFiltersModal {
  isFiltersModalOpen: boolean;
  setIsFiltersModalOpen: (value: boolean) => void;
}

export const FiltersModal: React.FC<PropsFiltersModal> = ({
  isFiltersModalOpen,
  setIsFiltersModalOpen,
}) => {
  const [priceRange, setPriceRange] = useState<{
    from: number | null;
    to: number | null;
  }>({
    from: null,
    to: null,
  });
  const theme = useTheme();

  if (!isFiltersModalOpen) return null;
  const handleClose = () => {
    setIsFiltersModalOpen(false);
  };
  const handlePriceChange = (from: number | null, to: number | null) => {
    setPriceRange({ from, to });
  };
  return (
    <Backdrop onClick={handleClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
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
              right: '0px',
              padding: '0px',
            }}
            appearance={ButtonAppearance.UNDERLINED}
            testId="icon-button"
          />
        </ModalHeader>

        <ModalContent>
          <StyledHr style={{ marginBottom: theme.pxs.x4 }} />
          <About style={{ marginBottom: theme.pxs.x4 }}>Місто</About>
          <CustomSelect
            options={[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]}
            value={null}
            onChange={newValue => console.log(newValue)}
            placeholder="Київ"
            padding="6px"
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
        </ModalContent>
        <ModalFooter>
          <Button
            title="Переглянути результати"
            appearance={ButtonAppearance.PRIMARY}
            testId="icon-button"
          />
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};
