import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';

import { LogInFormSchema } from '@/constants/validationSchemas/auth';

import { Button, Input, Loader, ButtonAppearance } from '@/kit';
import { useTheme } from '@/hooks';
import { CookiesKey, Roles } from '@/constants';
import { useLoginMutation } from '@/redux/auth/authApi';
import EyeForPassword from '@/components/EyeForPassword/EyeForPassword';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setIsLogin } from '@/redux/auth/loginSlice';
import { WrongDataMessage } from './styles';
import AuthWrapper from '@/components/AuthWrapper/AuthWrapper';
import {
  CallToActionWrapper,
  Form,
  Subtitle,
} from '@/components/AuthWrapper/styles';

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
  const [currentRole, setCurrentRole] = useState<string>(Roles.CUSTOMER);
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

      // console.log(' - response: ', response);

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
        }
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRole', currentRole);
        reset();
        dispatch(setIsLogin(true));
        setIsIncorrectData(false);
        // console.log('Login Success:', response);
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

  const changeRole = (role: string) => {
    setCurrentRole(role);
    if (role !== currentRole) {
      reset();
      setIsVisiblePassword(false);
    }
  };

  return (
    <AuthWrapper
      action={'login'}
      currentRole={currentRole}
      changeRole={changeRole}
    >
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
          <WrongDataMessage>Невірно введено email або пароль</WrongDataMessage>
        ) : null}
        {/* --- / - --- */}
        <CallToActionWrapper style={{ marginBottom: theme.pxs.x8 }}>
          <Subtitle>{t('login_page.forgott_pass')}</Subtitle>
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
    </AuthWrapper>
  );
};

export default LogInPage;
