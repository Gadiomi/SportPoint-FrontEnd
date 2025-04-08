type TCoachPrice = {
  name: string;
  amount: string;
};

type TCoachDescription = {
  abilities: string[];
  price: TCoachPrice[];
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
  firstLastName: string;
  avatar: string;
  countReview: number;
  rating: number;
  description: TCoachDescription;
}

export interface IClubData {
  name: string;
  description: string;
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
  experience: string;
  schedule: ScheduleClub[];
}
export interface ScheduleClub {
  days: string;
  hours: string;
}

/* Filters data */
export interface FilterParams {
  city: string;
  priceFrom: number | null;
  priceTo: number | null;
  sortBy: string | null;
  classification: string[];
}
