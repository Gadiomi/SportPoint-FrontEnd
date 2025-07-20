import React from 'react';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import { Icon, IconName } from '@/kit';
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

interface Subscriptions {
  _id: string;
  name: string;
  amount: string;
  description?: string;
  image?: string;
}

interface PriceCardProps {
  // prices: Price[];
  subscriptions: Subscriptions[];
  titleKey: string;
  defaultImage?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
  // prices,
  subscriptions,
  titleKey,
  defaultImage,
}) => {
  const theme = useTheme();
  if (!subscriptions || subscriptions.length === 0) {
    return <div>Ціни не доступні</div>;
  }

  console.log('Prices from backend:', subscriptions);

  return (
    <StyledPriceCard>
      <TitleContainer titleKey={titleKey} />
      <PriceContainer>
        {subscriptions.map((subscription, index) => {
          if (!subscription || !subscription.name || !subscription.amount) {
            return null;
          }
          return (
            <PriceDiv key={subscription._id || index}>
              <PricePhoto
                src={subscription.image ? subscription.image : defaultImage}
                alt={subscription.name}
                style={fonts.priceName}
              />
              <PriceWrapper>
                <PriceName style={fonts.secondManrope}>
                  {subscription.name || 'Не вказано'}
                </PriceName>
                <PriceAmountContainer>
                  <PriceAmount
                    style={{
                      ...fonts.descriptionCard,
                      color: theme.color.secWhite,
                    }}
                  >
                    {subscription.amount || '-'}
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
              <Icon
                styles={{
                  color: 'currentColor',
                  fill: 'transparent',
                  flexShrink: '0',
                }}
                name={IconName.ARROW_CORNER}
              />
            </PriceDiv>
          );
        })}
      </PriceContainer>
      <StyledHr style={{ marginTop: '0', marginBottom: '32px' }} />
    </StyledPriceCard>
  );
};

export default PriceCard;
