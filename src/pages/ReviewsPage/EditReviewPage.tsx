import React, { useState, useEffect } from 'react';
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
    id: string;
    name: string;
    avatar: string;
    comment: string;
    // reviews: { id: number; rating: number }[];
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

  // Стан для перевірки змін у формі
  const [isEdited, setIsEdited] = useState(false);
  const [hasComment, setHasComment] = useState(!!review.comment);

  // Визначаємо, чи відбулися зміни
  useEffect(() => {
    const initialRatings = {
      attitude: 0,
      service: 0,
      price: 0,
      cleanliness: 0,
    };
    const hasRatingChanged =
      JSON.stringify(ratings) !== JSON.stringify(initialRatings);
    const hasCommentChanged = comment !== review.comment;

    setIsEdited(hasRatingChanged || hasCommentChanged);
  }, [comment, ratings, review.comment]);

  // Припустимо, що review.reviews - це масив усіх відгуків від користувачів
  // const totalReviews = review.reviews?.length || 0;

  // Обчислення середнього рейтингу
  // const averageRating =
  //   totalReviews > 0
  //     ? (
  //         review.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  //       ).toFixed(1)
  //     : '0.0';

  const handleRatingChange = (key: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  // const handleSave = () => {
  //   console.log('Збережено:', { comment });
  //   onCancel(); // Повернутись назад
  // };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://sportpoint-backend.onrender.com/cards/`,
        {
          method: 'POST' || 'PUT', // або 'PUT', якщо редагування
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: review.id,
            comment,
            ratings,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Помилка збереження відгуку');
      }

      console.log('Відгук збережено успішно');
      onCancel(); // Повернутись назад після збереження
    } catch (error) {
      console.error('Помилка при збереженні відгуку:', error);
    }
  };

  return (
    <div>
      <HeaderEdit>
        <Icon name={IconName.ARROW_RIGHT} styles={{ fill: 'none' }} />{' '}
        {hasComment ? 'РЕДАГУВАТИ ВІДГУК' : 'НОВИЙ ВІДГУК'}
      </HeaderEdit>
      <UserInfoEdit>
        <Avatar src={review.avatar} alt={review.name} />
        <div>
          <Name>{review.name}</Name>
          {/* <Badge>Йога</Badge> */}
        </div>

        {/* Блок із середнім рейтингом і кількістю відгуків */}
        {/* <ReviewSummary>
          <ReviewRating>
            {averageRating}{' '}
            <Icon name={IconName.STAR_DEFAULT} styles={{ fill: 'none' }} />
          </ReviewRating>
          <ReviewCount>{totalReviews} відгуків</ReviewCount>
        </ReviewSummary> */}
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
                      color:
                        index < ratings[key as keyof typeof ratings]
                          ? '#ED772F'
                          : '#494949',
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
        <SaveButton
          onClick={handleSave}
          style={{
            backgroundColor: isEdited ? '#ED772F' : '#1C1B20',
            border: `2px solid ${isEdited ? '#ED772F' : '#494949'}`,
          }}
        >
          {hasComment ? 'Редагувати' : 'Опублікувати'}
        </SaveButton>
      </ButtonGroupEdit>
    </div>
  );
};

export default EditReviewPage;
