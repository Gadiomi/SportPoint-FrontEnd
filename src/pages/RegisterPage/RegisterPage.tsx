import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useRegisterMutation } from '@/redux/auth';
import Cookies from 'js-cookie';
import { t } from 'i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { CookiesKey, Roles } from '@/constants';
import { Container, Section } from '@/components/ContainerAndSection';
import EyeForPassword from '@/components/EyeForPassword/EyeForPassword';
import CitySelect from './components/CitySelect';
import AddressWidget from './components/AddressWidget/AddressWidget';
import SocialNetButton from './components/SocialNetButton/SocialNetButton';
import SportsListChoice from './components/SportsList/SportsList';
import LocalModal from './components/LocalModal/LocalModal';
import { Button, ButtonAppearance, Input, Loader } from '@/kit';
import { useTheme } from '@/hooks';
import { RegisterFormData } from '@/types';
import { RegisterFormSchema } from '@/constants/validationSchemas/auth';
import { useClubsInfo } from './getData';
import { OptionType } from './components/types';
import {
  // AddressWrapper,
  // PlaceWrapper,
  CallToActionWrapper,
  Form,
  Image,
  Line,
  SimpleInput,
  // SportsList,
  Subtitle,
  TabsWrapper,
  Title,
  TitleWrapper,
} from './styles';

// --- - ---
import { cityOptions } from './tempData';
// import { useDeleteAccountMutation } from '@/redux/auth/authApi';
// --- / - ---

const initClubsList = [{ value: 'No club yet', label: 'No club yet' }];

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    register,
    watch,
    setValue,
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
      city: '',
      address: '',
      sport: [' '],
      // abilities: [''],
    },
    mode: 'onChange',
  });

  const { theme } = useTheme();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  // const [deleteAccount, { isLoading: isLoadingDel, isSuccess, isError }] =
  //   useDeleteAccountMutation();

  const contentRef = useRef<HTMLDivElement>(null);
  const sportRef = useRef<HTMLDivElement>(null);

  const [currentRole, setCurrentRole] = useState<string>(Roles.CUSTOMER);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [height, setHeight] = useState<string>('0px');
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [isClubOpen, setIsClubOpen] = useState<boolean>(false);
  const [isOpenSports, setIsOpenSports] = useState<boolean>(false);
  const [clubsList, setClubsList] = useState<OptionType[]>(initClubsList);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(`${scrollHeight}px`);
    }
  }, []);

  useEffect(() => {
    if (isOpenAddress) {
      !isCityOpen && !isClubOpen ? setHeight('110px') : updateHeight();
    } else {
      setHeight('0px');
    }
  }, [isOpenAddress, isCityOpen, isClubOpen]);
  // }, [isOpenAddress, isCityOpen, isClubOpen, updateHeight]);

  const clubsDescription = useClubsInfo();
  const selectedCity = watch('city') || '';
  const selectedAddress = watch('address') || '';
  const selectedSports = watch('sport') || [];

  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };

  const addressHandler = () => {
    setIsOpenAddress(prev => !prev);
  };
  const sportsHandler = () => {
    setIsOpenSports(prev => !prev);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: RegisterFormData) => {
    console.log(' - data -> ', data);
    const registerData = {
      email: data.email,
      password: data.password,
      role: currentRole,
      ...(currentRole === Roles.COACH && {
        firstName: data.first_name.trim(),
        lastName: data.second_name.trim(),
        city: data.city,
        address: data.address,
        sport: JSON.stringify(data.sport),
        // sport: data.sport?.join(),
      }),
      ...(currentRole === Roles.ADMIN_CLUB && {
        // clubName: data.club_name.trim(),
        firstName: data.club_name.trim(),
        phone: data.phone.trim(),
        city: data.city,
        address: data.address,
        abilities: JSON.stringify(data.sport),
      }),
    };
    console.log('registerData -> ', registerData);
    try {
      const response: any = await registerUser(registerData).unwrap();
      console.log(' - response ->', response);
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
        localStorage.setItem('userEmail', response.email);
      }
      reset();
      setIsModalOpen(true);
      // navigate('/profile');
      // navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const changeRole = (role: string) => {
    setCurrentRole(role);
    if (role !== currentRole) {
      reset();
      setIsOpenAddress(false);
      setIsOpenSports(false);
    }
  };

  useEffect(() => {
    if (selectedCity && currentRole === Roles.COACH) {
      const selectedCityClubList = clubsDescription
        ?.filter(item => item.city === selectedCity)
        .map(club => ({
          value: `${club.clubName}, ${club.address}`,
          label: `${club.clubName}, ${club.address}`,
        }));
      console.log(' - selectedCityClubList -> ', selectedCityClubList);
      setClubsList(
        selectedCityClubList.length > 0 ? selectedCityClubList : initClubsList,
      );
    }
    setValue('address', '');
  }, [selectedCity, currentRole]);
  // --- / - ---

  const sportsTitle = () => {
    return !isOpenSports && selectedSports[0] !== ' '
      ? selectedSports.join(' | ').toString()
      : currentRole === Roles.COACH
        ? 'Вид спорту'
        : 'Послуги';
  };

  const addressTitle = () => {
    return !isOpenAddress && selectedCity
      ? `${selectedCity}, ${selectedAddress ? selectedAddress : 'без адреси'}`
      : currentRole === Roles.COACH
        ? 'Місце роботи'
        : 'Адреса клубу';
  };
  // ---------
  // const deleteHandler = async () => {
  //   console.log('delete account');
  //   try {
  //     const response: any = await deleteAccount('').unwrap();
  //     console.log(' - response ->', response);
  //     //  if (response.token && response.refreshToken) {
  //     Cookies.remove(CookiesKey.TOKEN, { path: '' });
  //     Cookies.remove(CookiesKey.REFRESH_TOKEN, { path: '' });
  //     localStorage.clear();
  //     //  }
  //     //  setIsModalOpen(true);
  //     // navigate('/profile');
  //     // navigate('/');
  //   } catch (err) {
  //     console.error('Не вдалося видалити акаунт: ', err);
  //   }
  // };

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
                changeRole(role);
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
                      label={t('register_page.club_name') + '*'}
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
                      label={t('register_page.phone') + '*'}
                      testId="register_page.phone"
                      errorMessage={fieldState.error?.message}
                      containerStyles={{ marginBottom: theme.pxs.x4 }}
                    />
                  );
                }}
              />
            </>
          ) : null}
          {/* --- - --- */}
          {currentRole === Roles.COACH ? (
            <>
              <Controller
                name="first_name"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      {...field}
                      label={t('register_page.name') + '*'}
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
                      label={t('register_page.second_name') + '*'}
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
                  label={t('login_page.form.email') + '*'}
                  testId="register_page.email"
                  errorMessage={fieldState.error?.message}
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
                  label={t('login_page.form.password') + '*'}
                  testId="register_page.password"
                  errorMessage={fieldState.error?.message}
                  containerStyles={{
                    marginBottom: theme.pxs.x4,
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

          <Controller
            name="confirm_password"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  label={t('register_page.confirm_password') + '*'}
                  testId="register_page.confirm_password"
                  errorMessage={fieldState.error?.message}
                  containerStyles={{
                    marginBottom: '32px',
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

          {currentRole !== Roles.CUSTOMER ? (
            <>
              <Line />

              <AddressWidget
                handler={addressHandler}
                isOpen={isOpenAddress}
                title={addressTitle()}
                contentRef={contentRef}
                height={height}
              >
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <CitySelect
                        field={field}
                        options={cityOptions}
                        placeholder={'Оберіть місто'}
                        onMenuOpen={() => setIsCityOpen(true)}
                        onMenuClose={() => setIsCityOpen(false)}
                      />
                    );
                  }}
                />
                {currentRole === Roles.COACH ? (
                  <Controller
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <CitySelect
                          field={field}
                          options={clubsList}
                          placeholder={'Оберіть клуб'}
                          onMenuOpen={() => setIsClubOpen(true)}
                          onMenuClose={() => setIsClubOpen(false)}
                        />
                      );
                    }}
                  />
                ) : (
                  <SimpleInput
                    type="text"
                    placeholder="Ввести назву та адресу клубу"
                    {...register('address')}
                  />
                )}
              </AddressWidget>

              <AddressWidget
                handler={sportsHandler}
                isOpen={isOpenSports}
                title={sportsTitle()}
                contentRef={sportRef}
                height={'auto'}
              >
                <SportsListChoice
                  isOpenSports={isOpenSports}
                  selectedSports={selectedSports}
                  register={register}
                />
              </AddressWidget>
            </>
          ) : null}

          <Button
            testId="register_page.submit_button"
            title={t('register_page.submit_button')}
            type="submit"
            style={{ width: '100%' }}
            disabled={!isValid || isLoading}
            appendChild={
              isSubmitting || isLoading ? (
                <Loader
                  size={'16px'}
                  stroke={'#0f0f0f'}
                  strokeWidth={'1'}
                  style={{ marginLeft: '4px' }}
                />
              ) : null
            }
          />
        </Form>
        <SocialNetButton name={'google'} act={'signup'} />
        <SocialNetButton name={'facebook'} act={'signup'} />
        <CallToActionWrapper>
          <Subtitle>{t('login_page.already_have')}</Subtitle>
          <Button
            testId="login_page.already_have"
            title={t('login_page.button_title')}
            appearance={ButtonAppearance.UNDERLINED}
            onClick={() => navigate('/login')}
          />
        </CallToActionWrapper>

        <LocalModal isModalOpen={isModalOpen} handleClose={handleCloseModal} />
        {/* --- -- --- */}
        {/* <button
          style={{
            margin: '16px auto',
            padding: '8px 12px',
            border: '1px solid red',
            color: 'red',
          }}
          onClick={() => deleteHandler()}
        >
          delete account
        </button> */}
        {/* --- - / - --- */}
      </Container>
    </Section>
  );
};

export default RegisterPage;
