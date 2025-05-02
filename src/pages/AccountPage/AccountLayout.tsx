import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { FontFamily } from '@/kit';
import ProfileProvider from '@/utils/ProfileProvider';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/hooks/hooks';

const AccountLayout = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const { isLogin } = useAppSelector(state => state.setLogin);
  !isLogin && navigate('/login');

  return (
    <ProfileProvider methods={methods}>
      <Section styles={{ fontFamily: `${FontFamily}`, minHeight: '100vh' }}>
        <Container maxWidth="320px">
          <Logo />
          <Outlet />
        </Container>
      </Section>
    </ProfileProvider>
  );
};

export default AccountLayout;
