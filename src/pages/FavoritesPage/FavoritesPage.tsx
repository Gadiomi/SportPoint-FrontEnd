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
import { useNavigate } from 'react-router-dom';

// --- TEMP!!! ---
const coachsData: ICoachData[] = [
  {
    userId: '65f2dc3b8a7e8e3e3b5a3a1b',
    firstLastName: 'Андрій К.',
    avatar: '../../../../public/assets/images/tempCoach.jpg',
    countReview: 26,
    rating: 4.9,
    description: {
      abilities: ['Йога', 'Фітнес'],
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
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState<boolean>(true);
  const [coachPageNumber, setCoachPageNumber] = useState<number>(0);
  const [clubPageNumber, setClubPageNumber] = useState<number>(0);

  const isActiveHandler = () => setIsActive(!isActive);

  const showMore = () => {
    isActive
      ? setCoachPageNumber(prev => prev + 1)
      : setClubPageNumber(prev => prev + 1);
  };

  return (
    <Section>
      {/* ??? */}
      <Container maxWidth="375px">
        <FavoritesPageWrapper>
          <Button
            onClick={() => navigate('/profile')}
            testId="ОБРАНІ"
            title={t('chosen')}
            type="submit"
            style={{
              justifyContent: 'flex-start',
              width: '100%',
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
          </ListWrapper>
        </FavoritesPageWrapper>
      </Container>
    </Section>
  );
};

export default FavoritesPage;
