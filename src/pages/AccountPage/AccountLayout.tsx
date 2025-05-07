import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { CookiesKey } from '@/constants';
import { useAppSelector } from '@/hooks/hooks';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { FontFamily } from '@/kit';
import ProfileProvider from '@/utils/ProfileProvider';

const AccountLayout = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const { isLogin } = useAppSelector(state => state.setLogin);
  // --- - ---
  useEffect(() => {
    const tokenFront = Cookies.get(CookiesKey.TOKEN_F);
    const refreshTokenFront = Cookies.get(CookiesKey.REFRESH_TOKEN_F);
    // console.log(' - tokenFront: ', tokenFront);
    // console.log(' -- refreshTokenFront: ', refreshTokenFront);
    if (!tokenFront || !refreshTokenFront || !isLogin) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin]);

  // --- / - ---
  return (
    <ProfileProvider methods={methods}>
      <Section styles={{ fontFamily: `${FontFamily}`, minHeight: '100vh' }}>
        <Container>
          <Logo />
          <Outlet />
        </Container>
      </Section>
    </ProfileProvider>
  );
};

export default AccountLayout;
