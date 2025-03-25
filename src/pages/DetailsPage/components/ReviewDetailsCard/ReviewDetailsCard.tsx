import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import {
  StyledReviewDetailsCard,
  IconContainer,
  Title,
  ReviewDetailsContainer,
} from './styles';

const ReviewDetailsCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledReviewDetailsCard>
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
        <Title>{t('details_page.reviews')}</Title>
      </IconContainer>
      <ReviewDetailsContainer>add</ReviewDetailsContainer>
    </StyledReviewDetailsCard>
  );
};

export default ReviewDetailsCard;
