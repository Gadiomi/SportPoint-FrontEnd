import React from 'react';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import StyledHr from '../../../../components/StyledHr/StyledHr';
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
  const theme = useTheme();
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
                <PriceName style={fonts.priceName}>
                  {price.name || 'Не вказано'}
                </PriceName>
                <PriceDescription
                  style={{ ...fonts.priceName, color: theme.color.secWhite }}
                >
                  {price.description || ''}
                </PriceDescription>
              </PriceNameContainer>
              <PriceAmountContainer>
                <PriceAmount style={fonts.priceAmount}>
                  {price.amount || '-'}
                </PriceAmount>
                <RatePerHour
                  style={{ ...fonts.priceAmount, color: theme.color.secWhite }}
                >
                  грн/год
                </RatePerHour>
              </PriceAmountContainer>
            </PriceDiv>
          );
        })}
      </PriceContainer>
      <StyledHr style={{ marginTop: '0', marginBottom: '32px' }} />
    </StyledPriceCard>
  );
};

export default PriceCard;
