import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Section } from '@/components/ContainerAndSection';
import { useTheme } from '@/hooks';

const AccountLayout = () => {
  const { theme } = useTheme();
  return (
    <Section>
      <Container maxWidth="320px">
        <StyledImage
          srcSet="/public/assets/images/logo@1.png 1x, /public/assets/images/logo@2.png 2x"
          src="/public/assets/images/logo@1.png"
          alt="Logo"
        />
        <Outlet />
      </Container>
    </Section>
  );
};

export default AccountLayout;

const StyledImage = styled.img(({ theme }) => ({
  margin: 'auto',
  marginBottom: theme.pxs.x5,
  marginTop: theme.pxs.x2,
}));
