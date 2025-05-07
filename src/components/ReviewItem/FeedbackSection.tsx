// FeedbackSection.tsx
import React from 'react';
import { Feedback, FeedbackButton } from './styles'; // Якщо FeedbackButton стилізовано в окремому файлі
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface FeedbackSectionProps {
  reviewId: string;
  likes: number;
  dislikes: number;
  onLike: (id: string, type: 'like' | 'dislike') => void;
  onDislike: (id: string, type: 'like' | 'dislike') => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  reviewId,
  likes,
  dislikes,
  onLike,
  onDislike,
}) => {
  const { t } = useTranslation();

  return (
    <Feedback>
      <Text>{t('details_page.is_comment_helpful')}</Text>
      <FeedbackButton onClick={() => onLike(reviewId, 'like')}>
        <Text>
          {t('details_page.yes')} ({likes ?? 0})
        </Text>
      </FeedbackButton>{' '}
      <FeedbackButton onClick={() => onDislike(reviewId, 'dislike')}>
        <Text>
          {t('details_page.no')} ({dislikes ?? 0})
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
