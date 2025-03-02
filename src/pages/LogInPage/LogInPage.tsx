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

type logInFormInputs = {
  email: string;
  password: string;
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
    defaultValues: { email: '', password: '' },
  });

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const onSubmitForm: SubmitHandler<logInFormInputs> = data => {
    // singInRequest(data);
    reset(); // ! Temp
  };

  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };

  return (
    <div className="">
      <PageTitle>LogIn page</PageTitle>
      <LogInForm onSubmit={handleSubmit(onSubmitForm)}>
        <label>
          Email
          <input
            className=""
            placeholder="example@yahoo.com"
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
              placeholder="Введіть пароль"
              {...register('password', { required: true })}
              autoComplete="current-password"
            />
            <div onClick={toggleVisibilityPassword}>
              {isVisiblePassword ? 'O' : 'I'}
            </div>
          </PasswordBlock>
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        </label>
        <SubmitButton type="submit">{t('login')}</SubmitButton>
      </LogInForm>
    </div>
  );
};

export default LogInPage;
