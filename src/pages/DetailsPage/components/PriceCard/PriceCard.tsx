import React from 'react';
import TitleContainer from '../TitleContainer/TitleContainer';
import {
  StyledPriceCard,
  PriceContainer,
  PriceDiv,
  PriceNameContainer,
  PriceName,
  PriceDescription,
  PriceAmountContainer,
  PriceAmount,
  RatePerHour,
} from './styles';

interface Price {
  _id: string;
  name: string;
  amount: string;
  description?: string;
}

interface PriceCardProps {
  prices: Price[];
}

const PriceCard: React.FC<PriceCardProps> = ({ prices }) => {
  if (!prices || prices.length === 0) {
    return <div>Ціни не доступні</div>;
  }

  return (
    <StyledPriceCard>
      <TitleContainer titleKey="details_page.price" />
      <PriceContainer>
        {prices.map((price, index) => {
          if (!price || !price.name || !price.amount) {
            return null;
          }
          return (
            <PriceDiv key={price._id || index}>
              <PriceNameContainer>
                <PriceName>{price.name || 'Не вказано'}</PriceName>
                <PriceDescription>{price.description || ''}</PriceDescription>
              </PriceNameContainer>
              <PriceAmountContainer>
                <PriceAmount>{price.amount || '-'}</PriceAmount>
                <RatePerHour>грн/год</RatePerHour>
              </PriceAmountContainer>
            </PriceDiv>
          );
        })}
      </PriceContainer>
    </StyledPriceCard>
  );
};

export default PriceCard;
