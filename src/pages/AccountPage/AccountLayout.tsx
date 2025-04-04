import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Section } from '@/components/ContainerAndSection';
import { useTheme } from '@/hooks';
import { Logo } from '@/components/Logo/Logo';
import { FontFamily } from '@/kit';

const AccountLayout = () => {
  const { theme } = useTheme();

  return (
    <Section styles={{ fontFamily: `${FontFamily}`, minHeight: '100vh' }}>
      <Container maxWidth="320px">
        <Logo />
        <Outlet />
      </Container>
    </Section>
  );
};

export default AccountLayout;

// const StyledImage = styled.img(({ theme }) => ({
//   margin: 'auto',
//   marginBottom: theme.pxs.x5,
//   marginTop: theme.pxs.x2,
// }));
