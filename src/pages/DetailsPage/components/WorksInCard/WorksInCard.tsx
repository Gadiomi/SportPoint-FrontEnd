import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CookiesKey } from '@/constants';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import { useTranslation } from 'react-i18next';
import { IconName, ButtonAppearance } from '@/kit';
import {
  useAddToFavoritesMutation,
  useGetFavoritesQuery,
  useRemoveFromFavoritesMutation,
} from '../../../../redux/details/favoritesApi';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import TitleContainer from '../TitleContainer/TitleContainer';
import RatingBox from '../RatingBox/RatingBox';
import ButtonProfileIcon from '../ButtonProfileIcon/ButtonProfileIcon';

import {
  StyledWorksInCard,
  WorksInContainer,
  IconContainer,
  WorksInWrapper,
  Name,
  Description,
  IconTextWrapper,
  IconWrapper,
  StyledIcon,
  SpanWorkIn,
  StyledButton,
} from './styles';

interface Club {
  _id: string;
  firstName: string;
  lastName: string;
}

interface WorksInCardProps {
  clubs: Club[];
  _id: string | undefined;
  role: string;
  iconNames: IconName[];
  labels: string[];
  rating?: number;
  counts?: number[];
}

const WorksInCard: React.FC<WorksInCardProps> = ({
  clubs,
  _id,
  role,
  iconNames = [],
  labels = [],
  rating,
  counts,
}) => {
  const [favoritesMap, setFavoritesMap] = useState<Record<string, boolean>>({});
  const [addToFavorites] = useAddToFavoritesMutation();
  const { data: favoritesData, refetch } = useGetFavoritesQuery({ role });
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (!favoritesData?.data || !Array.isArray(clubs)) return;

    const favMap: Record<string, boolean> = {};
    clubs.forEach(club => {
      favMap[club._id] = favoritesData.data.some(
        (fav: any) => fav._id === club._id,
      );
    });
    setFavoritesMap(favMap);
  }, [favoritesData, clubs]);

  const handleToggleFavorite = async (clubId: string) => {
    console.log('Натиснули сердечко. ID клубу:', clubId);
    if (!clubId || !role) return;
    const isNowFavorite = favoritesMap[clubId];

    try {
      if (!isNowFavorite) {
        await addToFavorites({ id: clubId, data: { role } }).unwrap();
      } else {
        await removeFromFavorites({ id: clubId }).unwrap();
      }

      setFavoritesMap(prev => ({
        ...prev,
        [clubId]: !isNowFavorite,
      }));

      await refetch();
    } catch (err: any) {
      console.error('Помилка при додаванні/видаленні з обраного:', err);
      if (err?.status === 409) {
        alert('Ця картка вже є в улюблених');
      }
    }
  };

  // const handleMoreDetailsClick = () => {
  //   if (club._id) {
  //     navigate(`/club/${club._id}`);
  //   }
  // };

  return (
    <StyledWorksInCard>
      <WorksInContainer>
        <TitleContainer titleKey="details_page.works_in" />
        {clubs.map(club => {
          console.log('ID клубу:', club._id);
          const isFavorite = favoritesData?.data?.some(
            (fav: any) => fav.userId === club._id,
          );
          return (
            <WorksInWrapper key={club._id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ width: '100px' }}>
                  <Name style={fonts.editButton}>{club.firstName}</Name>
                  <Description
                    style={{
                      ...fonts.descriptionWorkIn,
                      color: theme.color.secWhite,
                    }}
                  >
                    Спортивний клуб
                  </Description>
                </div>
                <div style={{ width: '50px', justifyContent: 'center' }}>
                  <RatingBox
                    iconNames={[IconName.STAR_DEFAULT]}
                    rating={rating}
                    counts={counts}
                    containerStyles={{
                      marginRight: `${theme.pxs.x7}px`,
                    }}
                    iconStyles={{
                      width: `${theme.pxs.x4_5}px`,
                      height: `${theme.pxs.x4_5}px`,
                      justifyContent: 'center',
                    }}
                    spanStyles={fonts.mainManrope}
                  />
                </div>
                {/* <button onClick={() => handleToggleFavorite(club._id)}>
                  <Icon
                    name={
                      favoritesMap[club._id]
                        ? IconName.HEART_FILL
                        : IconName.HEART_NONE
                    }
                    styles={{
                      fill: favoritesMap[club._id] ? '#F8F7F4' : 'transparent',
                    }}
                  />
                </button> */}
                <ButtonProfileIcon
                  appearance={ButtonAppearance.UNDERLINED}
                  style={{
                    width: '24px',
                    color: favoritesMap[club._id] ? '#F8F7F4' : '#888888',
                  }}
                  iconName={
                    favoritesMap[club._id]
                      ? IconName.HEART_FILL
                      : IconName.HEART_NONE
                  }
                  text=""
                  onClick={() => handleToggleFavorite(club._id)}
                  iconStyle={{
                    fill: favoritesMap[club._id] ? '#F8F7F4' : 'transparent',
                  }}
                />
              </div>

              <IconTextWrapper>
                {iconNames.map((iconName, index) => {
                  const iconStyles = index === 1 ? { fill: '#F8F7F4' } : {};
                  return (
                    <IconWrapper key={iconName}>
                      <IconContainer>
                        <StyledIcon name={iconName} styles={iconStyles} />
                        <SpanWorkIn
                          style={{
                            ...fonts.spanWorkIn,
                            color: theme.color.secWhite,
                          }}
                        >
                          {labels[index]}
                        </SpanWorkIn>
                      </IconContainer>
                    </IconWrapper>
                  );
                })}
              </IconTextWrapper>

              <StyledButton
                testId="details_page.edit_button"
                title={t('details_page.more_details')}
                appearance={ButtonAppearance.PRIMARY}
                // onClick={() => handleMoreDetailsClick(club._id)}
                textStyle={{ ...fonts.spanDetails, color: theme.color.white }}
              />
            </WorksInWrapper>
          );
        })}
      </WorksInContainer>
      <StyledHr style={{ marginBottom: '32px' }} />
    </StyledWorksInCard>
  );
};

export default WorksInCard;
