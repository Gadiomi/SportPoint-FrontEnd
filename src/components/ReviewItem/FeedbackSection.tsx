// FeedbackSection.tsx
import React from 'react';
import { Feedback, FeedbackButton } from './styles';
import { useTranslation } from 'react-i18next';
import { postFeedback } from '@/redux/reviews/reviewsApi';
import styled from 'styled-components';

interface FeedbackSectionProps {
  reviewId: string;
  yes: number;
  no: number;
  onLike: (id: string, type: 'yes' | 'no') => void;
  onDislike: (id: string, type: 'yes' | 'no') => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  reviewId,
  yes,
  no,
  onLike,
  onDislike,
}) => {
  const { t } = useTranslation();

  return (
    <Feedback>
      <Text>{t('details_page.is_comment_helpful')}</Text>
      <FeedbackButton onClick={() => onLike(reviewId, 'yes')}>
        <Text>
          {t('details_page.yes')} ({yes ?? 0})
        </Text>
      </FeedbackButton>{' '}
      <FeedbackButton onClick={() => onDislike(reviewId, 'no')}>
        <Text>
          {t('details_page.no')} ({no ?? 0})
        </Text>
      </FeedbackButton>
    </Feedback>
  );
};

export default FeedbackSection;

const Text = styled.p(({ theme }) => ({
  ...theme.fonts.lightManrope,
  color: theme.color.secWhite,
}));
