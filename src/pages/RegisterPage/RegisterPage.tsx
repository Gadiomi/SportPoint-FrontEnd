import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useRegisterMutation } from '@/redux/auth';
import Cookies from 'js-cookie';

import { CookiesKey, Roles } from '@/constants';
import { Container, Section } from '@/components/ContainerAndSection';
import {
  AddressWrapper,
  CallToActionWrapper,
  Form,
  Image,
  Line,
  PlaceWrapper,
  // SportsList,
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

import CitySelect from './components/CitySelect';
import AddressWidget from './components/AddressWidget/AddressWidget';
import SocialNetButton from './components/SocialNetButton/SocialNetButton';
// --- - ---
import { cityOptions, clubsList, sportTypes } from './tempData';
import SportsListChoice from './components/SportsList/SportsList';
// --- / - ---

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    register,
    watch,
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
      // abilities: [''],
      sport: [''],
    },
    mode: 'onChange',
  });

  const { theme } = useTheme();
  const nav = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const contentRef = useRef<HTMLDivElement>(null);
  const sportRef = useRef<HTMLDivElement>(null);

  const [currentRole, setCurrentRole] = useState<string>(Roles.CUSTOMER);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [height, setHeight] = useState<string>('0px');
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [isClubOpen, setIsClubOpen] = useState<boolean>(false);
  const [isOpenSports, setIsOpenSports] = useState<boolean>(false);

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

  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };

  const addressHandler = () => {
    setIsOpenAddress(prev => !prev);
  };
  const sportsHandler = () => {
    setIsOpenSports(prev => !prev);
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
        // abilities: data.abilities,
        // sport: data.sport,
      }),
      ...(currentRole === Roles.ADMIN_CLUB && {
        clubName: data.club_name.trim(),
        phone: data.phone.trim(),
        address: data.address,
      }),
    };
    console.log('registerData -> ', registerData);
    // try {
    //   const response: any = await registerUser(registerData).unwrap();
    //   console.log(' - response ->', response);
    //   if (response.token && response.refreshToken) {
    //     Cookies.set(CookiesKey.TOKEN, response.token, {
    //       expires: 7,
    //       secure: true,
    //       sameSite: 'Strict',
    //     });
    //     Cookies.set(CookiesKey.REFRESH_TOKEN, response.refreshToken, {
    //       expires: 7,
    //       secure: true,
    //       sameSite: 'Strict',
    //     });
    //     localStorage.setItem('userEmail', response.email);
    //     console.log('Registered email:', response.email);
    //   }
    //   reset();
    //   nav('/profile');
    // } catch (err) {
    //   console.error('Registration failed:', err);
    // }
  };

  const selectedSports = watch('sport') || [];
  console.log('selectedSports -> ', selectedSports);

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
                  label={t('register_page.confirm_password') + '*'}
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
                            // fill: 'transparent',
                          }}
                          name={IconName.EYE_CLOSE}
                        />
                      ) : (
                        <Icon
                          styles={{
                            color: 'currentColor',
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

          {currentRole !== Roles.CUSTOMER ? (
            <>
              <Line />

              <AddressWidget
                handler={addressHandler}
                isOpen={isOpenAddress}
                title={
                  currentRole === Roles.COACH ? 'Місце роботи' : 'Адреса клубу'
                }
                contentRef={contentRef}
                height={height}
              >
                {/* <PlaceWrapper>
            <GroupTitle
              handler={addressHandler}
              isOpen={isOpenAddress}
              title={'Адреса клубу'}
            />
            <AddressWrapper
              ref={contentRef}
              style={{
                height,
                paddingTop: isOpenAddress ? '10px' : '0px',
                overflow: 'hidden',
                transition: 'height 0.3s ease',
              }}
            > */}
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
                {/* </AddressWrapper>
          </PlaceWrapper> */}
              </AddressWidget>

              <AddressWidget
                handler={sportsHandler}
                isOpen={isOpenSports}
                title={currentRole === Roles.COACH ? 'Вид спорту' : 'Послуги'}
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
            onClick={() => nav('/login')}
          />
        </CallToActionWrapper>
      </Container>
    </Section>
  );
};

export default RegisterPage;
