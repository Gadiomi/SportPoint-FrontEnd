import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useGetCurrentCardIdQuery } from '../../../redux/details/cardIdApi';
import { IconName } from '@/kit';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import SocialLinks from '../components/SocialLinksCard/SocialLinksCard';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import PriceCard from '../components/PriceCard/PriceCard';
import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';
import OurHallsCard from '../components/OurHallsCard/OurHallsCard';
import LocationCard from '../components/LocationCard/LocationCard';
import ReviewDetailsCard from '../components/ReviewDetailsCard/ReviewDetailsCard';
import HrButton from '../components/StyledHrButton/StyledHrButton';
import OurCoachCard from '../components/OurCoachCard/OurCoachCard';
import { Contacts } from '../../../components/Footer/Contacts';

import { StyledProfileCard } from './styles';

const ClubPage: FC = () => {
  const { id } = useParams<{ id?: string }>();

  const { data, isLoading, error } = useGetCurrentCardIdQuery(id!, {
    skip: !id,
  });

  // const userRole = Cookies.get('userRole');
  // console.log('userRole', userRole);

  const isLoggedIn = !!localStorage.getItem('accessToken');

  console.log('Отримані дані з бекенду:', data);

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>Помилка отримання данних</div>;
  }

  const adminClubData = data?.data?.data;

  console.log('ROLE:', adminClubData?.role);

  const { _id, role, firstName, avatar, countReview, rating, images } =
    adminClubData || {};

  const { social_links, price, schedule, city, address } =
    adminClubData?.description || {};

  const roundedRating = rating ? parseFloat(rating.toFixed(1)) : 0;

  const title = isLoggedIn
    ? 'Введіть дані, і адміністратор з вами зв’яжеться'
    : 'Тільки авторизовані користувачі можуть зв’язатися з адміністратором';

  const coachTest = {
    avatar:
      'https://res.cloudinary.com/dkr0mmyqe/image/upload/v1735050627/ylzoczbh3tva6o7hojgb.jpg',
    firstName: 'Оксана',
    lastName: 'Шевченко',
    rating: 4.5,
    sport: ['Карате', 'Бокс'],
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
            _id={_id}
            role={role}
            iconNames={[IconName.MASSAGE_TYPING, IconName.HEART_NONE]}
            firstName={firstName}
            avatar={avatar}
            city={city}
            address={address}
          />
        </StyledProfileCard>
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
        {social_links && social_links.length > 0 && (
          <SocialLinks
            socialLinks={social_links || []}
            isLoggedIn={isLoggedIn}
            title={title}
          />
        )}
        {images && images.length > 0 && <GalleryCard images={images} />}
        <OurHallsCard />
        {price && price.length > 0 && <PriceCard prices={price || []} />}
        {schedule && schedule.length > 0 && (
          <WorkingHoursCard schedules={schedule || []} />
        )}
        <OurCoachCard
          iconNames={[IconName.STAR_DEFAULT]}
          rating={coachTest.rating}
          counts={[countReview ?? 0]}
          avatar={coachTest.avatar}
          firstName={coachTest.firstName}
          lastName={coachTest.lastName}
          // sport={sport || []}
          sport={coachTest.sport}
          price={coachTest.price}
        />
        <LocationCard />

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
        <HrButton />
        <Contacts />
      </Container>
    </Section>
  );
};

export default ClubPage;
