interface SocialLink {
  name: string;
  url: string;
}
interface Price {
  name?: string;
  description?: string;
  amount: string;
}
// interface Schedule {
//   days?: string;
//   hours?: string;
//   date?: Date;
// }

export interface WorkoutPlan {
  date: DateSchema;
  selection: SelectionSchema;
  selectedGym: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

interface Favorite {
  userId: string;
  role: string;
}
export interface Description {
  address?: string;
  city?: string;
  short_desc?: string;
  abilities?: string[];
  age?: string;
  schedule?: WorkoutPlan[];
  equipment?: string[];
  experience?: number;
  price?: Price[];
  social_links?: SocialLink[];
  phone?: string;
  email?: string;
}
export interface UserProfile {
  _id: string;
  userId: string;
  userCommentId?: string;
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
  work_list?: string[];
  user_comments?: {
    adminReply?: string;
    average?: number;
    comment?: string;
    createdAt?: string;
    owner?: string;
    ratings?: {
      [key: string]: number;
    };
    updatedAt?: string;
    userCommentId: string;
  }[];
}

export interface DateSchema {
  startTime: string;
  endTime: string;
}

export interface SelectionSchema {
  selectedType: string;
  city: string;
  address: string;
  avatar?: string;
}
