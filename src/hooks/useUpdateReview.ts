import { useCallback, useState } from 'react';
import { Review } from '@/types/Review'; // або CommentData, якщо потрібно

type UseUpdateReviewProps = {
  setReviews?: React.Dispatch<React.SetStateAction<Review[]>>;
  fetchReviews: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useUpdateReview = ({
  setReviews,
  fetchReviews,
  setIsEditing,
}: UseUpdateReviewProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleReviewUpdate = useCallback(
    (updatedReview: Review) => {
      if (setReviews) {
        setReviews(prev =>
          prev.map(r => (r.id === updatedReview.id ? updatedReview : r)),
        );
      } else {
        fetchReviews(); // fallback
      }
      setIsEditing(false);
    },
    [setReviews, fetchReviews, setIsEditing],
  );

  return { handleReviewUpdate, error };
};

// import { useCallback } from 'react';
// import { Review } from '@/types/Review';

// type UseUpdateReviewProps = {
//   setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
//   fetchReviews: () => void;
//   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export const useUpdateReview = ({
//   setReviews,
//   fetchReviews,
//   setIsEditing,
// }: UseUpdateReviewProps) => {
//   const handleReviewUpdate = useCallback((updatedReview: Review) => {
//     setReviews(prev =>
//       prev.map(r => (r.id === updatedReview.id ? updatedReview : r))
//     );
//     fetchReviews();
//     setIsEditing(false);
//   }, [setReviews, fetchReviews, setIsEditing]);

//   return { handleReviewUpdate };
// };
