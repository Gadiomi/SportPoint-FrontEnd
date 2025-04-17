import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';

import { LogInFormSchema } from '@/constants/validationSchemas/auth';

import { Button, Icon, IconName, Input, Loader, ButtonAppearance } from '@/kit';
import { Container, Section } from '@/components/ContainerAndSection';
import { useTheme } from '@/hooks';
import { CookiesKey, Roles } from '@/constants';
import { useLoginMutation } from '@/redux/auth/authApi';
import { useNavigate } from 'react-router-dom';
import SocialNetButton from '../RegisterPage/components/SocialNetButton/SocialNetButton';
import EyeForPassword from '@/components/EyeForPassword/EyeForPassword';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setIsLogin } from '@/redux/auth/loginSlice';

type logInFormInputs = {
  email: string;
  password: string;
};

const LogInPage: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(state => state.setLogin);
  // -- - --
  console.log(' - * - isLogin: ', isLogin); // Example!
  // -- / - --
  const [currentRole, setCurrentRole] = React.useState(Roles.CUSTOMER);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const nav = useNavigate();
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
      localStorage.setItem('userEmail', data.email);

      if (response.token && response.refreshToken) {
        Cookies.set(CookiesKey.TOKEN, response.token, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set(CookiesKey.REFRESH_TOKEN, response.refreshToken, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
      }

      reset();
      dispatch(setIsLogin(true));
      nav('/profile');
      console.log('Login Success:', response);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };

  return (
    <Section>
      <Container maxWidth="320px">
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
              onClick={() => {
                setCurrentRole(role);
              }}
              {...(currentRole !== role
                ? { style: { backgroundColor: theme.color.inputBar } }
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
                  containerStyles={{ marginBottom: theme.pxs.x2 }}
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
                    marginBottom: theme.pxs.x9,
                    alignItems: 'center',
                  }}
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
          <CallToActionWrapper style={{ marginBottom: theme.pxs.x12 }}>
            <Text>{t('login_page.forgott_pass')}</Text>
            <Button
              testId="login_page.forgott_button"
              title={t('login_page.forgott_button')}
              appearance={ButtonAppearance.UNDERLINED}
            />
          </CallToActionWrapper>
          <Button
            testId="login_page.form.submit_button"
            title={t('login_page.form.submit_button')}
            type="submit"
            style={{ width: '100%' }}
            disabled={!isValid || isLoading}
            appendChild={
              isSubmitting || isLoading ? (
                <Loader size={'16px'} stroke={'#f0f0f0'} strokeWidth={'1'} />
              ) : null
            }
          />
        </Form>
        <SocialNetButton name={'google'} act={'login'} />
        <SocialNetButton name={'facebook'} act={'login'} />
        <CallToActionWrapper>
          <Text>{t('login_page.have_not_yet')}</Text>
          <Button
            testId="login_page.have_not_yet"
            title={t('login_page.button_title_reg')}
            appearance={ButtonAppearance.UNDERLINED}
            onClick={() => nav('/register')}
          />
        </CallToActionWrapper>
      </Container>
    </Section>
  );
};

export default LogInPage;

const Image = styled.img(({ theme }) => ({
  margin: 'auto',
  marginBottom: theme.pxs.x5,
  marginTop: theme.pxs.x2,
}));

const TextWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x2,
  marginBottom: theme.pxs.x3,
}));

const Title = styled.h2(({ theme }) => ({
  ...theme.fonts.secondTitle,
  color: theme.color.mainWhite,
}));

const Text = styled.p(({ theme }) => ({
  ...theme.fonts.lightManrope,

  color: theme.color.secWhite,
}));

const TabsWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: theme.pxs.x1_5,
  marginBottom: theme.pxs.x4,
}));

const CallToActionWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Form = styled.form(({ theme }) => ({
  marginBottom: theme.pxs.x6,
  width: '100%',
}));
