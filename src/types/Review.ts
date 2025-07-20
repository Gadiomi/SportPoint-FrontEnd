import { Roles } from '@/constants';

export interface Review {
  id: string;
  userCommentId: string;
  owner?: string;
  name: string;
  surname: string;
  avatar: string;
  comment: string;
  adminReply?: string;
  recommend?: string;
  sport?: string[];
  createdAt: string;
  updatedAt?: string;
  rating: number;
  likes?: number;
  dislikes?: number;
  isFirstReview?: boolean;
  userRole: Roles;
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
