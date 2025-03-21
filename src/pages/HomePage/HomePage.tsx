import { Section } from '@/components/ContainerAndSection';
import css from './HomePage.module.css';
import { Logo } from '@/components/Logo/Logo';
import { TypeNavigation } from '@/components/TypeNavigation/TypeNavigation';

const HomePage = () => {
  return (
    <Section>
      <Logo />
      <TypeNavigation />
    </Section>
  );
};

export default HomePage;
