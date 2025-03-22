import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { ButtonAppearance, ButtonTypogr, Icon, IconName } from '@/kit';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import ContactsCard from '../components/ContactsCard/ContactsCard';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import PriceCard from '../components/PriceCard/PriceCard';
import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';
import LocationCard from '../components/LocationCard/LocationCard';

import { StyledProfileCard, StyledHr, StyledButton } from './styles';

const AdminClubPage: FC = () => {
  const { t } = useTranslation();

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
        <StyledButton
          testId="details_page.edit_button"
          title={t('details_page.edit_button')}
          appearance={ButtonAppearance.PRIMARY}
        >
          <ButtonTypogr>{t('details_page.edit_button')}</ButtonTypogr>

          <Icon
            name={IconName.ARROW_CORNER}
            styles={{
              position: 'absolute',
              right: '12px',
            }}
          />
        </StyledButton>
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
      </Container>
    </Section>
  );
};

export default AdminClubPage;
