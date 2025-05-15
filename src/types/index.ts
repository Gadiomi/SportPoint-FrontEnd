type TCoachPrice = {
  name: string;
  amount: string;
  description: string;
};

type TCoachDescription = {
  abilities: string[];
  price: TCoachPrice;
  // price: TCoachPrice[];
};

type Props = {
  userId: string;
  firstLastName: string;
  avatar: string;
  countReview: number;
  rating: number;
  description: TCoachDescription;
};

export interface ICoachData {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  countReview: number;
  rating: number;
  description: TCoachDescription;
}

export interface IClubData {
  _id: string;
  firstName: string;
  lastName?: string;
  avatar: string;
  description: DescriptionClub;
  distance: string;
  workTime: string;
}

export interface RegisterFormData {
  first_name: string;
  second_name: string;
  email: string;
  password: string;
  confirm_password: string;
  club_name: string;
  phone: string;
  city?: string;
  address?: string;
  // abilities?: string[];
  sport?: string[];
}

/* AdminClub List */

export interface ClubData {
  _id: number;
  firstName: string;
  avatar: string;
  description: DescriptionClub;
  countReview: number;
  rating: number;
}

export interface DescriptionClub {
  address: string;
  abilities: string[];
  experience?: string;
  schedule?: ScheduleClub[];
  price?: TCoachPrice[];
  short_desc?: string;
}
export interface ScheduleClub {
  days: string;
  hours: string;
}

/* Filters data */
export interface FilterParams {
  address?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  abilities?: string;
  sort?: string | null;
}

/* Search Data*/
export interface SearchResultCoach extends ICoachData {
  role: 'coach';
}

export interface SearchResultClub extends ClubData {
  role: 'adminClub';
}

export type SearchResultParams = SearchResultCoach | SearchResultClub;

export interface SearchResponse {
  profiles: SearchResultParams[];
}
