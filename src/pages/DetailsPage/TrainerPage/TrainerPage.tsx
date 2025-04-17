import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useGetCurrentCardIdQuery } from '../../../redux/details/cardIdApi';
import { useTranslation } from 'react-i18next';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { IconName } from '@/kit';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import SocialLinks from '../components/SocialLinksCard/SocialLinksCard';
import PriceCard from '../components/PriceCard/PriceCard';
import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';
import CertificatesCard from '../components/CertificatesCard/CertificatesCard';
import WorksInCard from '../components/WorksInCard/WorksInCard';
import ReviewDetailsCard from '../components/ReviewDetailsCard/ReviewDetailsCard';
import ShortDescriptionCard from '../components/ShortDescriptionCard/ShortDescriptionCard';
import HrButton from '../components/StyledHrButton/StyledHrButton';
import { Contacts } from '../../../components/Footer/Contacts';
import { StyledProfileCard } from './styles';

const TrainerPage: FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { t } = useTranslation();

  const { data, isLoading, error } = useGetCurrentCardIdQuery(id!, {
    skip: !id,
  });

  const userRole = Cookies.get('userRole');
  console.log('userRole', userRole);

  const isLoggedIn = !!localStorage.getItem('accessToken');

  console.log('Отримані дані з бекенду:', data);

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>Помилка отримання данних</div>;
  }

  const coachData = data?.data?.data;

  const { firstName, lastName, avatar, countReview, rating, sport } =
    coachData || {};

  const {
    social_links,
    price,
    schedule,
    experience,
    city,
    address,
    age,
    short_desc,
  } = coachData?.description || {};

  const roundedRating = rating ? parseFloat(rating.toFixed(1)) : 0;

  const token = localStorage.getItem('accessToken');
  console.log('Token:', token);

  const title = token
    ? 'Введіть дані, і тренер з вами зв’яжеться'
    : 'Тільки авторизовані користувачі можуть зв’язатися з тренером';

  // ТЕСТ
  const coachTest = {
    avatar:
      'https://res.cloudinary.com/dkr0mmyqe/image/upload/v1735050627/ylzoczbh3tva6o7hojgb.jpg',
    firstName: 'Оксана',
    lastName: 'Шевченко',
    rating: 4.5,
    sport: ['Карате', 'Бокс'],
    price: ['1000 грн'],
    age: 27,
    short_desc:
      'Моїм основним напрямком є індивідуальний підхід до кожного клієнта. Я вірю, що кожен має свої сильні сторони, і важливо враховувати фізичні можливості та особисті цілі на шляху до результату. Я працюю з людьми різного віку та рівня підготовки — від початківців до професіоналів, допомагаючи досягати бажаних результатів без ризику для здоров’я.',
  };

  const clientService = 4.3;
  const serviceQuality = 5;
  const priceQuality = 2.1;
  const location = 3;
  const cleanliness = 3.7;

  // Закінчення ТЕСТ

  return (
    <Section>
      <Container>
        <Logo />
        <StyledProfileCard>
          <ProfileCard
            iconNames={[IconName.MASSAGE_TYPING, IconName.HEART_NONE]}
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
            city={city}
            address={address}
            age={age}
            sport={sport}
          />
        </StyledProfileCard>
        <ReviewCard
          iconNames={[
            IconName.LIKE,
            IconName.LIGHTNING_FILLED,
            IconName.STAR_DEFAULT,
          ]}
          counts={[countReview ?? 0, experience ?? '0', roundedRating]}
          labels={['Відгуки', 'Досвід', 'Рейтинг']}
        />
        <ShortDescriptionCard
          short_desc={short_desc}
          title={t('details_page.read_more')}
        />
        <CertificatesCard />
        <SocialLinks
          socialLinks={social_links || []}
          isLoggedIn={isLoggedIn}
          title={title}
        />
        <PriceCard prices={price || []} />
        <WorkingHoursCard schedules={schedule || []} />

        <WorksInCard
          // key={club._id}
          clubs={coachData?.club || []}
          iconNames={[IconName.LOCATION, IconName.CLOCK]}
          labels={['1,5 км', '24/7']}
        />

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

export default TrainerPage;
