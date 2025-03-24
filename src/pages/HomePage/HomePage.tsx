import { Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { TypeNavigation } from '@/components/TypeNavigation/TypeNavigation';
import { Contacts } from '@/components/Footer/Contacts';

const HomePage = () => {
  return (
    <Section>
      <Logo />
      <TypeNavigation />
      <Contacts />
    </Section>
  );
};

export default HomePage;
