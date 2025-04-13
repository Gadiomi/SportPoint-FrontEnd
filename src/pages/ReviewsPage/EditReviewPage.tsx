import React, { useState, useEffect } from 'react';
import { saveReview } from '@/redux/reviews/reviewsApi';
import UserInfo from '@/components/ReviewItem/ReviwUserInfo';
import FeedbackSection from '@/components/ReviewItem/FeedbackSection';
import StyledHr from '@/components/StyledHr/StyledHr';
import { IconName } from '@/kit';
import { Icon } from '@/kit';
import styled from 'styled-components';
import {
  HeaderEdit,
  RatingSection,
  Starsedit,
  StarIcon,
  TextArea,
  CancelButton,
  SaveButton,
  RatingRow,
  Label,
  ButtonGroupEdit,
  OverallRatingSection,
  OverallTitle,
  StarsDisplay,
  ModalOverlay,
  ModalContent,
  RatingLabels,
} from './styles';

// Додаємо інтерфейс для props
interface EditReviewPageProps {
  review: {
    id: string;
    name: string;
    surname: string;
    avatar: string;
    userRole: 'customer' | 'coach' | 'adminClub';
    sport?: string[];
    comment: string;
    createdAt: string;
    updatedAt: string;
    averageRating: number;
    totalReviews: number;
  };
  onCancel: () => void;
}

const EditReviewPage: React.FC<EditReviewPageProps> = ({
  review,
  onCancel,
}) => {
  const [comment, setComment] = useState(review?.comment || '');
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

  const handleRatingChange = (key: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Будь ласка, увійдіть у систему, щоб залишити відгук.');
        return;
      }

      await saveReview(review.id, comment, ratings); // ✔️ API-запит

      console.log('Відгук збережено успішно');
      onCancel(); // Повернутись назад після збереження
    } catch (error) {
      console.error('Помилка при збереженні відгуку:', error);
    }
  };

  const ratingLabels =
    review.userRole === 'coach'
      ? [
          { label: 'Професійні навики', key: 'attitude' },
          { label: 'Особисті якості', key: 'service' },
          { label: 'Уважність та безпека', key: 'price' },
          { label: 'Організаційні моменти', key: 'cleanliness' },
        ]
      : [
          { label: 'Умови та зручності', key: 'attitude' },
          { label: 'Робота персоналу', key: 'service' },
          { label: 'Доступність та зручність', key: 'price' },
          { label: 'Додаткові послуги', key: 'cleanliness' },
        ];

  const reviewDateToShow = review.updatedAt
    ? review.updatedAt
    : review.createdAt;

  return (
    <div>
      <ModalOverlay>
        <ModalContent>
          <HeaderEdit>
            <Icon name={IconName.ARROW_RIGHT} styles={{ fill: 'none' }} />{' '}
            {hasComment ? 'РЕДАГУВАТИ ВІДГУК' : 'НОВИЙ ВІДГУК'}
          </HeaderEdit>
          <UserInfo
            userId={review.id} // Відправка userId для запиту
            reviewDate={reviewDateToShow}
          />
          <OverallRatingSection>
            <OverallTitle>
              Загальна оцінка{' '}
              {review.userRole === 'coach' ? 'тренера' : 'клубу'}
            </OverallTitle>
            <StarsDisplay>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} filled={i < Math.round(review.averageRating)}>
                  <Icon
                    name={IconName.STAR_DEFAULT}
                    styles={{
                      fill:
                        review.totalReviews > 0 &&
                        i < Math.round(review.averageRating)
                          ? '#ED772F'
                          : 'none',
                      color:
                        review.totalReviews > 0 &&
                        i < Math.round(review.averageRating)
                          ? '#ED772F'
                          : '#494949',
                    }}
                  />
                </StarIcon>
              ))}
            </StarsDisplay>
          </OverallRatingSection>

          <StyledHr />

          <RatingSection>
            {ratingLabels.map(({ label, key }) => (
              <RatingRow key={key}>
                <RatingLabels>
                  <Label>{label}</Label>
                  <Icon
                    name={IconName.ALERT_CIRCLE}
                    styles={{ color: '#B7B7B9' }}
                  />
                </RatingLabels>
                <Starsedit>
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      onClick={() =>
                        handleRatingChange(
                          key as keyof typeof ratings,
                          index + 1,
                        )
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
          <span>Залиште відгук (за бажанням)</span>
          <TextArea
            placeholder="Ваш відгук:"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
          />

          <ButtonGroupEdit>
            <CancelButton onClick={onCancel}>Назад</CancelButton>
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
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export default EditReviewPage;
