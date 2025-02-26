import { FC } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogInFormSchema } from 'constants/validationSchemas/auth';
// import css from './LogInPage.module.css';
import { LogInForm, PageTitle, SubmitButton } from './styles';

type logInFormInputs = {
  email: string;
  password: string;
};

const LogInPage: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<logInFormInputs>({
    resolver: yupResolver(LogInFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmitForm: SubmitHandler<logInFormInputs> = data => {
    // singInRequest(data);
    console.log('data -> ', data);
    reset(); // ! Temp
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
        </label>
        <label>
          Пароль
          <input
            className=""
            type="password"
            // type={isVisiblePassword ? 'text' : 'password'}
            placeholder="Введіть пароль"
            {...register('password', { required: true })}
            autoComplete="current-password"
          />
        </label>
        <SubmitButton type="submit">Увійти</SubmitButton>
      </LogInForm>
    </div>
  );
};

export default LogInPage;
