import React from 'react';
import {
  ReviewCard,
  UserInfo,
  Avatar,
  Name,
  Stars,
  Comment,
  Footer,
  Feedback,
  Date,
  ButtonGroup,
  FeedbackButton,
  ActionButton,
  DeleteButton,
} from './styles';
import { Icon } from '@/kit';
import { IconName } from '@/kit';
import { colorsLight } from '@/theme/colors';
import styled from 'styled-components';

interface Review {
  id: string;
  name: string;
  avatar: string;
  date: string;
  comment: string;
  likes: number;
  dislikes: number;
  rating: number;
  // reviews: { id: number; rating: number }[];
}

interface ReviewItemProps {
  review: Review;
  onLike: (id: string, type: 'like' | 'dislike') => void;
  onDislike: (id: string, type: 'like' | 'dislike') => void;
  onDelete: (id: string) => void;
  onEdit: (review: Review) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  onLike,
  onDislike,
  onDelete,
  onEdit,
}) => {
  return (
    <ReviewCard key={review.id}>
      <UserInfo>
        <Avatar src={review.avatar ?? '/assets/images/default-avatar.png'} />
        <Name>{review.name ?? 'Анонімний користувач'}</Name>
        <Stars>
          {[...Array(5)].map((_, index) => (
            <Icon
              key={`${review.id}-star-${index}`}
              name={IconName.STAR_DEFAULT}
              styles={{
                fill:
                  index < (review.rating ?? 0) // Перевірка на undefined
                    ? colorsLight.mainOrange
                    : colorsLight.secWhite,
                color: 'transparent',
              }}
            />
          ))}
        </Stars>
      </UserInfo>

      <Comment>{review.comment ?? 'Немає коментаря'}</Comment>
      <Footer>
        <Feedback>
          <Text>Чи корисний цей коментар? </Text>
          <FeedbackButton onClick={() => onLike(review.id, 'like')}>
            <Text> Так ({review.likes ?? 0})</Text>
          </FeedbackButton>{' '}
          <FeedbackButton onClick={() => onDislike(review.id, 'dislike')}>
            <Text>Ні ({review.dislikes ?? 0})</Text>
          </FeedbackButton>
        </Feedback>
        <Text>
          <Date>{review.date ?? 'Дата не вказана'}</Date>
        </Text>
      </Footer>
      <ButtonGroup>
        <DeleteButton onClick={() => onDelete(review.id)}>
          Видалити
        </DeleteButton>
        <ActionButton onClick={() => onEdit(review)}>
          <Icon
            name={IconName.EDIT_CONTAINED}
            styles={{ fill: 'none', stroke: 'none' }}
            size={16}
          />{' '}
          Редагувати
        </ActionButton>
      </ButtonGroup>
    </ReviewCard>
  );
};

export default ReviewItem;

const Text = styled.p(({ theme }) => ({
  ...theme.fonts.lightManrope,
  color: theme.color.secWhite,
}));
