import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IconName } from '@/kit';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';

// import ButtonEdit from '../components/ButtonEdit/ButtonEdit';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import StyledHr from '../../../components/StyledHr/StyledHr';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import SocialLinks from '../components/SocialLinksCard/SocialLinksCard';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import PriceCard from '../components/PriceCard/PriceCard';
import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';
import LocationCard from '../components/LocationCard/LocationCard';
import ReviewDetailsCard from '../components/ReviewDetailsCard/ReviewDetailsCard';
import HrButton from '../components/StyledHrButton/StyledHrButton';
import OurCoachCard from '../components/OurCoachCard/OurCoachCard';
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

interface AdminClub {
  _id: string;
  userId: string;
  firstName: string;
  avatar: string;
  images: string[];
  certificates: string[];
  coach: string[];
  description: {
    address: string;
    short_desc: string;
    abilities: string;
    social_links: SocialLink[];
    price: PriceItem[];
    schedule: ScheduleItem[];
    // experience: string;
  };
  countReview: number;
  rating: number;
  equipment: string;

  phone: string;
  email: string;
  club: string[];

  favorite: object[];
  role: string;
}

const ClubPage: FC = () => {
  const { id } = useParams<{ id?: string }>();

  const [adminClubData, setAdminClubData] = useState<AdminClub | null>(null);
//   const [
//     isLoggedIn,
//     setIsLoggedIn
//   ] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const url = `https://sportpoint-backend.onrender.com/cards/${id}`;
      console.log('Запит до API:', url);
      axios
        .get(url)
        .then(response => {
          setAdminClubData(response.data.data.data);
          console.log('DATA', response.data.data.data);
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
    avatar,
    countReview,
    rating,
    // coach,
    // phone,
    // email,
  } = adminClubData || {};

  const { social_links, price, schedule, address } =
    adminClubData?.description || {};

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
            address={address}
            firstName={firstName}
            avatar={avatar}
          />
        </StyledProfileCard>
        <StyledHr />
        {/* <ButtonEdit
        // id={id}
        /> */}
        <ReviewCard
          iconNames={[IconName.LIKE, IconName.CLUB, IconName.STAR_DEFAULT]}
          counts={[
            countReview ?? 0,
            Array.isArray(coachTest) && coachTest.length > 0
              ? coachTest.length
              : 0,
            roundedRating,
          ]}
          labels={['Відгуки', 'Тренери', 'Рейтинг']}
        />
        <StyledHr />
        <SocialLinks
          socialLinks={social_links || []}
          //   isLoggedIn={isLoggedIn}
          //   title="Введіть дані, і адміністратор з вами зв’яжеться"
        />
        <StyledHr />
        <GalleryCard />
        <StyledHr />
        <PriceCard prices={price || []} />
        <StyledHr />
        <WorkingHoursCard schedules={schedule || []} />
        <StyledHr />
        <LocationCard />
        <StyledHr />
        <OurCoachCard
          iconNames={[IconName.STAR_DEFAULT]}
          rating={coachTest.rating}
          counts={[countReview ?? 0]}
          avatar={coachTest.avatar}
          firstName={coachTest.firstName}
          lastName={coachTest.lastName}
          equipment={coachTest.equipment}
          price={coachTest.price}
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

export default ClubPage;
