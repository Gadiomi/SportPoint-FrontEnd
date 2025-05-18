import { FC } from 'react';
import { useGetCurrentCardIdQuery } from '../../../redux/details/cardIdApi';
import { IconName } from '@/kit';
import { useAppSelector } from '@/hooks/hooks';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import SocialLinks from '../components/SocialLinksCard/SocialLinksCard';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import PriceCard from '../components/PriceCard/PriceCard';
// import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';
// import OurHallsCard from '../components/OurHallsCard/OurHallsCard';
import LocationCard from '../components/LocationCard/LocationCard';
import ReviewDetailsCard from '../components/ReviewDetailsCard/ReviewDetailsCard';
import HrButton from '../components/StyledHrButton/StyledHrButton';
import CoachCard from '@/components/CoachCard/CoachCard';
import {ICoachData } from '@/types';
// import OurCoachCard from '../components/OurCoachCard/OurCoachCard'; *видалити картку
import { Contacts } from '../../../components/Footer/Contacts';

import { StyledProfileCard } from './styles';

interface AdminClubProps {
  id: string;
}

const AdminClubPage: FC<AdminClubProps> = ({ id }) => {
  console.log('ID:', id);
  const { isLogin } = useAppSelector(state => state.setLogin);
  console.log(' Користувач залогінився', isLogin);

  const { data, isLoading, error } = useGetCurrentCardIdQuery(id!, {
    skip: !id,
  });

  console.log('Отримані дані з бекенду:', data);

  if (!id) {
    return <div>Ідентифікатор не переданий!</div>;
  }

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

  const roundedRating = rating ? parseFloat(rating.toFixed(2)) : 0;

  const title = '';

  const coachTest = {
    avatar:
      'https://res.cloudinary.com/dkr0mmyqe/image/upload/v1735050627/ylzoczbh3tva6o7hojgb.jpg',
    firstName: 'Оксана  ',
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
    <>
      <StyledProfileCard>
        <ProfileCard
          _id={_id}
          role={role}
          isLogin={isLogin}
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
        labels={['Відгуки', 'Зали', 'Рейтинг']}
      />
      {social_links && social_links.length > 0 && (
        <SocialLinks
          socialLinks={social_links || []}
          isLogin={isLogin}
          title={title}
        />
      )}
      {images && images.length > 0 && <GalleryCard images={images} />}
      {/* <OurHallsCard /> */} 
      {price && price.length > 0 && (
        <PriceCard
          prices={price}
          titleKey="details_page.subscription"
          defaultImage="/assets/images/DetailsPage/Subscription_no_photo.png"
        />
      )}
      {/* {schedule && schedule.length > 0 && (
        <WorkingHoursCard schedules={schedule || []} />
      )} */}
      {/* <OurCoachCard
        iconNames={[IconName.STAR_DEFAULT]}
        rating={coachTest.rating}
        counts={[countReview ?? 0]}
        avatar={coachTest.avatar}
        firstName={coachTest.firstName}
        lastName={coachTest.lastName}
        price={coachTest.price}
      /> */}
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
    </>
  );
};

export default AdminClubPage;
