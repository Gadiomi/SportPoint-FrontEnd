import axios from 'axios';
import { axiosInstance } from '@/redux/auth/axios';

// Зберегти або оновити відгук
export const saveReview = async (
  reviewId: string,
  comment: string,
  ratings: {
    attitude: number;
    service: number;
    price: number;
    cleanliness: number;
  },
) => {
  const isNewReview = !comment;
  const method = isNewReview ? 'post' : 'put';
  const url = isNewReview ? '/reviews' : `/reviews/${reviewId}`;

  const { data } = await axiosInstance({
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      reviewId,
      text: comment,
      ratings,
    },
  });

  return data;
};

// сторінка ReviewStats
// Отримати всі відгуки авторизованого користувача (через токен)
export const fetchReviewsByOwner = async (ownerId: string) => {
  const { data } = await axiosInstance.get(`/reviews/owner/${ownerId}`);
  return data.data;
};

export const fetchReviewsByCardId = async (id: string) => {
  const { data } = await axiosInstance.get(`/cards/${id}`);
  return data.data;
};
// Розділити відгуки на клуби та тренерів
// export const fetchSeparatedMyReviews = async () => {
// //   const allReviews = await fetchMyReviews();

// //   const clubReviews = allReviews.filter((review: any) => review.userRole === 'adminClub');
// //   const coachReviews = allReviews.filter((review: any) => review.userRole === 'coach');

//   return { clubReviews, coachReviews };
// };
