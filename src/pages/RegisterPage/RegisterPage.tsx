import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRegisterMutation } from '@/redux/auth';
import Cookies from 'js-cookie';

import { CookiesKey, Roles } from '@/constants';
import { Container, Section } from '@/components/ContainerAndSection';
import {
  CallToActionWrapper,
  Form,
  Image,
  Subtitle,
  TabsWrapper,
  Title,
  TitleWrapper,
} from './styles';
import { t } from 'i18next';
import { Button, ButtonAppearance, Icon, IconName, Input, Loader } from '@/kit';
import { useTheme } from '@/hooks';
import { RegisterFormData } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormSchema } from '@/constants/validationSchemas/auth';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      first_name: ' ',
      second_name: ' ',
      club_name: ' ',
      phone: ' ',
    },
    mode: 'onChange',
  });

  const { theme } = useTheme();
  const nav = useNavigate();

  const [currentRole, setCurrentRole] = useState<string>(Roles.CUSTOMER);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    const registerData = {
      email: data.email,
      password: data.password,
      role: currentRole,
      ...(currentRole === Roles.COACH && {
        name: data.first_name.trim(),
        second_name: data.second_name.trim(),
      }),
      ...(currentRole === Roles.ADMIN_CLUB && {
        name: data.club_name.trim(),
        second_name: data.phone.trim(),
      }),
    };
    console.log('registerData -> ', registerData);
    try {
      const response: any = await registerUser(registerData).unwrap();

      if (response.data.token && response.data.refreshToken) {
        Cookies.set(CookiesKey.TOKEN, response.data.token, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set(CookiesKey.REFRESH_TOKEN, response.data.refreshToken, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
        localStorage.setItem('userEmail', response.data.email);
        console.log('Registered email:', response.data.email);
      }
      reset();
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };

  return (
    <Section>
      {/* ??? */}
      <Container maxWidth="375px">
        <Image
          srcSet="/public/assets/images/logo@1.png 1x, /public/assets/images/logo@2.png 2x"
          src="/public/assets/images/logo@1.png"
          alt="Logo"
        />
        <TitleWrapper>
          <Title>{t('register_page.title')}</Title>
          <Subtitle>{t('login_page.description')}</Subtitle>
        </TitleWrapper>
        <TabsWrapper>
          {Object.values(Roles).map(role => (
            <Button
              key={role}
              title={t(`login_page.tabs.${role}`)}
              testId={role}
              onClick={() => {
                setCurrentRole(role);
                role !== currentRole ? reset() : null;
              }}
              {...(currentRole !== role
                ? { style: { backgroundColor: theme.color.inputBar } }
                : {})}
            />
          ))}
        </TabsWrapper>
        {/* --- - --- */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {currentRole === Roles.ADMIN_CLUB ? (
            <>
              <Controller
                name="club_name"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      {...field}
                      label={t('register_page.club_name')}
                      testId="register_page.club_name"
                      errorMessage={fieldState.error?.message}
                      containerStyles={{ marginBottom: theme.pxs.x4 }}
                      autoFocus
                    />
                  );
                }}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      {...field}
                      label={t('register_page.phone')}
                      testId="register_page.phone"
                      errorMessage={fieldState.error?.message}
                      containerStyles={{ marginBottom: theme.pxs.x4 }}
                    />
                  );
                }}
              />
            </>
          ) : null}
          {/* --- /- --- */}
          {currentRole === Roles.COACH ? (
            <>
              <Controller
                name="first_name"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      {...field}
                      label={t('register_page.name')}
                      testId="register_page.name"
                      errorMessage={fieldState.error?.message}
                      containerStyles={{ marginBottom: theme.pxs.x4 }}
                      autoFocus
                    />
                  );
                }}
              />

              <Controller
                name="second_name"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      {...field}
                      label={t('register_page.second_name')}
                      testId="register_page.second_name"
                      errorMessage={fieldState.error?.message}
                      containerStyles={{ marginBottom: theme.pxs.x4 }}
                    />
                  );
                }}
              />
            </>
          ) : null}
          {/* --- /- --- */}

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  label={t('login_page.form.email')}
                  testId="register_page.email"
                  errorMessage={fieldState.error?.message}
                  // errorMessage={'fieldState.error?.message'}
                  containerStyles={{ marginBottom: theme.pxs.x4 }}
                  autoFocus
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  label={t('login_page.form.password')}
                  testId="register_page.password"
                  errorMessage={fieldState.error?.message}
                  containerStyles={{
                    marginBottom: theme.pxs.x4,
                    alignItems: 'center',
                  }}
                  type={isVisiblePassword ? 'text' : 'password'}
                  appendChild={
                    <div
                      onClick={toggleVisibilityPassword}
                      style={{ paddingRight: theme.pxs.x1, width: 'auto' }}
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

          <Controller
            name="confirm_password"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  label={t('register_page.confirm_password')}
                  testId="register_page.confirm_password"
                  errorMessage={fieldState.error?.message}
                  containerStyles={{
                    marginBottom: '32px',
                    alignItems: 'center',
                  }}
                  type={isVisiblePassword ? 'text' : 'password'}
                  appendChild={
                    <div
                      onClick={toggleVisibilityPassword}
                      style={{
                        paddingRight: theme.pxs.x1,
                        width: 'auto',
                      }}
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

          <Button
            testId="register_page.submit_button"
            title={t('register_page.submit_button')}
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
        <Button
          type="submit"
          testId="login_page.signup_google"
          title={t('login_page.signup_google')}
          appearance={ButtonAppearance.SECONDARY}
          style={{
            width: '100%',
            borderColor: theme.color.mainOrange,
            marginBottom: theme.pxs.x4,
          }}
          textStyle={{
            fontSize: theme.pxs.x3,
            lineHeight: '16px',
            fontWeight: '300',
            color: theme.color.white,
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
            marginBottom: theme.pxs.x8,
          }}
          textStyle={{
            fontSize: '12px',
            lineHeight: '16px',
            fontWeight: '300',
            color: theme.color.white,
          }}
          appendChild={
            <img
              style={{ width: 24, height: 24, marginLeft: theme.pxs.x2 }}
              src="/assets/images/icon_facebook.png"
            />
          }
        />
        <CallToActionWrapper>
          <Subtitle>{t('login_page.already_have')}</Subtitle>
          <Button
            testId="login_page.already_have"
            title={t('login_page.button_title')}
            appearance={ButtonAppearance.UNDERLINED}
            onClick={() => nav('/login')}
          />
        </CallToActionWrapper>
      </Container>
    </Section>
  );
};

export default RegisterPage;
