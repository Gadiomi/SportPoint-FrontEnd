import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogInFormSchema } from '@/constants/validationSchemas/auth';

import { Button, Icon, IconName, Input, Loader, ButtonAppearance } from '@/kit';

import axios from 'axios';

import { Container, Section } from '@/components/ContainerAndSection';
import { useTheme } from '@/hooks';
import { Roles } from '@/constants';

type logInFormInputs = {
  email: string;
  password: string;
};

type TsignUpData = {
  email: string;
  password: string;
  role: string;
};

const LogInPage: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [currentRole, setCurrentRole] = React.useState(Roles.COSTUMER);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

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

  // --- * TEMP!!! for testing! ** ---
  const BASE_URL = 'https://sportpoint-backend.onrender.com/';

  const axiosPublic = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  const ENDPOINTS = { SIGN_UP: 'auth/signup' };

  const singUp = async (logInData: TsignUpData) => {
    try {
      const result = await axiosPublic.post(ENDPOINTS.SIGN_UP, logInData);
      return result.status;
    } catch (error) {
      return { message: error };
    }
  };

  const singInRequest = async (data: TsignUpData) => {
    const result = await singUp(data);
    console.log('result -> ', result);
    if (result === 201) {
      //   setIsAuth(true);
      reset();
      // setLoginError(false);
      // router.push('/home');
    } else {
      // setLoginError(true);
      console.log('SignUp Error!');
    }
  };
  // --- / *** ---

  const onSubmitForm: SubmitHandler<logInFormInputs> = data => {
    const signUpData = {
      email: data.email,
      password: data.password,
      role: 'customer',
    };
    singInRequest(signUpData);
    console.log('data -> ', data);
    console.log('signUpData -> ', signUpData);
    // reset(); // ! Temp;
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
                  label={t('login_page.form.email')}
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
                  label={t('login_page.form.password')}
                  testId="login_page.form.password"
                  errorMessage={fieldState.error?.message}
                  containerStyles={{
                    marginBottom: theme.pxs.x9,
                    alignItems: 'center',
                  }}
                  type={isVisiblePassword ? 'text' : 'password'}
                  appendChild={
                    <div
                      onClick={toggleVisibilityPassword}
                      style={{ paddingRight: theme.pxs.x1 }}
                    >
                      {isVisiblePassword ? (
                        <Icon
                          styles={{
                            color: 'currentColor',
                            fill: 'transparent',
                          }}
                          name={IconName.EYE_CLOSE}
                        />
                      ) : (
                        <Icon
                          styles={{
                            color: 'currentColor',
                            fill: 'transparent',
                          }}
                          name={IconName.EYE_OPEN}
                        />
                      )}
                    </div>
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
            disabled={!isValid}
            appendChild={
              isSubmitting && (
                <Loader size={'16px'} stroke={'#f0f0f0'} strokeWidth={'1'} />
              )
            }
          />
        </Form>
        <Button
          testId="login_page.signup_google"
          title={t('login_page.signup_google')}
          appearance={ButtonAppearance.SECONDARY}
          style={{
            width: '100%',
            borderColor: theme.color.mainOrange,
            marginBottom: theme.pxs.x2,
          }}
          appendChild={
            <img
              style={{ width: 24, height: 24, marginLeft: theme.pxs.x2 }}
              src="/assets/images/icon_google.png"
            />
          }
        />
        <Button
          testId="login_page.signup_facebook"
          title={t('login_page.signup_facebook')}
          appearance={ButtonAppearance.SECONDARY}
          style={{
            width: '100%',
            borderColor: theme.color.mainOrange,
            marginBottom: theme.pxs.x6,
          }}
          appendChild={
            <img
              style={{ width: 24, height: 24, marginLeft: theme.pxs.x2 }}
              src="/assets/images/icon_facebook.png"
            />
          }
        />
        <CallToActionWrapper>
          <Text>{t('login_page.already_have')}</Text>
          <Button
            testId="login_page.already_have"
            title={t('login_page.button_title')}
            appearance={ButtonAppearance.UNDERLINED}
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
