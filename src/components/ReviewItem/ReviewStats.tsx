import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/reviews/reviewsSelector';
import { fetchReviewsByUserCommentId } from '@/redux/reviews/reviewsApi';
import FeedbackSection from '@/components/ReviewItem/FeedbackSection';
import styled from 'styled-components';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
import EditReviewPage from '@/pages/ReviewsPage/EditReviewPage';
import AverageRating from './AverageRating';
import { Icon } from '@/kit';
import { IconName } from '@/kit';
import { ContainerButtonMore, ButtonMore } from '@/pages/ReviewsPage/styles';
import {
  Avatar,
  Name,
  UserInfo,
  ReviewCard,
  Title,
  Stars,
  Bar,
  RatingBar,
  RatingContainer,
  Loading,
  ErrorText,
  StyledDate,
  Div,
} from './styles';

interface CommentData {
  _id: string;
  ownerAvatar?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  average: number;
  comment: string;
  ratings?: {
    [key: string]: number;
  };
  trainer?: string;
  club?: string;
  createdAt?: string;
  updatedAt?: string;
  rating?: number;
  likes?: number;
  dislikes?: number;
  isFirstReview?: boolean;
}

const CommentText = styled.div`
  margin: 8px 0;
`;

const ReviewStats: React.FC = () => {
  const user = useAppSelector(state => state.user.user);
  // console.log('ReviewStat',user)
  const [ratings, setRatings] = useState<{ [key: number]: number }>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [firstComment, setFirstComment] = useState<any>(null);
  const [trainerData, setTrainerData] = useState<any>(null);
  //  const [firstComment, setFirstComment] = useState<CommentData | null>(null);
  const [allComments, setAllComments] = useState<CommentData[]>([]);
  const [showAll, setShowAll] = useState(false);
  const reviewsToShow = showAll ? allComments : allComments.slice(0, 2);

  const fetchReviews = async () => {
    const userCommentId = user?.user_comments?.[0]?.userCommentId;
    if (!userCommentId) return;
    console.log(userCommentId);
    try {
      const response = await fetchReviewsByUserCommentId(userCommentId);
      const commentsArray = Array.isArray(response.data)
        ? response.data
        : [response.data];
      const reversetComments = [...commentsArray].reverse();

      const withAverages = reversetComments.map(comment => {
        const ratings = comment.ratings || {};
        const values = Object.values(ratings).filter(
          r => typeof r === 'number',
        ) as number[];
        const average = values.length
          ? values.reduce((sum, r) => sum + r, 0) / values.length
          : 0;

        return {
          ...comment,
          average, // Додаємо обчислене поле
        };
      });
      setAllComments(withAverages);
      console.log('ReviewStats', response);

      // Пошук першого коментаря користувача (можна замінити на авторизованого)
      // const commentsArray = Array.isArray(allRaiting ) ? allRaiting  : [allRaiting];
      const userComment = reversetComments[0]; // TODO: замінити на фільтр по userId
      setFirstComment(userComment);

      setTrainerData({
        name: user.firstName,
        surname: user.lastName,
        avatar: user.avatar,
        userRole: response.role || '',
        sport: response.sport || [],
      });

      // Ініціалізація об'єкта підрахунку оцінок
      const ratingsCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      let total = 0;
      let sum = 0;

      // Перебір всіх коментарів і підрахунок оцінок
      commentsArray.forEach((data: CommentData) => {
        if (data.ratings) {
          Object.entries(data.ratings).forEach(([_, rating]) => {
            if (typeof rating === 'number' && rating >= 1 && rating <= 5) {
              ratingsCount[rating as keyof typeof ratingsCount] += 1;
              sum += rating;
              total += 1;
            }
          });
        }
      });

      setRatings(ratingsCount);
      setTotalReviews(commentsArray.length);
      setAverageRating(total > 0 ? sum / total : 0);
    } catch (error) {
      setError('Помилка завантаження рейтингу');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(); // Викликаємо fetch при зміні user.userId
  }, [user?.userId]); // Перезапускаємо fetchData при зміні userId

  const handleFeedback = (id: string, type: 'like' | 'dislike') => {
    setAllComments(prev =>
      prev.map(allComments =>
        allComments._id === id
          ? {
              ...allComments,
              likes: type === 'like' ? (allComments.likes === 1 ? 0 : 1) : 0,
              dislikes:
                type === 'dislike' ? (allComments.dislikes === 1 ? 0 : 1) : 0,
            }
          : allComments,
      ),
    );
  };

  if (loading) return <Loading>Завантаження...</Loading>;
  if (error) return <ErrorText>{error}</ErrorText>;

  const maxRatingCount = Math.max(...Object.values(ratings), 1); // щоб уникнути ділення на 0
  const targetId = firstComment?.trainer || firstComment?.club || '';

  return (
    <div>
      <Title>
        <Icon name={IconName.ARROW_RIGHT} />
        ВІДГУКИ
      </Title>
      <RatingContainer>
        <div>
          {[5, 4, 3, 2, 1].map(star => (
            <RatingBar key={star}>
              <span>{star}</span>
              <Bar width={((ratings[star] || 0) / maxRatingCount) * 100} />
            </RatingBar>
          ))}
        </div>
        <div>
          <AverageRating
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
          {/* <Date>{review.date ?? 'Дата не вказана'}</Date> */}
        </div>
      </RatingContainer>
      <div onClick={() => setIsEditing(true)}>
        <ReviewHeader
          title="Залишити відгук"
          leftIcon={IconName.ARROW_CORNER}
          rightIcon={IconName.ARROW_CORNER}
          leftIconStyles={{ opacity: 0 }}
        />
      </div>

      {/* Карточки всіх відгуків */}
      <>
        {trainerData &&
          reviewsToShow.map(comment => (
            <ReviewCard key={comment._id}>
              <UserInfo>
                <Avatar src={trainerData.avatar} />
                <Div>
                  <Name>
                    {trainerData.name} {trainerData.surname}
                  </Name>
                  <Stars>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Icon
                        key={`${comment._id}-star-${star}`}
                        name={IconName.STAR_DEFAULT}
                        styles={{
                          fill:
                            star <= Math.round(comment.average ?? 0) // Перевірка на undefined
                              ? '#ED772F'
                              : '#494949',
                          color: 'transparent',
                        }}
                        size={16}
                      />
                    ))}
                  </Stars>
                </Div>
                <StyledDate>
                  {' '}
                  {comment.createdAt || comment.updatedAt
                    ? new Date(
                        comment.createdAt ?? comment.updatedAt!,
                      ).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Дата не вказана'}
                </StyledDate>
              </UserInfo>
              <CommentText>{comment.comment}</CommentText>
              <FeedbackSection
                reviewId={comment._id}
                likes={comment.likes ?? 0}
                dislikes={comment.dislikes ?? 0}
                onLike={handleFeedback}
                onDislike={handleFeedback}
              />
            </ReviewCard>
          ))}

        <ContainerButtonMore>
          {allComments.length > 2 && (
            <ButtonMore onClick={() => setShowAll(prev => !prev)}>
              {showAll ? 'Приховати' : 'Побачити більше'}
            </ButtonMore>
          )}
        </ContainerButtonMore>
      </>

      {/* Якщо isEditing true, відображаємо сторінку редагування */}
      {isEditing && firstComment && trainerData && (
        <EditReviewPage
          review={{
            id: firstComment._id,
            userCommentId: trainerData.userCommentId,
            name: trainerData.name || '',
            surname: trainerData.surname || '',
            avatar: trainerData.avatar || '',
            userRole: trainerData.userRole,
            sport: trainerData.sport || [],
            comment: firstComment.text || '',
            createdAt: firstComment.createdAt,
            updatedAt: firstComment.updatedAt,
            averageRating,
            totalReviews,
            targetId,

            rating: firstComment.rating ?? 0,
            likes: firstComment.likes ?? 0,
            dislikes: firstComment.dislikes ?? 0,
            isFirstReview: firstComment.isFirstReview ?? false,
          }}
          onCancel={() => setIsEditing(false)} // Кнопка для скасування редагування
        />
      )}
    </div>
  );
};

export default ReviewStats;
