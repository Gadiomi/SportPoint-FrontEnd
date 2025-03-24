import React, { useState } from 'react';
import { Container, Section } from '@/components/ContainerAndSection';
import { IconName } from '@/kit';
import { Icon } from '@/kit';
import styled from 'styled-components';
import {
  HeaderEdit,
  UserInfoEdit,
  Avatar,
  Name,
  RatingSection,
  Starsedit,
  StarIcon,
  TextArea,
  CancelButton,
  SaveButton,
  RatingRow,
  Label,
  ButtonGroupEdit,
  ReviewSummary,
  ReviewRating,
  ReviewCount,
} from './styles';
// import { Button } from '@/kit';

// Додаємо інтерфейс для props
interface EditReviewPageProps {
  review: {
    id: number;
    name: string;
    avatar: string;
    comment: string;
    reviews: { id: number; rating: number }[];
  };
  onCancel: () => void;
}

const EditReviewPage: React.FC<EditReviewPageProps> = ({
  review,
  onCancel,
}) => {
  const [comment, setComment] = useState(review?.comment || '');
  // const [rating, setRating] = useState(review?.rating || 0);

  const [ratings, setRatings] = useState({
    attitude: 0,
    service: 0,
    price: 0,
    cleanliness: 0,
  });

  // Припустимо, що review.reviews - це масив усіх відгуків від користувачів
  const totalReviews = review.reviews?.length || 0;

  // Обчислення середнього рейтингу
  const averageRating =
    totalReviews > 0
      ? (
          review.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : '0.0';

  const handleRatingChange = (key: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Збережено:', { comment, averageRating });
    onCancel(); // Повернутись назад
  };

  return (
    <Container>
      <HeaderEdit>
        <Icon name={IconName.ARROW_RIGHT} styles={{ fill: 'none' }} />{' '}
        РЕДАГУВАТИ ВІДГУ
      </HeaderEdit>
      <UserInfoEdit>
        <Avatar src={review.avatar} alt={review.name} />
        <div>
          <Name>{review.name}</Name>
          {/* <Badge>Йога</Badge> */}
        </div>

        {/* Блок із середнім рейтингом і кількістю відгуків */}
        <ReviewSummary>
          <ReviewRating>
            {averageRating}{' '}
            <Icon name={IconName.STAR_DEFAULT} styles={{ fill: 'none' }} />
          </ReviewRating>
          <ReviewCount>{totalReviews} відгуків</ReviewCount>
        </ReviewSummary>
      </UserInfoEdit>

      <RatingSection>
        {[
          { label: 'Оцініть ставлення до клієнта:', key: 'attitude' },
          { label: 'Оцініть якість послуг:', key: 'service' },
          { label: 'Співвідношення ціни та якості:', key: 'price' },
          { label: 'Оцініть чистоту та умови:', key: 'cleanliness' },
        ].map(({ label, key }) => (
          <RatingRow key={key}>
            <Label>{label}</Label>
            <Starsedit>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  onClick={() =>
                    handleRatingChange(key as keyof typeof ratings, index + 1)
                  }
                  filled={index < ratings[key as keyof typeof ratings]}
                >
                  <Icon
                    name={IconName.STAR_DEFAULT}
                    styles={{
                      fill:
                        index < ratings[key as keyof typeof ratings]
                          ? '#ED772F'
                          : 'none',
                    }}
                  />
                </StarIcon>
              ))}
            </Starsedit>
          </RatingRow>
        ))}
      </RatingSection>

      <TextArea
        placeholder="Ваш відгук:"
        value={comment}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setComment(e.target.value)
        }
      />

      <ButtonGroupEdit>
        <CancelButton onClick={onCancel}>Скасувати</CancelButton>
        <SaveButton onClick={handleSave}>Редагувати</SaveButton>
      </ButtonGroupEdit>
    </Container>
  );
};

export default EditReviewPage;
