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
  city?: string;
  address?: string;
  // abilities?: string[];
  sport?: string[];
}
