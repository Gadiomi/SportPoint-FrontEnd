import React from 'react';
import {
  Currency,
  InputContainer,
  InputWrapper,
  Label,
  PriceFilterWrapper,
  StyledInput,
} from './style';
import { useTranslation } from 'react-i18next';

interface PriceFilterProps {
  priceRange: {
    from: number | null;
    to: number | null;
  };
  onFilterChange: (from: number | null, to: number | null) => void;
}

const SortPrice: React.FC<PriceFilterProps> = ({
  priceRange,
  onFilterChange,
}) => {
  const handleInputChange = (
    type: 'from' | 'to',
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value === '' ? null : Number(e.target.value);

    if (type === 'from') {
      onFilterChange(value, priceRange.to);
    } else {
      onFilterChange(priceRange.from, value);
    }
  };
  const { t } = useTranslation();
  return (
    <PriceFilterWrapper>
      <InputWrapper>
        <Label>{t('filters.from')}</Label>
        <InputContainer>
          <StyledInput
            type="number"
            value={priceRange.from ?? ''}
            onChange={e => handleInputChange('from', e)}
            placeholder="0"
            min="0"
          />
          <Currency>{t('uah')}</Currency>
        </InputContainer>
      </InputWrapper>

      <InputWrapper>
        <Label>{t('filters.to')}</Label>
        <InputContainer>
          <StyledInput
            type="number"
            value={priceRange.to ?? ''}
            onChange={e => handleInputChange('to', e)}
            placeholder="1000"
            min="0"
          />
          <Currency>{t('uah')}</Currency>
        </InputContainer>
      </InputWrapper>
    </PriceFilterWrapper>
  );
};

export default SortPrice;
