import { Section } from '@/components/ContainerAndSection';
import { ClubsList } from '../components/ClubsList/ClubsList';
import { Logo } from '@/components/Logo/Logo';
import { Contacts } from '@/components/Footer/Contacts';

const ClubsPage = () => {
  return (
    <Section>
      <Logo />
      <ClubsList />
      <Contacts />
    </Section>
  );
};

export default ClubsPage;
