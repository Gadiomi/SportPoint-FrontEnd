interface SocialLink {
  name: string;
  url: string;
}
interface Price {
  name?: string;
  description?: string;
  amount: string;
}
interface Schedule {
  days?: string;
  hours?: string;
  date?: Date;
}
interface Favorite {
  userId: string;
  role: string;
}
interface Description {
  address?: string;
  short_desc?: string;
  abilities?: string[];
  age?: string;
  schedule?: Schedule[];
  equipment?: string[];
  experience?: string;
  price?: Price[];
  social_links?: SocialLink[];
  phone?: string;
  email?: string;
}
export interface UserProfile {
  userId: string;
  countReview: number;
  rating: number;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  images?: string[];
  certificates?: string[];
  description: Description;
  role?: string;
  favorite?: Favorite[];
  club?: string[];
  coach?: string[];
  sport?: string[];
}
