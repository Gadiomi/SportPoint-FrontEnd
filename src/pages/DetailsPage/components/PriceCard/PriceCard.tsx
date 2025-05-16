import React from 'react';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import TitleContainer from '../TitleContainer/TitleContainer';
import {
  StyledPriceCard,
  PriceContainer,
  PriceWrapper,
  PriceDiv,
  PricePhoto,
  PriceName,
  PriceAmountContainer,
  PriceAmount,
  RatePerHour,
} from './styles';

interface Price {
  _id: string;
  name: string;
  amount: string;
  description?: string;
  image?: string;
}

interface PriceCardProps {
  prices: Price[];
  titleKey: string;
  defaultImage?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
  prices, titleKey, defaultImage,
}) => {
  const theme = useTheme();
  if (!prices || prices.length === 0) {
    return <div>Ціни не доступні</div>;
  }

  console.log('Prices from backend:', prices);

  return (
    <StyledPriceCard>
      <TitleContainer titleKey={titleKey} />
      <PriceContainer>
        {prices.map((price, index) => {
          if (!price || !price.name || !price.amount) {
            return null;
          }
          return (
            <PriceDiv key={price._id || index}>
              <PricePhoto
                src={
                  price.image
                    ? price.image
                    : defaultImage 
                }
                alt={price.name}
                style={fonts.priceName}
              />
              <PriceWrapper>
                <PriceName style={fonts.secondManrope}>
                  {price.name || 'Не вказано'}
                </PriceName>
                <PriceAmountContainer>
                  <PriceAmount
                    style={{
                      ...fonts.descriptionCard,
                      color: theme.color.secWhite,
                    }}
                  >
                    {price.amount || '-'}
                    <RatePerHour
                      style={{
                        ...fonts.descriptionCard,
                        color: theme.color.secWhite,
                        paddingLeft: '4px',
                      }}
                    >
                      грн/год
                    </RatePerHour>
                  </PriceAmount>
                </PriceAmountContainer>
              </PriceWrapper>

              {/* <PriceDescription
                  style={{ ...fonts.priceName, color: theme.color.secWhite }}
                >
                  {price.description || ''}
                </PriceDescription> */}
            </PriceDiv>
          );
        })}
      </PriceContainer>
      <StyledHr style={{ marginTop: '0', marginBottom: '32px' }} />
    </StyledPriceCard>
  );
};

export default PriceCard;
