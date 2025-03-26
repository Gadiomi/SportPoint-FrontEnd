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
import ReviewDetailsBlock from '../components/ReviewDetailsCard/ReviewDetailsCard';
import HrButton from '../components/StyledHrButton/StyledHrButton';
import { Contacts } from '../../../components/Footer/Contacts';

import { StyledProfileCard } from './styles';

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
  userId: string;
  firstLastName: string;
  avatar: string;
  images: string[];
  certificates: string[];
  description: {
    address: string;
    short_desc: string;
    abilities: string;
    social_links: SocialLink[];
    price: PriceItem[];
    schedule: ScheduleItem[];
    experience: string;
  };
  countReview: number;
  rating: number;
  equipment: string;

  phone: string;
  email: string;
  club: string[];
  coach: string[];
  favorite: object[];
  role: string;
}

const CoachPage: FC = () => {
  const { id } = useParams<{ id?: string }>();

  const [coachData, setCoachData] = useState<Coach | null>(null);
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
    firstLastName,
    avatar,
    countReview,
    rating,
    // phone,
    // email,
  } = coachData || {};

  const { social_links, price, schedule, experience } =
    coachData?.description || {};

  return (
    <Section>
      <Container>
        <Logo />
        <StyledProfileCard>
          <ProfileCard firstLastName={firstLastName} avatar={avatar} />
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
          counts={[countReview ?? 0, experience ?? '0', rating ?? 0]}
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
          iconNames={[IconName.LOCATION, IconName.CLOCK]}
          labels={['1,5 км', '24/7']}
        />
        <StyledHr />
        <ReviewDetailsBlock />
        <HrButton />
        <Contacts />
      </Container>
    </Section>
  );
};

export default CoachPage;
