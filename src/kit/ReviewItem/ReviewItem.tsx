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
  id: number;
  name: string;
  avatar: string;
  date: string;
  comment: string;
  likes: number;
  dislikes: number;
  rating: number;
  reviews: { id: number; rating: number }[];
}

interface ReviewItemProps {
  review: Review;
  onLike: (id: number, type: 'like' | 'dislike') => void;
  onDislike: (id: number, type: 'like' | 'dislike') => void;
  onDelete: (id: number) => void;
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
        <Avatar src={review.avatar} />
        <Name>{review.name}</Name>
        <Stars>
          {[...Array(5)].map((_, index) => (
            <Icon
              key={index}
              name={IconName.STAR_DEFAULT}
              styles={{
                fill:
                  index < review.rating
                    ? colorsLight.mainOrange
                    : colorsLight.secWhite,
              }}
            />
          ))}
        </Stars>
      </UserInfo>

      <Comment>{review.comment}</Comment>
      <Footer>
        <Feedback>
          <Text>Чи корисний цей коментар? </Text>
          <FeedbackButton onClick={() => onLike(review.id, 'like')}>
            <Text> Так ({review.likes})</Text>
          </FeedbackButton>{' '}
          <FeedbackButton onClick={() => onDislike(review.id, 'dislike')}>
            <Text>Ні ({review.dislikes})</Text>
          </FeedbackButton>
        </Feedback>
        <Text>
          <Date>{review.date}</Date>
        </Text>
      </Footer>
      <ButtonGroup>
        <DeleteButton onClick={() => onDelete(review.id)}>
          Видалити
        </DeleteButton>
        <ActionButton onClick={() => onEdit(review)}>
          <Icon
            name={IconName.EDIT_CONTAINED}
            styles={{ fill: 'none' }}
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
