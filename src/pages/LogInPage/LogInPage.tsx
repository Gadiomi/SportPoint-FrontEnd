import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';

import { LogInFormSchema } from '@/constants/validationSchemas/auth';

import { Button, Input, Loader, ButtonAppearance } from '@/kit';
import { Container, Section } from '@/components/ContainerAndSection';
import { useTheme } from '@/hooks';
import { CookiesKey, Roles } from '@/constants';
import { useLoginMutation } from '@/redux/auth/authApi';
import SocialNetButton from '../../components/AuthWrapper/SocialNetButton/SocialNetButton';
import EyeForPassword from '@/components/EyeForPassword/EyeForPassword';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setIsLogin } from '@/redux/auth/loginSlice';
import { WrongDataMessage } from './styles';

type logInFormInputs = {
  email: string;
  password: string;
};

const LogInPage: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  // -- - --
  const { isLogin } = useAppSelector(state => state.setLogin);
  console.log(' - * - isLogin: ', isLogin); // Example!
  // -- / - --
  const [currentRole, setCurrentRole] = React.useState(Roles.CUSTOMER);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isIncorrectData, setIsIncorrectData] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
    control,
  } = useForm<logInFormInputs>({
    resolver: yupResolver(LogInFormSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });
  const [login, { isLoading }] = useLoginMutation();

  const onSubmitForm: SubmitHandler<logInFormInputs> = async data => {
    try {
      const response: any = await login({
        email: data.email,
        password: data.password,
      });

      console.log(' - response: ', response);

      if (!response.error && response?.data?.status === 200) {
        if (response.data.token && response.data.refreshToken) {
          // console.log(' - response.data: ', response.data);
          Cookies.set(CookiesKey.TOKEN_F, response.data.token, {
            expires: 7,
            secure: false,
            sameSite: 'Lax',
            path: '/',
          });
          Cookies.set(CookiesKey.REFRESH_TOKEN_F, response.data.refreshToken, {
            expires: 7,
            secure: false,
            sameSite: 'Lax',
            path: '/',
          });
          // Cookies.set(CookiesKey.TOKEN, response.token, {
          //   expires: 7,
          //   secure: true,
          //   // sameSite: 'Strict',
          //   sameSite: 'Lax',
          //   path: '/',
          //   domain: 'http://localhost:5173/', // ???
          // });
          // Cookies.set(CookiesKey.REFRESH_TOKEN, response.refreshToken, {
          //   expires: 7,
          //   secure: true,
          //   // sameSite: 'Strict',
          //   sameSite: 'Lax',
          //   path: '/',
          //   domain: 'http://localhost:5173/', //  ???
          // });
        }
        localStorage.setItem('userEmail', data.email);
        reset();
        dispatch(setIsLogin(true));
        setIsIncorrectData(false);
        console.log('Login Success:', response);
        navigate('/');
      } else {
        setIsIncorrectData(true);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };

  return (
    <Section>
      {/* <Container styles={{ maxWidth: '375px' }}> */}
      <Container maxWidth={'375px'}>
        <Image
          srcSet="/public/assets/images/logo@1.png 1x, /public/assets/images/logo@2.png 2x"
          src="/public/assets/images/logo@1.png"
          alt="Logo"
        />
        <TextWrapper>
          <Title>{t('login_page.title')}</Title>
          <Text>{t('login_page.description')}</Text>
        </TextWrapper>
        <TabsWrapper>
          {Object.values(Roles).map(role => (
            <Button
              key={role}
              title={t(`login_page.tabs.${role}`)}
              testId={role}
              styles={{ borderRadius: '4px', fontWeight: 500 }}
              onClick={() => {
                setCurrentRole(role);
              }}
              {...(currentRole !== role
                ? {
                    style: {
                      backgroundColor: theme.color.inputBar,
                      color: '#B7B7B9',
                    },
                  }
                : {})}
            />
          ))}
        </TabsWrapper>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <Controller
            name={'email'}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  label={t('login_page.form.email') + '*'}
                  testId="login_page.form.email"
                  errorMessage={fieldState.error?.message}
                  containerStyles={{ marginBottom: theme.pxs.x4 }}
                  inputStyles={{ fontSize: '14px', fontWeight: 400 }}
                  autoFocus
                />
              );
            }}
          />
          <Controller
            name={'password'}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  label={t('login_page.form.password') + '*'}
                  testId="login_page.form.password"
                  errorMessage={fieldState.error?.message}
                  containerStyles={{
                    marginBottom: theme.pxs.x8,
                    alignItems: 'center',
                  }}
                  inputStyles={{ fontSize: '14px', fontWeight: 400 }}
                  type={isVisiblePassword ? 'text' : 'password'}
                  appendChild={
                    <EyeForPassword
                      isVisiblePassword={isVisiblePassword}
                      toggleVisibilityPassword={toggleVisibilityPassword}
                    />
                  }
                />
              );
            }}
          />
          {/* --- - --- */}
          {isIncorrectData ? (
            <WrongDataMessage>
              Невірно введено email або пароль
            </WrongDataMessage>
          ) : null}
          {/* --- / - --- */}
          <CallToActionWrapper style={{ marginBottom: theme.pxs.x8 }}>
            <Text>{t('login_page.forgott_pass')}</Text>
            <Button
              testId="login_page.forgott_button"
              title={t('login_page.forgott_button')}
              appearance={ButtonAppearance.UNDERLINED}
              style={{ fontWeight: 500 }}
            />
          </CallToActionWrapper>
          <Button
            testId="login_page.form.submit_button"
            title={t('login_page.form.submit_button')}
            type="submit"
            style={{ width: '100%', height: '32px' }}
            disabled={!isValid || isLoading}
            appendChild={
              isSubmitting || isLoading ? (
                <Loader
                  size={'16px'}
                  stroke={'#f0f0f0'}
                  strokeWidth={'1'}
                  style={{ marginLeft: '4px' }}
                />
              ) : null
            }
          />
        </Form>
        <SocialNetButtonWrapper>
          <SocialNetButton name={'google'} act={'login'} />
          <SocialNetButton name={'facebook'} act={'login'} />
        </SocialNetButtonWrapper>
        <CallToActionWrapper>
          <Text>{t('login_page.have_not_yet')}</Text>
          <Button
            testId="login_page.have_not_yet"
            title={t('login_page.button_title_reg')}
            appearance={ButtonAppearance.UNDERLINED}
            style={{ fontWeight: 500 }}
            onClick={() => navigate('/register')}
          />
        </CallToActionWrapper>
      </Container>
    </Section>
  );
};

export default LogInPage;

const Image = styled.img(({ theme }) => ({
  margin: 'auto',
  // marginBottom: theme.pxs.x5,
  marginBottom: '72px',
  marginTop: theme.pxs.x2,
}));

const TextWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x2,
  // marginBottom: theme.pxs.x3,
  marginBottom: theme.pxs.x8,
}));

const Title = styled.h2(({ theme }) => ({
  ...theme.fonts.secondTitle,
  color: theme.color.mainWhite,
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: '22px',
}));

const Text = styled.p(({ theme }) => ({
  ...theme.fonts.lightManrope,
  fontWeight: 400,
  // color: theme.color.secWhite,
  color: '#B7B7B9',
}));

const TabsWrapper = styled.div(({ theme }) => ({
  // display: 'grid',
  // gridTemplateColumns: '1fr 1fr 1fr',
  // gap: theme.pxs.x1_5,
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  // marginBottom: theme.pxs.x4,
  height: '32px',
  marginBottom: theme.pxs.x8,
  backgroundColor: '#303030',
  borderRadius: '4px',
}));

const CallToActionWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Form = styled.form(({ theme }) => ({
  // marginBottom: theme.pxs.x6,
  marginBottom: '64px',
  width: '100%',
}));

const SocialNetButtonWrapper = styled.div({
  marginBottom: '48px',
});
