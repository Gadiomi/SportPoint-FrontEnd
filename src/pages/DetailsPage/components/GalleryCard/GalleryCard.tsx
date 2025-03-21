import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import { StyledGalleryCard, IconContainer, Title } from './styles';

const GalleryCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledGalleryCard>
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
        <Title>{t('details_page.gallery')}</Title>
      </IconContainer>
    </StyledGalleryCard>
  );
};

export default GalleryCard;
