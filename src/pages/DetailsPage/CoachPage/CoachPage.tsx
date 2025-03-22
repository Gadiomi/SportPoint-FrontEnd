import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { ButtonAppearance, ButtonTypogr, Icon, IconName } from '@/kit';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import ContactsCard from '../components/ContactsCard/ContactsCard';
import PriceCard from '../components/PriceCard/PriceCard';
import WorkingHoursCard from '../components/WorkingHoursCard/WorkingHoursCard';

import { StyledProfileCard, StyledHr, StyledButton } from './styles';

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

  return (
    <Section>
      <Container>
        <Logo />
        <StyledProfileCard>
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
        <StyledHr />
        <WorkingHoursCard schedules={schedules} />
        <StyledHr />
      </Container>
    </Section>
  );
};

export default CoachPage;
