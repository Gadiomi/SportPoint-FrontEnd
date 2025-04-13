import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/reviews/reviewsSelector';
import { fetchReviewsByOwner } from '@/redux/reviews/reviewsApi';
import styled from 'styled-components';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
import EditReviewPage from '@/pages/ReviewsPage/EditReviewPage';
import AverageRating from './AverageRating';
// import styledHr from '@/components/';
import axios from 'axios';
import { Icon } from '@/kit';
import { IconName } from '@/kit';
import {
  Title,
  Bar,
  RatingBar,
  RatingContainer,
  Loading,
  ErrorText,
} from './styles';

const ReviewStats: React.FC = () => {
  // const ownerId = useAppSelector(state => state.Auth.user?._id);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  if (!ownerId) return;

        const response = await fetchReviewsByOwner('67f241921c039dcf35baaea2');

        //  console.log('ReviewStats',response);
        const data = response;

        // Пошук першого коментаря користувача (можна замінити на авторизованого)
        const commentsArray = Array.isArray(response) ? response : [response];
        const userComment = commentsArray[0]; // TODO: замінити на фільтр по userId
        setFirstComment(userComment);

        setTrainerData({
          name: data.firstName,
          surname: data.lastName,
          avatar: data.avatar,
          userRole: data.role,
          sport: data.sport || [],
        });

        // Ініціалізація об'єкта підрахунку оцінок
        const ratingsCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let total = 0;
        let sum = 0;

        // Перевірка чи це масив коментарів
        // const commentsArray = Array.isArray(comments) ? comments : [comments];

        // Перебір всіх коментарів і підрахунок оцінок
        commentsArray.forEach(comment => {
          if (comment.ratings) {
            Object.entries(comment.ratings).forEach(([_, rating]) => {
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

    fetchData();
  }, []);

  if (loading) return <Loading>Завантаження...</Loading>;
  if (error) return <ErrorText>{error}</ErrorText>;

  const maxRatingCount = Math.max(...Object.values(ratings), 1); // щоб уникнути ділення на 0

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
      {/* Якщо isEditing true, відображаємо сторінку редагування */}
      {isEditing && firstComment && trainerData && (
        <EditReviewPage
          review={{
            id: firstComment._id,
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
          }}
          onCancel={() => setIsEditing(false)} // Кнопка для скасування редагування
        />
      )}
    </div>
  );
};

export default ReviewStats;
