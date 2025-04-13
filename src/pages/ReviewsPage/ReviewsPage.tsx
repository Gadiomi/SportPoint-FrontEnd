import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
import ReviewItem from '@/components/ReviewItem/ReviewItem';
import ReviewStats from '@/components/ReviewItem/ReviewStats';
import EditReviewPage from './EditReviewPage';
import ReviewActions from '@/components/ReviewItem/ReviewActions';
import FeedbackSection from '@/components/ReviewItem/FeedbackSection';
import ReviewTabsSwitcher from '@/components/ReviewItem/ReviewTabsSwitcher';
import AverageRating from '@/components/ReviewItem/AverageRating';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ReviewCard } from '@/components/ReviewItem/styles';
import { Div } from './styles';
import { fetchReviewsByCardId } from '@/redux/reviews/reviewsApi';
import { date } from 'yup';

// Інтерфейси
interface UserData {
  id: string;
  name: string;
  surname: string;
  avatar: string;
}

interface ReviewData {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  likes: number;
  dislikes: number;
  isFirstReview: boolean;
  userRole: 'customer' | 'coach' | 'adminClub';
}

interface Review extends UserData, ReviewData {
  averageRating: number;
  totalReviews: number;
} // об'єднуємо

const ReviewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingReview, setIsCreatingReview] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [selectedTab, setSelectedTab] = useState<'coach' | 'adminClub'>(
    'adminClub',
  );

  const { t } = useTranslation();
  const { theme } = useTheme();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const reviewsResponse = await fetchReviewsByCardId(
        '67cadbb405a41b47ac8ded40',
      );

      const cardData = reviewsResponse.data;
      const userComment = reviewsResponse.userComments;

      console.log('Розпарсені дані:', cardData);
      console.log('', userComment);

      // Перевірка, чи є коментар
      if (!userComment) {
        setReviews([]);
        return;
      }

      console.log(selectedTab);

      // Обчислення середнього рейтингу
      const averageRating = userComment.average || 0;
      console.log(averageRating);
      const totalReviews = 1;

      const userRole = cardData.role;
      console.log(userRole);

      console.log(cardData.firstName);

      if (!userRole) {
        setError('Не вдалося визначити роль користувача');
        setReviews([]);
        return;
      }

      const review: Review = {
        id: userComment._id,
        name: cardData.firstName,
        surname: cardData.lastName,
        avatar: cardData.avatar,
        comment: userComment.comment,
        createdAt: userComment.cretedAt,
        updatedAt: userComment.updatedAt,
        rating: Math.round(averageRating),
        likes: 0,
        dislikes: 0,
        userRole: cardData.role,
        isFirstReview: userComment.isFirst ?? false, // Передаємо isFirstReview
        averageRating,
        totalReviews,
        // images: userComments.images,
      };

      const reviewDateToShow = review.updatedAt
        ? review.updatedAt
        : review.createdAt;
      console.log('Page', reviewDateToShow);

      console.log('Parsed role:', review.userRole);
      console.log('Selected tab:', selectedTab);

      // Фільтрація за табом
      if (review.userRole === selectedTab) {
        setReviews([review]);
      } else {
        setReviews([]);
      }
    } catch (err) {
      setError('Не вдалося завантажити відгуки');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(); // Викликаємо при першому рендері
  }, []);

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  useEffect(() => {
    fetchReviews(); // оновлюємо при зміні вкладки
  }, [selectedTab]);

  const handleFeedback = (id: string, type: 'like' | 'dislike') => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === id
          ? {
              ...review,
              likes: type === 'like' ? (review.likes === 1 ? 0 : 1) : 0,
              dislikes:
                type === 'dislike' ? (review.dislikes === 1 ? 0 : 1) : 0,
            }
          : review,
      ),
    );
  };

  // Функція видалення відгуку
  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Ви дійсно хочете видалити цей відгук?')) {
      try {
        await axios.delete(
          `http://sportpoint-backend.onrender.com/reviews/${id}`,
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
    <Div>
      {isEditing ? (
        currentReview && (
          <Div>
            <EditReviewPage
              review={currentReview as Review}
              onCancel={() => setIsEditing(false)}
            />
          </Div>
        )
      ) : (
        <>
          {!isCreatingReview && <ReviewHeader />}

          <ReviewTabsSwitcher
            tabs={['Клуби', 'Тренери']}
            selectedTab={selectedTab}
            onSelectTab={(tab: 'coach' | 'adminClub') => setSelectedTab(tab)}
            // onReviewsChange={handleTabChange}  // Додаємо обробник зміни вкладки
          />
          <ReviewStats />
          {loading ? (
            <p>Завантаження...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            reviews.map(review => {
              const reviewDateToShow = review.updatedAt || review.createdAt;

              return (
                <ReviewCard key={review.id}>
                  <ReviewItem review={review} />
                  <FeedbackSection
                    reviewId={review.id}
                    likes={review.likes}
                    dislikes={review.dislikes}
                    onLike={handleFeedback}
                    onDislike={handleFeedback}
                  />
                  <ReviewActions
                    reviewId={review.id}
                    onDelete={handleDeleteReview}
                    onEdit={() => handleEdit(review)}
                    userRole={review.userRole}
                    isFirstReview={review.isFirstReview ?? false}
                    reviewDate={reviewDateToShow}
                  />
                </ReviewCard>
              );
            })
          )}
        </>
      )}
    </Div>
  );
};
export default ReviewsPage;
