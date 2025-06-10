import { axiosInstance } from '@/redux/auth/axios';

export const fetchReviewsAboutUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/reviews/user/${userId}`);
    return data;
  } catch (error) {
    console.error('Помилка при завантаженні відгуків про користувача:', error);
    throw error;
  }
};

// ⚡ Отримуємо всіх користувачів
export const fetchAllUsers = async () => {
  const allUsers: any[] = [];
  let page = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosInstance.get(`/cards?page=${page}`);
      const users = response.data.data.data;

      if (!users || users.length === 0) {
        hasMore = false;
      } else {
        allUsers.push(...users);
        page++;
      }
    }
  } catch (error) {
    console.error('Помилка при завантаженні всіх користувачів:', error);
  }

  return allUsers;
};

export const fetchUserById = async (id: string) => {
  const { data } = await axiosInstance.get(`/cards/${id}`);
  if (!data) throw new Error('Не вдалося отримати користувача');
  return data;
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
  adminReply?: string,
) => {
  const isNewReview = !reviewId;
  const method = isNewReview ? 'post' : 'patch';
  const url = isNewReview ? '/reviews' : `/reviews/${reviewId}`;

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

  // Якщо є adminReply і це редагування — відправляємо окремий запит
  if (!isNewReview && adminReply !== undefined) {
    console.log('Updating adminReply...');
    await axiosInstance.patch(
      `/reviews/${reviewId}/reply/update`,
      { adminReply },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    );
  }

  return data;
};

export const reportReview = async ({
  reviewId,
  reason,
}: {
  reviewId: string;
  reason: string;
}) => {
  const { data } = await axiosInstance.post(`/reviews/${reviewId}/report`, {
    reason,
  });
  return data;
};

// Надіслати відповідь на відгук
export const replyToReview = async (reviewId: string, adminReply: string) => {
  console.log('replyToReview викликано з:', reviewId, adminReply);
  try {
    const response = await axiosInstance.patch(`/reviews/${reviewId}/reply`, {
      adminReply,
    });
    console.log('Сервер відповів:', response);

    return response;
  } catch (error: any) {
    console.error('Помилка при надсиланні відповіді:', error);
    if (error.response) {
      console.error('Деталі відповіді з сервера:', error.response.data);
    }
    throw error;
  }
};

// Видалити відгук або відповідь до відгуку
export const deleteReview = async (reviewId: string, isReply = false) => {
  try {
    const url = isReply
      ? `/reviews/${reviewId}/reply/delete`
      : `/reviews/${reviewId}`;
    console.log('Delete request to:', url);
    const { data } = await axiosInstance.delete(url);
    return data; // Повертаємо дані відповіді від сервера, якщо потрібно
  } catch (error) {
    console.error('Помилка при видаленні:', error);
    throw error;
  }
};

// Видалення та редагування відповіді до відгуку
export const updateAdminReply = async (id: string, reply: string) => {
  const response = await axiosInstance.patch(`reviews/${id}/reply/update`, {
    reply,
  });
  return response.data;
};

// Отримати всі відгуки авторизованого користувача (через токен)
export const fetchReviewsByOwner = async (ownerId: string) => {
  if (!ownerId) throw new Error("ID користувача обов'язковий");
  const { data } = await axiosInstance.get(`/reviews/owner/${ownerId}`);
  return data;
};
