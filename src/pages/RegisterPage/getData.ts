import { useEffect, useState } from 'react';
import axios from 'axios';
import { Roles } from '@/constants';

interface IClubsAddress {
  clubName: string;
  address: string;
  city: string;
}

const BASE_URL = 'https://sportpoint-backend.onrender.com/';

const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const ENDPOINTS = { GET_CARDS: '/cards' };

const getCards = async (role: string) => {
  try {
    const result = await axiosPublic.get(ENDPOINTS.GET_CARDS, {
      params: { perPage: 20, role: role },
    });
    return result;
  } catch (error) {
    return { message: error };
  }
};

const gettingClubsAddress = (clubsArray: any[]) => {
  let clubsDescription: IClubsAddress[];
  if (clubsArray?.length > 0) {
    clubsDescription = clubsArray.map(item => ({
      clubName: item?.firstName,
      address: item?.description.address
        ? item?.description.address
        : 'No address',
      city: item?.description.city ? item?.description.city : 'No city',
    }));
    return clubsDescription;
  } else return [];
};

export const useClubsInfo = () => {
  const [inClubsList, setInClubsList] = useState<IClubsAddress[] | []>([]);

  useEffect(() => {
    const dataGetRequest = async () => {
      const result: any = await getCards(Roles.ADMIN_CLUB);
      // console.log('result -> ', result);
      if (result?.status === 200) {
        const resultArr = gettingClubsAddress(result?.data?.data?.data);
        setInClubsList(resultArr);
      } else {
        console.error('getCards Error!');
      }
    };
    dataGetRequest();
  }, []);

  return inClubsList;
};

// --- / - ---
