import { Section } from '@/components/ContainerAndSection';
import { ClubsList } from '../components/ClubsList/ClubsList';
import { Logo } from '@/components/Logo/Logo';
import { Contacts } from '@/components/Footer/Contacts';

const ClubsPage = () => {
  const items = [
    {
      id: 1,
      name: 'FitLife Gym',
      number: 456789,
    },
    {
      id: 2,
      name: 'PowerHouse Fitness',
      number: 567890,
    },
    {
      id: 3,
      name: 'Elite Training Club',
      number: 8765432,
    },
    {
      id: 4,
      name: 'FitLife Gym',
      number: 456789,
    },
    {
      id: 5,
      name: 'PowerHouse Fitness',
      number: 567890,
    },
    {
      id: 6,
      name: 'Elite Training Club',
      number: 8765432,
    },
    {
      id: 7,
      name: 'FitLife Gym',
      number: 456789,
    },
    {
      id: 8,
      name: 'PowerHouse Fitness',
      number: 567890,
    },
    {
      id: 9,
      name: 'Elite Training Club',
      number: 8765432,
    },
  ];

  return (
    <Section>
      <Logo containerStyles={{ zIndex: 1000 }} />
      <ClubsList items={items} />
      <Contacts />
    </Section>
  );
};

export default ClubsPage;
