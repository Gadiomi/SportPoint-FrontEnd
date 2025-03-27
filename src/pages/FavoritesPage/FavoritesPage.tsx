import { useState } from 'react';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import {
  Button,
  ButtonAppearance,
  FontFamily,
  FontWeights,
  Icon,
  IconName,
  LineHeights,
} from '@/kit';
import { t } from 'i18next';
import { FavoritesPageWrapper, ListWrapper, ToggleWrapper } from './styles';
import CoachCard from '../../components/CoachCard/CoachCard';
import ClubCard from './ClubCard/ClubCard';
import { IClubData, ICoachData } from '../../types';
// --- TEMP 2 ---
import axios from 'axios';
// --- TEMP 2 ---

// --- TEMP!!! ---
const coachsData: ICoachData[] = [
  {
    userId: '65f2dc3b8a7e8e3e3b5a3a1b',
    firstLastName: 'Андрій К.',
    avatar: '../../../../public/assets/images/tempCoach.jpg',
    countReview: 26,
    rating: 4.9,
    description: {
      abilities: 'Йога, Фітнес',
      price: [
        {
          name: '60-хв заняття',
          amount: '550',
        },
      ],
    },
  },
];

const clubsData: IClubData[] = [
  {
    name: 'Sport Life',
    description: 'Спортивний клуб',
    distance: '1.5 км',
    workTime: '24/7 #0',
  },
  {
    name: 'Sport Life light',
    description: 'Спортивний клубик',
    distance: '5 км',
    workTime: '20/5 #1',
  },
  {
    name: 'Sport Life hard',
    description: 'Спортивний клубище',
    distance: '3 км',
    workTime: '24/ #2',
  },
];
// --- /TEMP!!! ---

const itemsPerPage = 2;

const FavoritesPage = () => {
  // --- * TEMP!!! for testing! ** ---
  interface TsignInData {
    email: string;
    password: string;
  }
  interface TsignUpData extends TsignInData {
    role: string;
  }

  const signUpData = {
    // email: 'serzh108@ukr.net',
    email: 'ser2015@i.ua',
    password: 'MyPass1004',
    role: 'customer',
  };

  const signInData = {
    // email: 'serzh108@ukr.net',
    email: 'ser2015@i.ua',
    password: 'MyPass1004',
  };

  const BASE_URL = 'https://sportpoint-backend.onrender.com/';

  const axiosPublic = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    // withCredentials: false,
    withCredentials: true,
  });

  const ENDPOINTS = {
    SIGN_UP: 'auth/signup',
    LOGIN: 'auth/signin',
    USER_PROFILE: '/profile',
  };

  const singUp = async (singUp: TsignUpData) => {
    console.log(' --- in singUp ');
    try {
      const result = await axiosPublic.post(ENDPOINTS.SIGN_UP, singUp);
      return result.status;
    } catch (error) {
      return { message: error };
    }
  };

  const singIn = async (logInData: TsignInData) => {
    console.log(' --- in singIn ');
    try {
      const result = await axiosPublic.post(ENDPOINTS.LOGIN, logInData);
      return result;
      //  return result.status;
    } catch (error) {
      return { message: error };
    }
  };

  const userProfile = async () => {
    console.log(' --- in userProfile ');
    try {
      const result = await axiosPublic.get(ENDPOINTS.USER_PROFILE);
      return result;
      //  return result.status;
    } catch (error) {
      return { message: error };
    }
  };

  const singUpRequest = async (data: TsignUpData) => {
    console.log('data in singUpRequest -> ', data);
    const result = await singUp(data);
    console.log('result -> ', result);
    if (result === 200) {
      //   setIsAuth(true);
      // reset();
      // setLoginError(false);
      // router.push('/home');
    } else {
      // setLoginError(true);
      console.log('SignUp Error!');
    }
  };
  // --- Temp!!! ---
  const singInRequest = async (data: TsignInData) => {
    console.log('data in singInRequest -> ', data);
    const result = await singIn(data);
    console.log('result -> ', result);
    if (result) {
      // if (result === 200) {
      //   setIsAuth(true);
      // reset();
      // setLoginError(false);
      // router.push('/home');
    } else {
      // setLoginError(true);
      console.log('SignIn Error!');
    }
  };

  const getUserProfile = async () => {
    console.log('data in singInRequest -> ');
    const result = await userProfile();
    console.log(' -- user result -> ', result);
    if (result) {
    } else {
      console.log(' getUserProfile Error!');
    }
  };

  const tempClickHandler = () => {
    singInRequest(signInData);
  };

  const userProfileHandler = () => {
    getUserProfile();
  };
  // --- /Temp!!! ---
  // --- / *** ---
  const [isActive, setIsActive] = useState<boolean>(true);
  const [coachPageNumber, setCoachPageNumber] = useState<number>(0);
  const [clubPageNumber, setClubPageNumber] = useState<number>(0);

  const isActiveHandler = () => setIsActive(!isActive);

  const showMore = () => {
    isActive
      ? setCoachPageNumber(prev => prev + 1)
      : setClubPageNumber(prev => prev + 1);
    // ---
    // singUpRequest(signUpData); // Temp for test!!!
  };

  // console.log(
  //   ' - coachPageNumber: ',
  //   coachPageNumber,
  //   ' -- clubPageNumber: ',
  //   clubPageNumber,
  // );

  return (
    <Section>
      <Container maxWidth="320px">
        <FavoritesPageWrapper>
          <Logo />
          <Button
            // testId="login_page.form.submit_button"
            // title={t('login_page.form.submit_button')}
            testId="ОБРАНІ"
            title={t('chosen')}
            type="submit"
            style={{
              justifyContent: 'flex-start',
              width: '296px',
              position: 'relative',
              height: '40px',
              paddingLeft: '40px',
              fontFamily: `${FontFamily}`,
              fontWeight: `${FontWeights.BOLD}`,
              lineHeight: ` ${LineHeights.X_LARGE}`,
            }}
            prependChild={
              <Icon
                name={IconName.HEART_NONE}
                styles={{
                  color: '#F8F7F4',
                  fill: 'transparent',
                  position: 'absolute',
                  left: '8',
                }}
              />
            }
            appendChild={
              <Icon
                name={IconName.ARROW_LEFT}
                styles={{
                  color: '#F8F7F4',
                  fill: 'transparent',
                  position: 'absolute',
                  right: '18',
                }}
              />
            }
          />
          <ToggleWrapper>
            <Button
              testId="Тренери"
              title={t('coachs')}
              style={{
                width: '50%',
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px',
              }}
              appearance={
                isActive ? ButtonAppearance.PRIMARY : ButtonAppearance.SECONDARY
              }
              onClick={isActiveHandler}
            />
            <Button
              testId="Клуби"
              title={t('clubs')}
              style={{
                width: '50%',
                borderTopLeftRadius: '0px',
                borderBottomLeftRadius: '0px',
              }}
              appearance={
                !isActive
                  ? ButtonAppearance.PRIMARY
                  : ButtonAppearance.SECONDARY
              }
              onClick={isActiveHandler}
            />
          </ToggleWrapper>
          <ListWrapper>
            {(isActive && coachsData && coachsData.length > 0) ||
            (!isActive && clubsData && clubsData.length > 0) ? (
              <ul>
                {isActive
                  ? coachsData
                      .slice(0, (coachPageNumber + 1) * itemsPerPage)
                      .map(coach => (
                        <CoachCard key={coach.userId} coachData={coach} />
                      ))
                  : clubsData
                      .slice(
                        // clubPageNumber * itemsPerPage,
                        0,
                        (clubPageNumber + 1) * itemsPerPage,
                      )
                      .map(club => (
                        <ClubCard key={club.name} clubData={club} />
                      ))}
              </ul>
            ) : (
              <div>Ще нічого не обрано!</div>
            )}
            <p onClick={showMore}>{t('show_more')}</p>
            {/* --- */}
            <p onClick={tempClickHandler} style={{ marginTop: '16px' }}>
              LOGIN
            </p>
            <p onClick={userProfileHandler} style={{ marginTop: '16px' }}>
              User profile
            </p>
          </ListWrapper>
        </FavoritesPageWrapper>
      </Container>
    </Section>
  );
};

export default FavoritesPage;
