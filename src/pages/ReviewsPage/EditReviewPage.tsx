import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/reviews/reviewsSelector';
import { saveReview } from '@/redux/reviews/reviewsApi';
import { Review } from '@/types/Review';
import UserInfo from '@/components/ReviewItem/ReviwUserInfo';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
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
import { DeleteButton } from '@/components/ReviewItem/styles';

// Додаємо інтерфейс для props
interface EditReviewPageProps {
  review: Review;
  onCancel: () => void;
  onSave?: (updatedReview: Review) => void;
}

const mapBackendRatings = (backendRatings: any) => ({
  attitude: backendRatings.clientService || 0,
  service: backendRatings.serviceQuality || 0,
  price: backendRatings.priceQuality || 0,
  cleanliness: backendRatings.cleanliness || 0,
});

const EditReviewPage: React.FC<EditReviewPageProps> = ({
  review,
  onCancel,
  onSave,
}) => {
  const reduxUserId = useAppSelector(state => state.user.user?.userCommentId);
  console.log('reduxUserId', reduxUserId);
  const userCommentId = review.userCommentId || reduxUserId;
  // const userCommentId = useAppSelector((state) => state.user.user?.userCommentId);
  // const [userCommentId, setuserCommentId] = useState(review.userCommentId);
  console.log('userCommentId', userCommentId);
  const [comment, setComment] = useState(review?.comment || '');
  const [ratings, setRatings] = useState(() =>
    review.ratings
      ? mapBackendRatings(review.ratings)
      : {
          attitude: 0,
          service: 0,
          price: 0,
          cleanliness: 0,
        },
  );

  // Стан для перевірки змін у формі
  const [isEdited, setIsEdited] = useState(false);
  const [hasComment, setHasComment] = useState(!!review.comment);
  const [averageRating, setAverageRating] = useState(review.averageRating || 0);

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

  const calculateAverage = (ratings: Record<string, number>): number => {
    const values = Object.values(ratings);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return +(sum / values.length).toFixed(1);
  };

  const handleSave = async () => {
    try {
      const hasAnyRating = Object.values(ratings).some(r => r > 0);
      if (!hasAnyRating && !comment.trim()) {
        alert('Заповніть всі поля рейтингу та залиште коментар.');
        return;
      }

      const isEditing = !!review.comment;
      const reviewId = isEditing ? review.id : null;
      console.log('!!!!!!!!!!!!!!!!!!!', reviewId);

      const targetType = review.userRole === 'coach' ? 'trainer' : 'club';

      const mappedRatings = {
        clientService: ratings.attitude,
        serviceQuality: ratings.service,
        priceQuality: ratings.price,
        cleanliness: ratings.cleanliness,
        location: 0, // або якось інакше
      };

      if (!userCommentId) {
        alert('Користувача не знайдено. Увійдіть у систему ще раз.');
        return;
      }
      await saveReview(reviewId, comment, ratings, userCommentId, targetType);

      const newAverage = calculateAverage(mappedRatings);
      setAverageRating(newAverage);

      if (onSave) {
        const updatedReview: Review = {
          ...review,
          comment,
          ratings: mappedRatings,
          updatedAt: new Date().toISOString(),
          averageRating: newAverage,
        };
        onSave(updatedReview);
      }
      console.log('Відгук збережено успішно');
      onCancel();
    } catch (error) {
      console.error('Помилка при збереженні відгуку:', error);
      alert('Щось пішло не так при збереженні. Спробуйте ще раз.');
    }
  };

  useEffect(() => {
    if (averageRating) {
      setAverageRating(averageRating);
    }
  }, [averageRating]);

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
            {hasComment ? (
              <ReviewHeader
                title="РЕДАГУВАТИ ВІДГУК"
                leftIcon={IconName.EDIT_CONTAINED}
                onCancel={onCancel}
              />
            ) : (
              <HeaderEdit onClick={onCancel}>
                <Icon name={IconName.ARROW_LEFT} styles={{ fill: 'none' }} />
                НАЗАД
              </HeaderEdit>
            )}
          </HeaderEdit>
          {review && (
            <UserInfo
              userId={review.id}
              avatar={review.avatar}
              firstName={review.name}
              lastName={review.surname}
              role={review.userRole}
              createdAt={review.createdAt}
              updatedAt={review.updatedAt}
            />
          )}
          <OverallRatingSection>
            <OverallTitle>
              Загальна оцінка{' '}
              {review.userRole === 'coach' ? 'тренера' : 'клубу'}
            </OverallTitle>
            <StarsDisplay>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} $filled={i < Math.round(averageRating)}>
                  <Icon
                    name={IconName.STAR_DEFAULT}
                    styles={{
                      fill:
                        review.totalReviews > 0 && i < Math.round(averageRating)
                          ? '#ED772F'
                          : 'none',
                      color:
                        review.totalReviews > 0 && i < Math.round(averageRating)
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
                      $filled={index < ratings[key as keyof typeof ratings]}
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
            <DeleteButton onClick={onCancel}>Назад</DeleteButton>
            <SaveButton
              onClick={handleSave}
              style={{
                backgroundColor: isEdited ? '#ED772F' : '#1C1B20',
                border: `2px solid ${isEdited ? '#ED772F' : '#494949'}`,
              }}
            >
              <Icon name={IconName.CHECK_CONTAINED} />
              {hasComment} Зберігти
            </SaveButton>
          </ButtonGroupEdit>
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export default EditReviewPage;
