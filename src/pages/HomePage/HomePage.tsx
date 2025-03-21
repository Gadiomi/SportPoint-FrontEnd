import { Section } from '@/components/ContainerAndSection';

import { Logo } from '@/components/Logo/Logo';
import { TypeNavigation } from '@/components/TypeNavigation/TypeNavigation';

import { Footer } from '@/components/Footer/Footer';

const HomePage = () => {
  return (
    <Section>
      <Logo />
      <TypeNavigation />
      <Footer />
    </Section>
  );
};

export default HomePage;
