import { Container, Section } from '@/components/ContainerAndSection';
import { LogoBox } from './styles';

const FavoritesPage = () => {
  return (
    <Section>
      <Container maxWidth="320px">
        <LogoBox>
          <img src="/assets/images/logo@1.png" alt="logo" />
        </LogoBox>
        <div className="">
          <h1>Favorites Page</h1>
        </div>
      </Container>
    </Section>
  );
};

export default FavoritesPage;
