import { Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';

import { Contacts } from '@/components/Footer/Contacts';
import { ResultList } from './ResultList';

const ResultSearchPage = () => {
  return (
    <Section>
      <Logo />
      <ResultList />
      <Contacts />
    </Section>
  );
};

export default ResultSearchPage;
