import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewHeader from '@/kit/ReviewItem/ReviewHeader';
import EditReviewPage from '@/pages/ReviewsPage/EditReviewPage';
import { formattingReviews } from '@/kit/ReviewItem/formattingReviews';
import { Icon } from '@/kit';
import { IconName } from '@/kit';
import {
  Title,
  Row,
  BarContainer,
  Bar,
  RatingSummary,
  ContainerStats,
} from './styles';

// interface ReviewStatsProps {
//   ratings: { [key: number]: number }; // Наприклад: { 5: 120, 4: 80, 3: 50, 2: 30, 1: 20 }
// }

// Оголошення типу Review
interface Review {
  ratings: { [key: number]: number }; // Наприклад: { 5: 120, 4: 80, 3: 50, 2: 30, 1: 20 }
}

interface ReviewStatsProps {
  reviews: Review[]; // Передаємо список відгуків
}

// const ReviewStats: React.FC<ReviewStatsProps> = ({ ratings }) => {
//   const totalReviews = Object.values(ratings).reduce((a, b) => a + b, 0);
//   const averageRating =
//     Object.entries(ratings).reduce((sum, [key, value]) => sum + Number(key) * value, 0) /
//     totalReviews;

//   const maxCount = Math.max(...Object.values(ratings));
const ReviewStats: React.FC<ReviewStatsProps> = ({ reviews }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <EditReviewPage
        review={{ id: '', name: 'Користувач', avatar: '', comment: '' }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  const percentages = formattingReviews(reviews); // Отримуємо розподіл у відсотках
  console.log('розподіл у відсотках', percentages);

  const totalReviews = reviews.reduce(
    (sum, review) =>
      sum +
      Object.values(review.ratings).reduce((cnt, count) => cnt + count, 0),
    0,
  );
  const totalScore = reviews.reduce(
    (sum, review) =>
      sum +
      Object.entries(review.ratings).reduce(
        (rSum, [key, value]) => rSum + Number(key) * value,
        0,
      ),
    0,
  );

  console.log(totalScore);
  const averageRating = totalReviews > 0 ? totalScore / totalReviews : 0;
  console.log(averageRating);

  //   const totalStars = reviews.reduce((sum, review) => {
  //   return sum + Object.entries(review.ratings).reduce(
  //     (rSum, [star, count]) => rSum + Number(star) * count,
  //     0
  //   );
  // }, 0);

  // const totalVotes = reviews.reduce((sum, review) => {
  //   return sum + Object.values(review.ratings).reduce((cnt, count) => cnt + count, 0);
  // }, 0);

  //     const averageRating = totalVotes > 0 ? totalStars / totalVotes : 0;
  //      const averageRating = reviews.reduce(
  //     (sum, review) =>
  //       sum + Object.entries(review.ratings).reduce((rSum, [key, value]) => rSum + Number(key) * value, 0),
  //     0
  //   ) / totalReviews;

  return (
    <div>
      <Title>
        <Icon name={IconName.ARROW_RIGHT} />
        ВІДГУКИ
      </Title>

      <ContainerStats>
        {/* <div>
      {Object.entries(ratings)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([star, count]) => (
          <Row key={star}>
            <span>{star}</span>
            <BarContainer>
              <Bar width={(count / maxCount) * 100} />
            </BarContainer>
          </Row>
        ))}
        </div> */}
        <div>
          {[5, 4, 3, 2, 1].map(star => {
            const percentage =
              percentages[
                `${star === 5 ? 'fives' : star === 4 ? 'fours' : star === 3 ? 'threes' : star === 2 ? 'twos' : 'ones'}`
              ] || 0;
            return (
              <Row key={star}>
                <span>{star}</span>
                <BarContainer>
                  <Bar width={percentage} />
                </BarContainer>
              </Row>
            );
          })}
        </div>

        <div>
          <RatingSummary>
            {averageRating.toFixed(1)}
            <Icon
              name={IconName.STAR_FILL}
              styles={{ fill: '#ED772F', color: 'transparent' }}
              size={20}
            />
          </RatingSummary>
          <p>{totalReviews} відгуки</p>
        </div>
      </ContainerStats>
      <div onClick={() => setIsEditing(true)}>
        <ReviewHeader
          title="Залишити відгук"
          leftIcon={null}
          rightIcon={IconName.ARROW_CORNER}
        />
      </div>
    </div>
  );
};

export default ReviewStats;
