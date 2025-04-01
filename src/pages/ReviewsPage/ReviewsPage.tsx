import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
import ReviewItem from '@/components/ReviewItem/ReviewItem';
import ReviewStats from '@/components/ReviewItem/ReviewStats';
import EditReviewPage from './EditReviewPage';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

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

  async function fetchData() {
    try {
      const response = await axios.get(
        'https://sportpoint-backend.onrender.com/cards/67cb064cb731dc6d28584704',
      );
      console.log('запит 31.03', response.data.data.userComments);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  const fetchReviews = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(
        'https://sportpoint-backend.onrender.com/cards/67cb064cb731dc6d28584704',
      );

      // console.log('Відповідь від сервера:', response); // Дивимось усю відповідь
      // console.log('Дані у відповіді:', response.data); // Перевіряємо, чи є `data`

      const data = response.data.data;
      // console.log('Розпарсені дані:', data);

      const userComments = data.userComments;
      // console.log('Відгуки:', userComments);

      const ratings = userComments.ratings;
      const averageRating =
        (ratings.clientService +
          ratings.serviceQuality +
          ratings.priceQuality +
          ratings.location +
          ratings.cleanliness) /
        5;

      const review: Review = {
        id: userComments.userCommentId,
        name: data.data.firstLastName,
        avatar: data.data.avatar,
        comment: userComments.comment,
        date: new Date(userComments.createdAt).toLocaleDateString(),
        rating: Math.round(averageRating),
        likes: 0,
        dislikes: 0,
        // images: userComments.images,
      };

      setReviews([review]);
    } catch (err) {
      setError('Не вдалося завантажити відгуки');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchReviews();

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
          // reviews={[{ ratings: { 5: 10, 4: 80, 3: 150, 2: 30, 1: 10 } }]}
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
