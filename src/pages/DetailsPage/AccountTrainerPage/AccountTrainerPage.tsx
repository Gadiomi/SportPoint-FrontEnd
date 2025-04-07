import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { IconName } from '@/kit';

import EditButton from '../components/EditButton/EditButton';
import StyledHr from '../../../components/StyledHr/StyledHr';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import SocialLinks from '../components/SocialLinksCard/SocialLinksCard';
import PriceCard from '../components/PriceCard/PriceCard';
import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';
import WorksInCard from '../components/WorksInCard/WorksInCard';
import ReviewDetailsCard from '../components/ReviewDetailsCard/ReviewDetailsCard';
import HrButton from '../components/StyledHrButton/StyledHrButton';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import { Contacts } from '../../../components/Footer/Contacts';

import { StyledProfileCard, ButtonContainer } from './styles';

interface ScheduleItem {
  days: string;
  hours: string;
}

interface SocialLink {
  name: string;
  url: string;
}

interface PriceItem {
  _id: string;
  name: string;
  amount: string;
  description?: string;
}

interface Coach {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  countReview: number;
  rating: number;
  club: string[];
  description: {
    social_links: SocialLink[];
    price: PriceItem[];
    schedule: ScheduleItem[];
    experience: string;

    address: string;
    short_desc: string;
    abilities: string;
  };
  userId: string;
  equipment: string;
  certificates: string[];
  phone: string;
  email: string;
  images: string[];
  coach: string[];
  favorite: object[];
  role: string;
}

const AccountTrainerPage: FC = () => {
  const { id } = useParams<{ id?: string }>();

  const [coachData, setCoachData] = useState<Coach | null>(null);
  const [clubsName, setClubsName] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const url = `https://sportpoint-backend.onrender.com/cards/${id}`;
      console.log('Запит до API:', url);
      axios
        .get(url)
        .then(response => {
          setCoachData(response.data.data.data);
          console.log('DATA', response.data.data.data);
          const clubIds = response.data.data.data.club;
          console.log('ID клубу:', clubIds);

          if (clubIds.length === 0) {
            setClubsName(['Клуб не знайдено']);
          } else {
            Promise.all(
              clubIds.map((clubId: string) => {
                const clubUrl = `https://sportpoint-backend.onrender.com/clubs/${clubId}`;
                return axios.get(clubUrl);
              }),
            )
              .then(clubResponses => {
                const clubNames = clubResponses.map(
                  clubResponse => clubResponse.data.name,
                );
                setClubsName(clubNames);
              })
              .catch(err => {
                console.error('Помилка при отриманні клубів:', err);
                setClubsName(['Клуб не знайдено']);
              });
          }

          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Помилка при отриманні даних');
          setIsLoading(false);
        });
    } else {
      setError('ID не знайдено');
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const {
    firstName,
    lastName,
    avatar,
    countReview,
    rating,
    // phone,
    // email,
  } = coachData || {};

  const { social_links, price, schedule, experience } =
    coachData?.description || {};

  const roundedRating = rating ? parseFloat(rating.toFixed(1)) : 0;

  const coachTest = {
    avatar:
      'https://res.cloudinary.com/dkr0mmyqe/image/upload/v1735050627/ylzoczbh3tva6o7hojgb.jpg',

    firstName: 'Оксана',
    lastName: 'Шевченко',
    rating: 4.5,
    equipment: ['Карате', 'Бокс'],
    price: ['1000 грн'],
  };

  const clientService = 4.3;
  const serviceQuality = 5;
  const priceQuality = 2.1;
  const location = 3;
  const cleanliness = 3.7;

  return (
    <Section>
      <Container>
        <Logo />
        <StyledProfileCard>
          <ProfileCard
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
          />
        </StyledProfileCard>
        <StyledHr />
        <EditButton

        // id={id}
        />
        <ReviewCard
          iconNames={[
            IconName.LIKE,
            IconName.LIGHTNING_FILLED,
            IconName.STAR_DEFAULT,
          ]}
          counts={[countReview ?? 0, experience ?? '0', roundedRating]}
          labels={['Відгуки', 'Досвід', 'Рейтинг']}
        />
        <StyledHr />
        <SocialLinks socialLinks={social_links || []} />
        <StyledHr />
        <PriceCard prices={price || []} />
        <StyledHr />
        <WorkingHoursCard schedules={schedule || []} />
        <StyledHr />
        <WorksInCard
          clubsName={clubsName[0] || 'Невідомий клуб'}
          clubId={clubsName[0]}
          iconNames={[IconName.LOCATION, IconName.CLOCK]}
          labels={['1,5 км', '24/7']}
        />
        <ButtonContainer>
          <ButtonLink
          // onClick={onClick}
          // disabled={disabled}
          />
        </ButtonContainer>
        <StyledHr />
        <ReviewDetailsCard
          iconNames={[IconName.STAR_DEFAULT]}
          rating={coachTest.rating}
          counts={[countReview ?? 0]}
          clientService={clientService}
          serviceQuality={serviceQuality}
          priceQuality={priceQuality}
          location={location}
          cleanliness={cleanliness}
          avatar={coachTest.avatar}
          firstName={coachTest.firstName}
          lastName={coachTest.lastName}
        />

        <ButtonContainer>
          <ButtonLink
          // onClick={onClick}
          // disabled={disabled}
          />
        </ButtonContainer>
        <HrButton />
        <Contacts />
      </Container>
    </Section>
  );
};

export default AccountTrainerPage;
