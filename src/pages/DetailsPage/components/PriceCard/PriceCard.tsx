import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import {
  StyledPriceCard,
  IconContainer,
  Title,
  PriceContainer,
  PriceDiv,
  PriceName,
  PriceAmountContainer,
  PriceAmount,
  RatePerHour,
} from './styles';

interface Price {
  name: string;
  amount: string;
}

interface PriceCardProps {
  prices: Price[];
}

const PriceCard: React.FC<PriceCardProps> = ({ prices }) => {
  const { t } = useTranslation();
  return (
    <StyledPriceCard>
      <IconContainer>
        <Icon
          name={IconName.ARROW_RIGHT}
          styles={{
            left: '12px',
            fill: 'none',
            width: '32px',
            height: '32px',
          }}
        />
        <Title>{t('details_page.price')}</Title>
      </IconContainer>
      <PriceContainer>
        {prices.map(price => (
          <PriceDiv key={price.name}>
            <PriceName>{price.name}</PriceName>
            <PriceAmountContainer>
              <PriceAmount>{price.amount}</PriceAmount>
              <RatePerHour>грн/год</RatePerHour>
            </PriceAmountContainer>
          </PriceDiv>
        ))}
      </PriceContainer>
    </StyledPriceCard>
  );
};

export default PriceCard;
