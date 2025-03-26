import { About, Button, ButtonAppearance, Icon, IconName, Medium } from '@/kit';
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
import { StyledHr } from '@/pages/DetailsPage/CoachPage/styles';
import { CustomFilterCheckbox } from '../CustomFilterCheckbox/CustomFilterCheckbox';

interface PropsFiltersModal {
  isFiltersModalOpen: boolean;
  setIsFiltersModalOpen: (value: boolean) => void;
}

export const FiltersModal: React.FC<PropsFiltersModal> = ({
  isFiltersModalOpen,
  setIsFiltersModalOpen,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const theme = useTheme();

  if (!isFiltersModalOpen) return null;
  const handleClose = () => {
    setIsFiltersModalOpen(false);
  };
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(prev => (prev === filter ? null : filter)); // Якщо фільтр вже вибраний, то скидаємо вибір
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
          <StyleStyledHr style={{ marginTop: '32px' }} />
          <About style={{ marginBottom: theme.pxs.x4 }}>Впорядкувати за</About>
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

          <StyleStyledHr style={{ marginTop: '32px' }} />
          <About style={{ marginBottom: theme.pxs.x4 }}>Ціна</About>
          <StyleStyledHr style={{ marginTop: '32px' }} />
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
