import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
import EditReviewPage from '@/pages/ReviewsPage/EditReviewPage';
// import styledHr from '@/components/';
import axios from 'axios';
import { Icon } from '@/kit';
import { IconName } from '@/kit';
import {
  Title,
  Bar,
  RatingBar,
  Summary,
  RatingContainer,
  Loading,
  ErrorText,
  CountReviews,
} from './styles';

const ReviewStats: React.FC = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://sportpoint-backend.onrender.com/cards/67cb064cb731dc6d28584704',
        );

        const comments = response.data.data.userComments;
        console.log('01.04', comments);

        // Ініціалізація об'єкта підрахунку оцінок
        const ratingsCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let total = 0;
        let sum = 0;

        // Перевірка чи це масив коментарів
        const commentsArray = Array.isArray(comments) ? comments : [comments];

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
          <Summary>
            <strong>{averageRating.toFixed(1)}</strong>
            <Icon
              name={IconName.STAR_FILL}
              styles={{ fill: '#ED772F', color: 'transparent' }}
              size={20}
            />
          </Summary>
          <CountReviews>{totalReviews} відгуки</CountReviews>
        </div>
      </RatingContainer>
      <div onClick={() => setIsEditing(true)}>
        <ReviewHeader
          title="Залишити відгук"
          leftIcon={null}
          rightIcon={IconName.ARROW_CORNER}
        />
      </div>
      {/* Якщо isEditing true, відображаємо сторінку редагування */}
      {isEditing && (
        <EditReviewPage
          review={{ id: '', name: 'Користувач', avatar: '', comment: '' }}
          onCancel={() => setIsEditing(false)} // Кнопка для скасування редагування
        />
      )}
    </div>
  );
};

export default ReviewStats;
