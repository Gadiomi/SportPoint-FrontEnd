import { useState } from 'react';
import { deleteReview } from '@/redux/reviews/reviewsApi';
import { Review } from '@/types/Review';

export const useDeleteComment = (
  setExternalReviews?: React.Dispatch<React.SetStateAction<Review[]>>,
) => {
  //   const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteReview = async (id: string, adminReply?: string) => {
    console.log('handleDeleteReview викликано!', id, adminReply);
    const isReply = !!adminReply;

    if (
      window.confirm(
        `Ви дійсно хочете видалити цей ${isReply ? 'відповідь' : 'відгук'}?`,
      )
    ) {
      try {
        await deleteReview(id, isReply);

        if (setExternalReviews) {
          setExternalReviews(prev =>
            isReply
              ? prev.map(review =>
                  review.id === id
                    ? { ...review, adminReply: undefined }
                    : review,
                )
              : prev.filter(review => review.id !== id),
          );
        }
      } catch (err) {
        console.error('Помилка при видаленні:', err);
        setError('Не вдалося видалити відгук');
      }
    }
  };

  return {
    // reviews,
    // setReviews,
    handleDeleteReview,
    error,
  };
};
