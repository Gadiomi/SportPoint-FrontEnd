export interface Review {
  id: string;
  userCommentId: string;
  name: string;
  surname: string;
  avatar: string;
  comment: string;
  sport?: string[];
  createdAt: string;
  updatedAt: string;
  rating: number;
  likes: number;
  dislikes: number;
  isFirstReview: boolean;
  userRole: 'customer' | 'coach' | 'adminClub';
  averageRating: number;
  totalReviews: number;
  ratings?: {
    clientService: number;
    serviceQuality: number;
    priceQuality: number;
    location: number;
    cleanliness: number;
  };
  targetId: string;
}
