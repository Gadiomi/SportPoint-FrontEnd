import React from 'react';
import styled from 'styled-components';
import {
  Currency,
  InputContainer,
  InputWrapper,
  Label,
  PriceFilterWrapper,
  StyledInput,
} from './style';

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
  return (
    <PriceFilterWrapper>
      <InputWrapper>
        <Label>від</Label>
        <InputContainer>
          <StyledInput
            type="number"
            value={priceRange.from ?? ''}
            onChange={e => handleInputChange('from', e)}
            placeholder="0"
            min="0"
          />
          <Currency>грн</Currency>
        </InputContainer>
      </InputWrapper>

      <InputWrapper>
        <Label>до</Label>
        <InputContainer>
          <StyledInput
            type="number"
            value={priceRange.to ?? ''}
            onChange={e => handleInputChange('to', e)}
            placeholder="1000"
            min="0"
          />
          <Currency>грн</Currency>
        </InputContainer>
      </InputWrapper>
    </PriceFilterWrapper>
  );
};

export default SortPrice;
