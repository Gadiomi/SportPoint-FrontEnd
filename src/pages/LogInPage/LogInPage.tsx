import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogInFormSchema } from '@/constants/validationSchemas/auth';
import { useTranslation } from 'react-i18next';
import {
  ErrorMessage,
  LogInForm,
  PageTitle,
  PasswordBlock,
  SubmitButton,
} from './styles';
import { Button, Icon, IconName } from '@/kit';

import axios from 'axios';
import Loader from './Loader';
// import { ToolTip } from '@/kit/tooltip';

type logInFormInputs = {
  email: string;
  password: string;
  confirm_password: string;
};

type TsignUpData = {
  email: string;
  password: string;
  role: string;
};

const LogInPage: FC = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<logInFormInputs>({
    resolver: yupResolver(LogInFormSchema),
    defaultValues: { email: '', password: '', confirm_password: '' },
  });

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  // --- *** ---
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
      // router.push('/prices');
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
    <div className="">
      <PageTitle>Створити акаунт</PageTitle>
      <LogInForm onSubmit={handleSubmit(onSubmitForm)}>
        <label>
          Email
          <input
            className=""
            placeholder="Email"
            autoFocus
            {...register('email', { required: true })}
            autoComplete="example@i.ua"
          />
          <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        </label>
        <label>
          Пароль
          <PasswordBlock>
            <input
              className=""
              type={isVisiblePassword ? 'text' : 'password'}
              placeholder="Пароль"
              {...register('password', { required: true })}
              autoComplete="current-password"
            />
            <div onClick={toggleVisibilityPassword}>
              <Icon
                name={
                  isVisiblePassword ? IconName.EYE_OPEN : IconName.EYE_CLOSE
                }
                color={'rgba(18,20,23,0.1)'}
              />
            </div>
          </PasswordBlock>
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        </label>
        <label>
          Підтвердити пароль
          <PasswordBlock>
            <input
              className=""
              type={isVisiblePassword ? 'text' : 'password'}
              placeholder="Підтвердити пароль"
              {...register('confirm_password', { required: true })}
              autoComplete="confirm-password"
            />
            <div onClick={toggleVisibilityPassword}>
              {/* {isVisiblePassword ? 'O' : 'I'} */}
              <Icon
                name={
                  isVisiblePassword ? IconName.EYE_OPEN : IconName.EYE_CLOSE
                }
                color={'rgba(18,20,23,0.1)'}
              />
            </div>
          </PasswordBlock>
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        </label>

        {/* <SubmitButton type="submit">{t('signup')}</SubmitButton> */}
        <Button
          title={t('signup')}
          type={'submit'}
          testId={'b_signup'}
          appendChild={
            <Loader size={'16px'} stroke={'#f0f0f0'} strokeWidth={'1'} />
          }
          textStyle={{ ['marginRight']: '8px' }}
        />
      </LogInForm>
      {/* <ToolTip /> */}
    </div>
  );
};

export default LogInPage;
