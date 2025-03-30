import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewHeader from '@/kit/ReviewItem/ReviewHeader';
import ReviewItem from '@/kit/ReviewItem/ReviewItem';
import ReviewStats from '@/kit/ReviewItem/ReviewStats';
import EditReviewPage from './EditReviewPage';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

// Тип для параметрів запиту
// interface RequestParams {
//   [key: string]: string | number | boolean;
// }

// Інтерфейси
interface UserData {
  id: string;
  name: string;
  avatar: string;
}

interface ReviewData {
  id: string;
  comment: string;
  date: string;
  rating: number;
  likes: number;
  dislikes: number;
}

interface Review extends UserData, ReviewData {} // об'єднуємо

// Функція для конвертації API-відповіді у потрібний формат

// Тип для відповіді сервера (змінюй залежно від структури API)
// interface Review {
//   id: number;
//   name: string;
//   avatar: string;
//   date: string;
//   comment: string;
//   likes: number;
//   dislikes: number;
//   rating: number; // ✅ Додаємо "?" (може бути undefined)
//   reviews: { id: number; rating: number }[]; // ✅ Додаємо для середнього рейтингу
// }

// // Створюємо екземпляр Axios із базовою URL-адресою API
// export const review: AxiosInstance = axios.create({
//   baseURL: 'sportpoint-backend.onrender.com/',
// });

// // Об'єкт для керування токеном аутентифікації
// export const tokenControl = {
//   set(token: string): void {
//     review.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset(): void {
//     review.defaults.headers.common.Authorization = '';
//   },
// };

// // Функція для отримання даних з сервера
// export async function get(params?: RequestParams): Promise<Review[]> {
//   const { data } = await review.get<Review[]>('/review', { params });
//   return data;
// }

// const getCurrentDate = (): string => {
//   const now = new window.Date();
//   return `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1)
//     .toString()
//     .padStart(2, '0')}.${now.getFullYear()}`;
// };

// const initialReviews = [
//   {
//     id: 1,
//     name: 'Андрій М.',
//     avatar: '/assets/images/avatar.png',
//     rating: 4,
//     reviews: [
//       { id: 1, rating: 5 },
//       { id: 2, rating: 5 },
//       { id: 3, rating: 6 },
//       { id: 4, rating: 5 },
//     ],
//     comment:
//       'Відмінний тренер! 👋 Дуже уважний до деталей, допомагає правильно виконувати вправи та мотивує не здаватися. Завдяки його порадам я бачу реальні результати вже через кілька тижнів! Рекомендую всім, хто хоче ефективні тренування та підтримку. 💪',
//     date: getCurrentDate(), // Використовуємо функцію тут!
//     likes: 0,
//     dislikes: 0,
//   },

//   // Можно добавить больше отзывов
// ];

const ReviewsPage = () => {
  const { id } = useParams<{ id: string }>();
  // const [reviewsState, setReviewsState] = useState([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingReview, setIsCreatingReview] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);

  const { t } = useTranslation();
  const { theme } = useTheme();

  const ratings = {
    5: 10,
    4: 80,
    3: 150,
    2: 30,
    1: 100,
  };

  // Функція отримання даних про користувачів
  const fetchUserData = async (): Promise<UserData[]> => {
    try {
      const response = await axios.get(
        `https://sportpoint-backend.onrender.com/cards`,
      );
      return response.data.map((user: any) => ({
        id: user._id,
        name: user.firstLastName || 'Анонімний користувач',
        avatar: user.avatar || '/assets/images/default-avatar.png',
      }));
    } catch (error) {
      console.error('Помилка при отриманні користувачів:', error);
      return [];
    }
  };

  // Функція отримання даних про відгуки
  const fetchReviewData = async (): Promise<ReviewData[]> => {
    try {
      const response = await axios.get(
        `https://sportpoint-backend.onrender.com/cards/$67cb064cb731dc6d28584704`,
      );

      console.log('Отримані дані:', response.data); // Логування даних

      return response.data.map((review: any) => {
        console.log('Оброблюваний review:', review);
        console.log('Оброблюваний review:', review); // Логування кожного окремого об'єкта
        const ratings = review.userComments.ratings;
        const averageRating =
          (ratings.clientService +
            ratings.serviceQuality +
            ratings.priceQuality +
            ratings.location +
            ratings.cleanliness) /
          5;
        return {
          id: review.userId, // Це має відповідати `id` з user API
          comment: review.userComments.comment || '',
          date: new Date(review.userData?.data?.createdAt).toLocaleDateString(),
          rating: Math.round(averageRating),
          // rating: review.userComments.ratings.overall, // або інша логіка розрахунку рейтингу
          likes: 0,
          dislikes: 0,
        };
      });
    } catch (error) {
      console.error('Помилка при отриманні відгуків:', error);
      return [];
    }
  };

  // Завантаження та об'єднання даних
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const [users, reviews] = await Promise.all([
        fetchUserData(),
        fetchReviewData(),
      ]);

      // Об'єднуємо дані за ID користувача
      const mergedReviews = reviews
        .map(review => {
          const user = users.find(user => user.id === review.id) ?? {
            id: review.id,
            name: 'Анонімний користувач',
            avatar: '/assets/images/default-avatar.png',
          };
          return { ...user, ...review };
        })
        .filter((review): review is Review => review !== null);

      setReviews(mergedReviews);
    } catch (err) {
      setError('Не вдалося завантажити відгуки');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  // Функція для Так/Ні
  // const handleFeedback = (id: number, type: 'like' | 'dislike') => {
  //   setReviews(prevReviews =>
  //     prevReviews.map(review => {
  //       if (review.id === id) {
  //         if (type === 'like') {
  //           return {
  //             ...review,
  //             likes: review.likes === 0 ? 1 : 0,
  //             dislikes: 0,
  //           };
  //         } else {
  //           return {
  //             ...review,
  //             dislikes: review.dislikes === 0 ? 1 : 0,
  //             likes: 0,
  //           };
  //         }
  //       }
  //       return review;
  //     }),
  //   );
  // };

  // Функція видалення відгуку

  const handleFeedback = (id: string, type: 'like' | 'dislike') => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === id
          ? {
              ...review,
              likes: type === 'like' ? (review.likes ? 0 : 1) : 0,
              dislikes: type === 'dislike' ? (review.dislikes ? 0 : 1) : 0,
            }
          : review,
      ),
    );
  };

  // const handleDeleteReview = async (id: number) => {
  //   console.log('Видаляється відгук з ID:', id);
  //   const isConfirmed = window.confirm('Ви дійсно хочете видалити цей відгук?');
  //   if (isConfirmed) {
  //     setReviewsState(prevReviews => {
  //       const updatedReviews = [
  //         ...prevReviews.filter(review => review.id !== id),
  //       ];
  //       console.log('Оновлений список відгуків:', updatedReviews);
  //       return updatedReviews;
  //     });
  //   }
  // };

  // Функція видалення редагування

  // Функція видалення відгуку
  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Ви дійсно хочете видалити цей відгук?')) {
      try {
        await axios.delete(
          `http://sportpoint-backend.onrender.com/cards/67cb064cb731dc6d28584704`,
        );
        setReviews(prevReviews =>
          prevReviews.filter(review => review.id !== id),
        );
      } catch (err) {
        setError('Не вдалося видалити відгук');
        console.error(err);
      }
    }
  };

  const handleEdit = (review: Review) => {
    setCurrentReview(review);
    setIsEditing(true);
  };

  const handleCreateReview = () => {
    setIsCreatingReview(true); // Увімкнути режим створення відгуку
  };

  //   return (
  //     <Section>
  //       <Container>
  //         {isEditing ? (
  //           currentReview && (
  //             <EditReviewPage
  //               review={currentReview}
  //               onCancel={() => setIsEditing(false)}
  //             />
  //           )
  //         ) : (
  //           <>
  //               <ReviewHeader />
  //               <ReviewStats ratings={ratings}/>
  //               {reviews.map(review => (
  //               <ReviewItem
  //                 key={review.id}
  //                 review={review}
  //                 onLike={handleFeedback}
  //                 onDislike={handleFeedback}
  //                 onDelete={handleDeleteReview}
  //                 onEdit={handleEdit}
  //               />
  //             ))}
  //           </>
  //         )}
  //       </Container>
  //     </Section>
  //   );
  // };

  // export default ReviewsPage;

  return (
    <div>
      {isEditing ? (
        currentReview && (
          <EditReviewPage
            review={currentReview}
            onCancel={() => setIsEditing(false)}
          />
        )
      ) : (
        <>
          {!isCreatingReview && <ReviewHeader />}
          <ReviewStats
            reviews={[{ ratings: { 5: 10, 4: 80, 3: 150, 2: 30, 1: 10 } }]}
          />
          {loading ? (
            <p>Завантаження...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            reviews.map(review => (
              <ReviewItem
                key={review.id}
                review={review}
                onLike={handleFeedback}
                onDislike={handleFeedback}
                onDelete={handleDeleteReview}
                onEdit={handleEdit}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsPage;
