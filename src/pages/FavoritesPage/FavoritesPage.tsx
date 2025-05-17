import { useState } from 'react';
import { t } from 'i18next';
import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { Container, Section } from '@/components/ContainerAndSection';
import CoachCard from '../../components/CoachCard/CoachCard';
import ClubCard from './ClubCard/ClubCard';
import ProfileButton from '../AccountPage/ProfileButton';
import { IClubData, ICoachData } from '../../types';
import {
  FavoritesPageWrapper,
  FiltersWrapper,
  ListWrapper,
  ToggleWrapper,
} from './styles';
import { useGetCardsQuery } from '@/redux/cards/cardApi';
import BigLoader from '@/components/BigLoader/BigLoader';
import { useGetFavoritesQuery } from '@/redux/details/favoritesApi';

// --- TEMP!!! ---
const coachsData1: ICoachData[] = [
  {
    _id: '67feb570b02fe7b237c35f80',
    userId: '65f2dc3b8a7e8e3e3b5a3a1b',
    firstName: 'Андрій',
    lastName: 'К.',
    avatar: '/assets/svg/no_image.svg',
    countReview: 26,
    rating: 4.9,
    description: {
      abilities: ['Йога', 'Фітнес'],
      price: {
        name: '60-хв заняття',
        amount: '550',
        description: 'yoga',
      },
    },
    sport: ['Йога', 'Фітнес'],
  },
];

const clubsData1: IClubData[] = [
  {
    firstName: 'Sport Life',
    description: {
      schedule: [
        {
          days: 'Everyday',
          hours: '06:00-23:00',
        },
      ],
      address: '',
      abilities: [''],
    },
    distance: '1.5 км',
    workTime: '24/1',
    avatar: '',
    _id: '10',
  },
  // {
  //   firstName: 'Sport Life light',
  //   description: 'Спортивний клубик',
  //   distance: '5 км',
  //   workTime: '20/2',
  //   avatar: '',
  //   _id: '11',
  // },
  // {
  //   firstName: 'Sport Life hard',
  //   description: 'Спортивний клубище',
  //   distance: '3 км',
  //   workTime: '24/3',
  //   avatar: '',
  //   _id: '12',
  // },
];
// --- - ---
const filters = {
  address: '',
  minPrice: null,
  maxPrice: null,
  abilities: '',
  sort: '',
};

//  for Clubs
// const filters = {
//   address: '',
//   minPrice: null,
//   maxPrice: null,
//   // abilities: abilityFromUrl,
//   sort: '',
// };
// --- / - ---
// --- /TEMP!!! ---

const itemsPerPage = 3;

const FavoritesPage = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [coachPageNumber, setCoachPageNumber] = useState<number>(0);
  const [clubPageNumber, setClubPageNumber] = useState<number>(0);

  const isActiveHandler = () => setIsActive(!isActive);

  const showMore = () => {
    isActive
      ? setCoachPageNumber(prev => prev + 1)
      : setClubPageNumber(prev => prev + 1);
  };

  // --- - ---
  const role = isActive ? 'coach' : 'adminClub';
  const { data, refetch, isLoading } = useGetFavoritesQuery({ role });
  // console.log(' - favoritesData -> ', data.data);
  // --- // - ---
  // --- - ---
  // const {
  //   data: data,
  //   error,
  //   isLoading,
  // } = useGetCardsQuery({
  //   role: isActive ? 'coach' : 'adminClub',
  //   page: 1,
  //   ...filters,
  // });
  console.log(' - isActive -> ', isActive, ' -> ', role);
  console.log('data -> ', data);
  console.log('- data?.data -> ', data?.data);
  // console.log('data?.data?.data -> ', data?.data?.data);

  // const coachsData: ICoachData[] = isActive && data?.data?.data;
  // const clubsData: IClubData[] = !isActive && data?.data?.data;

  const coachsData: ICoachData[] = isActive && data?.data;
  const clubsData: IClubData[] = !isActive && data?.data;

  return (
    <Section>
      {/* ??? */}
      <Container maxWidth="375px">
        {isLoading ? (
          <BigLoader isLoading />
        ) : (
          <FavoritesPageWrapper>
            <ProfileButton title={'favorites'} arrowDirection={'left'} />
            <FiltersWrapper>
              <p>Сортувати за: </p>
              <div>
                <div>
                  <span>відстанню</span>
                  <Icon
                    name={IconName.SORT_VERTICAL_02}
                    styles={{
                      color: '#EC4033',
                    }}
                  />
                </div>

                <div>
                  <span>ціною</span>
                  <Icon
                    name={IconName.SORT_VERTICAL_021}
                    styles={{
                      color: '#EC4033',
                    }}
                  />
                </div>
              </div>
            </FiltersWrapper>
            <ToggleWrapper>
              <Button
                testId="Клуби"
                title={t('clubs')}
                style={{
                  width: '50%',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  color: isActive ? '#B7B7B9' : '#F8F7F4',
                }}
                appearance={
                  !isActive
                    ? ButtonAppearance.PRIMARY
                    : ButtonAppearance.SECONDARY
                }
                onClick={isActiveHandler}
              />
              <Button
                testId="Тренери"
                title={t('coachs')}
                style={{
                  width: '50%',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  color: !isActive ? '#B7B7B9' : '#F8F7F4',
                }}
                appearance={
                  isActive
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
                          <CoachCard key={coach._id} coachData={coach} />
                        ))
                    : clubsData
                        .slice(
                          // clubPageNumber * itemsPerPage,
                          0,
                          (clubPageNumber + 1) * itemsPerPage,
                        )
                        .map(club => (
                          <ClubCard key={club._id} clubData={club} />
                        ))}
                </ul>
              ) : (
                <div>Ще нічого не обрано!</div>
              )}
              <p onClick={showMore}>{t('show_more')}</p>
            </ListWrapper>
          </FavoritesPageWrapper>
        )}
      </Container>
    </Section>
  );
};

export default FavoritesPage;
