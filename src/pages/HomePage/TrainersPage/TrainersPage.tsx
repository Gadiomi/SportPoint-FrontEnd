import { Section } from '@/components/ContainerAndSection';
import { Contacts } from '@/components/Footer/Contacts';
import { Logo } from '@/components/Logo/Logo';
import { TrainersList } from '../components/TrainersList/TrainersList';

const TrainersPage = () => {
  return (
    <Section>
      <Logo />
      <TrainersList />
      <Contacts />
    </Section>
  );
};

export default TrainersPage;
