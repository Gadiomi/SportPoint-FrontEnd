import axios from 'axios';
import { axiosInstance } from '@/redux/auth/axios';

// Отримати профіль користувача за userId
export const fetchUserProfileByUserId = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/profile/${userId}`);
    return data.userProfile;
  } catch (error) {
    console.error('Не вдалося отримати профіль користувача', error);
    throw error;
  }
};

const getUserIdFromBackend = async (userCommentId: string) => {
  try {
    const response = await axiosInstance.get(`/reviews/${userCommentId}`); // Запит до бекенду для отримання даних користувача
    return response.data.userCommentId;
  } catch (error) {
    console.error('Не вдалося отримати ID користувача', error);
    throw error;
  }
};

// Отримати всі відгуки про конкретного користувача (userCommentId)
export const fetchReviewsByUserCommentId = async (userCommentId: string) => {
  try {
    const { data } = await axiosInstance.get(`/reviews/user/${userCommentId}`);
    return data;
  } catch (error) {
    console.error('Помилка при завантаженні відгуків про користувача:', error);
    throw error;
  }
};

// Зберегти або оновити відгук
export const saveReview = async (
  reviewId: string | null,
  comment: string,
  ratings: {
    attitude: number;
    service: number;
    price: number;
    cleanliness: number;
  },
  userCommentId: string,
  targetId: string,
  // userCommentId: string,
) => {
  const isNewReview = !reviewId;
  const method = isNewReview ? 'post' : 'patch';
  const url = isNewReview ? '/reviews' : `/reviews/${reviewId}`;
  console.log(url);

  const backendRatings = {
    clientService: ratings.attitude,
    serviceQuality: ratings.service,
    priceQuality: ratings.price,
    location: ratings.cleanliness,
    cleanliness: ratings.cleanliness,
  };

  const dataToSend = {
    userCommentId,
    comment,
    ratings: backendRatings,
  };

  console.log('Data to send:', dataToSend);

  const { data } = await axiosInstance({
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: dataToSend,
    withCredentials: true,
  });

  return data;
};

// Надіслати скаргу на відгук
export const reportReview = async (reviewId: string) => {
  const { data } = await axiosInstance.post(`/${reviewId}/report`, {
    reviewId,
  });
  return data;
};

// Надіслати відповідь на відгук
export const replyToReview = async (reviewId: string, replyText: string) => {
  const { data } = await axiosInstance.post(`/reviews/${reviewId}/reply`, {
    reviewId,
    replyText,
  });
  return data;
};

// Видалити відгук
export const deleteReview = async (reviewId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/reviews/${reviewId}`);
    return data; // Повертаємо дані відповіді від сервера, якщо потрібно
  } catch (error) {
    console.error('Помилка при видаленні відгуку:', error);
    throw error;
  }
};

// Отримати всі відгуки авторизованого користувача (через токен)
export const fetchReviewsByOwner = async (ownerId: string) => {
  if (!ownerId) throw new Error("ID користувача обов'язковий");
  const { data } = await axiosInstance.get(`/reviews/owner/${ownerId}`);
  return data;
};

// сторінка ReviewStats
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
