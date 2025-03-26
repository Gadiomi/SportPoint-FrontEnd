// import axios from 'axios';
import {
  FC,
  // useState, useEffect
} from 'react';

import { useTranslation } from 'react-i18next';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { ButtonAppearance, ButtonTypogr, Icon, IconName } from '@/kit';

import StyledHr from '../../../components/StyledHr/StyledHr';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import ContactsCard from '../components/ContactsCard/ContactsCard';
import PriceCard from '../components/PriceCard/PriceCard';
import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';
import WorksInCard from '../components/WorksInCard/WorksInCard';
import ReviewDetailsBlock from '../components/ReviewDetailsCard/ReviewDetailsCard';
import HrButton from '../components/StyledHrButton/StyledHrButton';
import { Contacts } from '../../../components/Footer/Contacts';

import { StyledProfileCard, StyledButton } from './styles';

const CoachPage: FC = () => {
  const { t } = useTranslation();

  const countReview = 385;
  const experience = 23;
  const rating = 4.9;

  const prices = [
    { name: 'Індивідуальні заняття', amount: '1350' },
    { name: 'Групові заняття', amount: '350' },
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

  // const [coachData, setCoachData] = useState<any>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {

  //   axios
  //     .get('https://sportpoint-backend.onrender.com/cards')
  //     .then(response => {
  //       console.log('DATA:', response.data);
  //       console.log('DATA-2:', response.data.data);
  //       setCoachData(response.data.data);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       setError('Помилка при отриманні даних');
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <div>Завантаження...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // const {
  //   firstLastName,
  //   avatar,
  //   countReview,
  //   rating,
  //   price,
  //   schedule,
  //   experience,
  // } = coachData || {};

  return (
    <Section>
      <Container>
        <Logo />
        <StyledProfileCard>
          {/* <ProfileCard firstLastName={firstLastName} avatar={avatar} /> */}
          <ProfileCard
            firstLastName="Максим Бондаренко"
            avatar="path/to/image.jpg"
          />
        </StyledProfileCard>
        <StyledHr />
        <StyledButton
          testId="details_page.edit_button"
          title={t('details_page.edit_button')}
          appearance={ButtonAppearance.PRIMARY}
          appendChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.ARROW_CORNER}
            />
          }
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
          iconNames={[
            IconName.LIKE,
            IconName.LIGHTNING_FILLED,
            IconName.STAR_DEFAULT,
          ]}
          counts={[countReview, experience, rating]}
          labels={['Відгуки', 'Досвід', 'Рейтинг']}
        />
        <StyledHr />
        <ContactsCard />
        <StyledHr />
        <PriceCard prices={prices} />
        {/* <PriceCard prices={[price]} /> */}
        <StyledHr />
        <WorkingHoursCard schedules={schedules} />
        {/* <WorkingHoursCard schedules={[schedule]} /> */}
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
