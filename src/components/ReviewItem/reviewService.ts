import {
  fetchUserById,
  fetchReviewsByUserCommentId,
  fetchAllUsers,
} from '@/redux/reviews/reviewsApi';
import { Review } from '@/types/Review';

interface ReviewStatsResult {
  reviews: Review[];
  averageRating: number;
  ratingCounts: Record<number, number>;
}
export const getReviewStats = async (
  userId: string,
  user: any,
): Promise<ReviewStatsResult> => {
  const isTrainerOrClub = user?.role === 'trainer' || user?.role === 'club';
  const userCommentId = isTrainerOrClub
    ? user?.userId
    : user?.user_comments?.[0]?.userCommentId;

  let commentsArray: any[] = [];

  if (user) {
    const response = await fetchUserById(userId);
    const comment = response.data?.userComments;
    if (comment) {
      commentsArray = [comment];
    }
  } else {
    if (!userCommentId) {
      throw new Error('userCommentId is missing');
    }
    const response = await fetchReviewsByUserCommentId(userCommentId);
    commentsArray = Array.isArray(response.data)
      ? response.data
      : [response.data];
  }

  const reversedComments = [...commentsArray].reverse();
  const allUsers = await fetchAllUsers();

  const reviews: Review[] = reversedComments.map(comment => {
    const ownerProfile = allUsers.find(u => u.userId === comment.owner);

    const ratings = comment.ratings || {};
    const ratingValues = Object.values(ratings).filter(
      v => typeof v === 'number',
    ) as number[];

    const averageRating = ratingValues.length
      ? ratingValues.reduce((sum, r) => sum + r, 0) / ratingValues.length
      : 0;

    return {
      id: comment._id,
      userCommentId: comment.userCommentId,
      name: ownerProfile?.firstName || '',
      surname: ownerProfile?.lastName || '',
      avatar: ownerProfile?.avatar || '',
      comment: comment.comment,
      sport: ownerProfile?.sport || [],
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      rating: averageRating,
      likes: comment.likes || 0,
      dislikes: comment.dislikes || 0,
      isFirstReview: false, // або логіка, яка це визначає
      userRole: ownerProfile?.role || 'customer',
      averageRating,
      totalReviews: 1, // або логіка, яка це визначає
      ratings: comment.ratings,
      targetId: comment.userCommentId,
    };
  });

  const allRatings = reviews.flatMap(
    r =>
      Object.values(r.ratings || {}).filter(
        v => typeof v === 'number',
      ) as number[],
  );

  const total = allRatings.reduce((sum, r) => sum + r, 0);
  const overallAverage = allRatings.length ? total / allRatings.length : 0;

  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allRatings.forEach(r => {
    const rounded = Math.round(r);
    if (ratingCounts[rounded] !== undefined) {
      ratingCounts[rounded]++;
    }
  });

  return {
    reviews,
    averageRating: overallAverage,
    ratingCounts,
  };
};
