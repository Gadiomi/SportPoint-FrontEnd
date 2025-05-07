import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/redux/reviews/reviewsSelector';
import { saveReview } from '@/redux/reviews/reviewsApi';
import { Review } from '@/types/Review';
import UserInfo from '@/components/ReviewItem/ReviwUserInfo';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
import StyledHr from '@/components/StyledHr/StyledHr';
import { IconName, Icon } from '@/kit';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import {
  HeaderEdit,
  RatingSection,
  Starsedit,
  StarIcon,
  TextArea,
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
  const { t } = useTranslation();
  const translate: (key: string, options?: Record<string, any>) => string = t;
  const theme = useTheme();
  const reduxUserId = useAppSelector(state => state.user.user?.userCommentId);
  console.log('reduxUserId', reduxUserId);
  const userCommentId = review.userCommentId || '68051125a3b591135617fdbf'; //reduxUserId
  // const userCommentId = useAppSelector((state) => state.user.user?.userCommentId);
  // const [userCommentId, setuserCommentId] = useState(review.userCommentId);
  // console.log('userCommentId', userCommentId);
  const [comment, setComment] = useState(review?.comment || '');
  const [ratings, setRatings] = useState({
    attitude: review?.ratings?.cleanliness || 0,
    service: review?.ratings?.clientService || 0,
    price: review?.ratings?.priceQuality || 0,
    cleanliness: review?.ratings?.serviceQuality || 0,
  });
  // const [ratings, setRatings] = useState(() =>
  //   review.ratings
  //     ? mapBackendRatings(review.ratings)
  //     : {
  //         attitude: 0,
  //         service: 0,
  //         price: 0,
  //         cleanliness: 0,
  //       },
  // );

  //   // Debug: перевірка чи приходять рейтинги
  // useEffect(() => {
  //   console.log('review.ratings', review.ratings);
  // }, [review.ratings]);

  // // 🔄 Оновлення рейтингу при зміні review
  // useEffect(() => {
  //   if (review?.ratings) {
  //     setRatings(mapBackendRatings(review.ratings));
  //   }
  // }, [review]);

  console.log('review:', review);

  // Стан для перевірки змін у формі
  const [isEdited, setIsEdited] = useState(false);
  const [hasComment, setHasComment] = useState(!!review.comment);
  const [averageRating, setAverageRating] = useState(review.averageRating || 0);

  useEffect(() => {
    if (review?.ratings) {
      const mapped = mapBackendRatings(review.ratings);
      setRatings(mapped);
      const avg = calculateAverage(mapped);
      setAverageRating(avg);
    }
    setComment(review.comment || '');
    setHasComment(!!review.comment);
  }, [review]);

  // Визначаємо, чи відбулися зміни
  useEffect(() => {
    const initialRatings = {
      attitude: review?.ratings?.cleanliness || 0,
      service: review?.ratings?.clientService || 0,
      price: review?.ratings?.priceQuality || 0,
      cleanliness: review?.ratings?.serviceQuality || 0,
    };
    const hasRatingChanged =
      JSON.stringify(ratings) !== JSON.stringify(initialRatings);
    const hasCommentChanged = comment !== review.comment;

    setIsEdited(hasRatingChanged || hasCommentChanged);
  }, [comment, ratings, review]);

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
          {
            label: translate('account_page.professional-skills'),
            key: 'attitude',
          },
          {
            label: translate('account_page.personal-qualities'),
            key: 'service',
          },
          {
            label: translate('account_page.mindfulness-and-safety'),
            key: 'price',
          },
          {
            label: translate('account_page.organizational-moments'),
            key: 'cleanliness',
          },
        ]
      : [
          {
            label: translate('account_page.conditions-and-facilities'),
            key: 'attitude',
          },
          { label: translate('account_page.staff-work'), key: 'service' },
          {
            label: translate('account_page.accessibility-and-convenience'),
            key: 'price',
          },
          {
            label: translate('account_page.additional-services'),
            key: 'cleanliness',
          },
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
                title={translate('ediet-review')}
                leftIcon={IconName.EDIT_CONTAINED}
                onCancel={onCancel}
              />
            ) : (
              <HeaderEdit onClick={onCancel}>
                <Icon name={IconName.ARROW_LEFT} styles={{ fill: 'none' }} />
                {translate('account_page.back')}
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
              sport={review.sport}
              createdAt={review.createdAt}
              updatedAt={review.updatedAt}
            />
          )}
          <OverallRatingSection>
            <OverallTitle>
              {translate('account_page.overall-assessment')}{' '}
              {review.userRole === 'coach'
                ? translate('account_page.coach')
                : translate('account_page.club')}
            </OverallTitle>
            <StarsDisplay>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} $filled={i < Math.round(averageRating)}>
                  <Icon
                    name={IconName.STAR_DEFAULT}
                    styles={{
                      fill:
                        review.totalReviews > 0 && i < Math.round(averageRating)
                          ? theme.color.mainOrange
                          : 'none',
                      color:
                        review.totalReviews > 0 && i < Math.round(averageRating)
                          ? theme.color.mainOrange
                          : theme.color.secWhite,
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
                    styles={{ color: theme.color.secWhite }}
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
                              ? theme.color.mainOrange
                              : 'none',
                          color:
                            index < ratings[key as keyof typeof ratings]
                              ? theme.color.mainOrange
                              : theme.color.secWhite,
                        }}
                      />
                    </StarIcon>
                  ))}
                </Starsedit>
              </RatingRow>
            ))}
          </RatingSection>
          <span>{translate('account_page.leave-review-optional')}</span>
          <TextArea
            placeholder={translate('account_page.your-review')}
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
          />
          <ButtonGroupEdit>
            <DeleteButton onClick={onCancel}>
              {translate('account_page.back')}
            </DeleteButton>
            <SaveButton
              onClick={handleSave}
              style={{
                backgroundColor: isEdited
                  ? theme.color.mainOrange
                  : theme.color.background,
                border: `2px solid ${isEdited ? theme.color.mainOrange : theme.color.darkGray}`,
              }}
            >
              <Icon name={IconName.CHECK_CONTAINED} />
              {hasComment} {translate('account_page.save')}
            </SaveButton>
          </ButtonGroupEdit>
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export default EditReviewPage;
