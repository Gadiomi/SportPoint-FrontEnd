// FeedbackSection.tsx
import React from 'react';
import { Feedback, FeedbackButton } from './styles'; // Якщо FeedbackButton стилізовано в окремому файлі
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
  return (
    <Feedback>
      <Text>Чи корисний цей коментар? </Text>
      <FeedbackButton onClick={() => onLike(reviewId, 'like')}>
        <Text> Так ({likes ?? 0})</Text>
      </FeedbackButton>{' '}
      <FeedbackButton onClick={() => onDislike(reviewId, 'dislike')}>
        <Text>Ні ({dislikes ?? 0})</Text>
      </FeedbackButton>
    </Feedback>
  );
};

export default FeedbackSection;

const Text = styled.p(({ theme }) => ({
  ...theme.fonts.lightManrope,
  color: theme.color.secWhite,
}));
