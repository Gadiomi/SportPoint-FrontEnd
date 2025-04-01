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
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : Number(e.target.value);
    onFilterChange(value, priceRange.to);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : Number(e.target.value);
    onFilterChange(priceRange.from, value);
  };

  return (
    <PriceFilterWrapper>
      <InputWrapper>
        <Label>від</Label>
        <InputContainer>
          <StyledInput
            type="number"
            value={priceRange.from ?? ''}
            onChange={handleFromChange}
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
            onChange={handleToChange}
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
