type TCoachPrice = {
  name: string;
  amount: string;
};

type TCoachDescription = {
  abilities: string;
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
