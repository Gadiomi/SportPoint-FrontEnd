import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCurrentCardIdQuery } from '../../../redux/details/cardIdApi';
import { useTranslation } from 'react-i18next';
import { IconName } from '@/kit';
import { useAppSelector } from '@/hooks/hooks';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import ButtonBack from '../components/ButtonBack/ButtonBack';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import SocialLinks from '../components/SocialLinksCard/SocialLinksCard';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import PriceCard from '../components/PriceCard/PriceCard';
import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';
// import OurHallsCard from '../components/OurHallsCard/OurHallsCard';
import LocationCard from '../components/LocationCard/LocationCard';
import ReviewDetailsCard from '../components/ReviewDetailsCard/ReviewDetailsCard';
import HrButton from '../components/StyledHrButton/StyledHrButton';
import CoachCard from '@/components/CoachCard/CoachCard';
import { ICoachData } from '../../../types/index';
// import OurCoachCard from '../components/OurCoachCard/OurCoachCard'; *видалити картку
import { Contacts } from '../../../components/Footer/Contacts';

import { StyledProfileCard } from './styles';

const ClubPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { isLogin } = useAppSelector(state => state.setLogin);
  console.log(' Користувач залогінився', isLogin);

  const { data, isLoading, error } = useGetCurrentCardIdQuery(id!, {
    skip: !id,
  });

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

  const { social_links, price, subscriptions, schedule, city, address } =
    adminClubData?.description || {};

  const roundedRating = rating ? parseFloat(rating.toFixed(1)) : 0;

  const title = isLogin
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
        <ButtonBack t={t} />
        <StyledProfileCard>
          <ProfileCard
            _id={_id}
            role={role}
            isLogin={isLogin}
            iconNames={[IconName.ICON_CHAT, IconName.HEART_NONE]}
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
          labels={['Відгуки', 'Зали', 'Рейтинг']}
        />
        {schedule && schedule.length > 0 && (
          <WorkingHoursCard schedules={schedule || []} />
        )}
        {social_links && social_links.length > 0 && (
          <SocialLinks
            socialLinks={social_links || []}
            isLogin={isLogin}
            title={title}
          />
        )}
        {images && images.length > 0 && <GalleryCard images={images} />}
        {/* <OurHallsCard /> */}
        {subscriptions && subscriptions.length > 0 && (
          <PriceCard
            subscriptions={subscriptions}
            titleKey="details_page.subscription"
            defaultImage="/assets/images/DetailsPage/Subscription_no_photo.png"
          />
        )}

        {Array.isArray(adminClubData?.coaches) &&
          adminClubData.coaches.map((coach: ICoachData) => (
            <CoachCard key={coach._id} coachData={coach} />
          ))}
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
