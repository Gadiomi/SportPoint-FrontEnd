import { FC } from 'react';
// import { useParams } from 'react-router-dom';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { IconName } from '@/kit';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import ContactsCard from '../components/SocialLinksCard/SocialLinksCard';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import PriceCard from '../components/PriceCard/PriceCard';
import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';
import LocationCard from '../components/LocationCard/LocationCard';
import ReviewDetailsBlock from '../components/ReviewDetailsCard/ReviewDetailsCard';
import EditButton from '../components/EditButton/EditButton';
import HrButton from '../components/StyledHrButton/StyledHrButton';
import { Contacts } from '../../../components/Footer/Contacts';

import { StyledProfileCard, StyledHr } from './styles';

const AdminClubPage: FC = () => {
  // const { id } = useParams<{ id?: string }>();

  // if (!id) {
  //   return <div>Невідомий користувач</div>;
  // }

  const countReview = 385;
  const couch = 23;
  // в БД масив, необхвдно взяти довжину
  const rating = 4.9;

  const prices = [
    { name: 'Безліміт 07:00-22:00', amount: '1350' },
    { name: 'Ранковий 07:00-14:00', amount: '350' },
    { name: 'Денний 12:00-17:00', amount: '450' },
  ];

  const schedules = [
    { days: 'Понеділок', hours: '07:00-22:00' },
    { days: 'Вівторок', hours: '07:00-22:00' },
    { days: 'Середа', hours: '07:00-22:00' },
    { days: 'Четер', hours: '07:00-22:00' },
    { days: 'П’ятниця', hours: '07:00-22:00' },
    { days: 'Субота', hours: '07:00-22:00' },
    { days: 'Неділя', hours: '07:00-22:00' },
  ];

  return (
    <Section>
      <Container>
        <Logo />
        <StyledProfileCard>
          <ProfileCard
            firstLastName="Sport life"
            avatar="path/to/image.jpg"
            address="Київ, Хрещатик, 26Л"
          />
        </StyledProfileCard>
        <StyledHr />
        <EditButton
        // id={id}
        />
        <ReviewCard
          iconNames={[IconName.LIKE, IconName.CLUB, IconName.STAR_DEFAULT]}
          counts={[countReview, couch, rating]}
          labels={['Відгуки', 'Тренери', 'Рейтинг']}
        />
        <ContactsCard />
        <StyledHr />
        <GalleryCard />
        <StyledHr />
        <PriceCard prices={prices} />
        <StyledHr />
        <WorkingHoursCard schedules={schedules} />
        <StyledHr />
        <LocationCard />
        <StyledHr />
        <ReviewDetailsBlock />
        <HrButton />
        <Contacts />
      </Container>
    </Section>
  );
};

export default AdminClubPage;
