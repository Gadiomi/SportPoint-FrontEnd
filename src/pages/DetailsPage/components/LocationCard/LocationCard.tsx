import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import {
  StyledLocationCard,
  IconContainer,
  Title,
  ImageContainer,
  StyledImage,
} from './styles';

const LocationCard: React.FC = () => {
  const { t } = useTranslation();

  const imageSrc = '/public/assets/images/map_maker_test.jpg';

  return (
    <StyledLocationCard>
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
        <Title>{t('details_page.location')}</Title>
      </IconContainer>
      <ImageContainer>
        <StyledImage src={imageSrc} alt="Location" />
      </ImageContainer>
    </StyledLocationCard>
  );
};

export default LocationCard;
