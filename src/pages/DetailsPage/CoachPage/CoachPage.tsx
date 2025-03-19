import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { Button, ButtonAppearance } from '@/kit';

import ProfileCard from '../components/ProfileCard/ProfileCard';

import { StyledHr } from './styles';

const CoachPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <Container>
        <Logo />
        <ProfileCard
          firstLastName="Максим Бондаренко"
          avatar="path/to/image.jpg"
        />
        <StyledHr />
        <Button
          testId="details_page.edit_button"
          title={t('details_page.edit_button')}
          appearance={ButtonAppearance.PRIMARY}
        />
      </Container>
    </Section>
  );
};

export default CoachPage;
