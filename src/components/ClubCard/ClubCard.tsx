import { FC, useEffect, useState } from 'react';
import { Button, Icon, IconName, Main, Small } from '@/kit';
import { t } from 'i18next';
import {
  ClubCardBox,
  ClubDetail,
  ClubImage,
  ClubInfo,
  ClubInitial,
  HeartButton,
  IconWrap,
  IconWrapRating,
  InfoWrap,
  InfoWrapReviews,
  LightText,
  RatingText,
} from './styles';
import { ClubData, IFavoriteListInfo } from '../../types';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fonts } from '@/theme/fonts';
import { useAppSelector } from '@/hooks/hooks';
import {
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} from '@/redux/details/favoritesApi';
import { useGetUserProfileQuery } from '@/redux/user/userApi';
import { FavModalIsLogin } from '../FavModalIsLogin/FavModalIsLogin';

type Props = {
  clubData: ClubData;
};

export const ClubCard: FC<Props> = ({ clubData }) => {
  const { avatar, _id, firstName, description, countReview, rating } = clubData;
  const [isFavModalOpen, setIsFavModalOpen] = useState(false);
  const userRole = localStorage.getItem('userRole');
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {
    data: userData,
    isSuccess,
    refetch: refechUserProfile,
  } = useGetUserProfileQuery(undefined);
  const { isLogin } = useAppSelector(state => state.setLogin);

  useEffect(() => {
    refechUserProfile();
  }, []);

  useEffect(() => {
    if (isSuccess && userData?.userProfile?.favorite.length > 0) {
      const favoriteList: IFavoriteListInfo[] = userData?.userProfile?.favorite;
      const isInList = favoriteList.some(el => el?.userId === _id);
      setIsChecked(isInList);
    }
  }, [isSuccess, userData]);

  const shortDays = description?.schedule
    ? description.schedule
        .flatMap(item => item.days.split(','))
        .map(day => day.trim().slice(0, 2))
        .join(', ')
    : '-';
  const navigate = useNavigate();
  const theme = useTheme();
  const handlerFavorite = async () => {
    if (!userRole || !_id) return;
    try {
      let response;
      if (isChecked) {
        response = await removeFromFavorites({ id: _id }).unwrap();
      } else {
        response = await addToFavorites({
          id: _id,
          data: { userRole },
        }).unwrap();
      }
      console.log(' - response -> ', response);
      refetchFavorites && (await refetchFavorites());
      refechUserProfile();
    } catch (error) {
      console.error('Помилка при додаванні/видаленні з обраного:', error);
    }
  };
  const openFavModal = () => {
    setIsFavModalOpen(true);
  };
  return (
    <>
      <ClubCardBox>
        <ClubImage image={avatar}>
          {!avatar && <ClubInitial>{firstName?.charAt(0)}</ClubInitial>}
        </ClubImage>
        <HeartButton
          onClick={() => {
            if (isLogin) {
              handlerFavorite();
            } else {
              openFavModal();
            }
          }}
        >
          <Icon
            name={IconName.HEART_NONE}
            styles={{
              fill: isChecked ? '#EC4033' : 'transparent',
              color: '#EC4033',
            }}
            size={24}
          />
        </HeartButton>
        <ClubInfo>
          <InfoWrap>
            <Main style={{ fontWeight: '500' }}>{firstName}</Main>
            <LightText style={{ fontWeight: '400' }}>{t('gym')}</LightText>
          </InfoWrap>
          <InfoWrapReviews>
            <IconWrapRating>
              <RatingText>{rating}</RatingText>
              <Icon
                styles={{ color: theme.color.white }}
                name={IconName.STAR_FILL}
                size={18}
              />
            </IconWrapRating>
            <Small style={{ color: theme.color.disabled }}>
              {countReview} {t('home_page.reviews')}
            </Small>
          </InfoWrapReviews>
        </ClubInfo>
        <ClubDetail>
          <IconWrap>
            <Icon
              styles={{ color: theme.color.disabled }}
              name={IconName.LOCATION}
            />
            <LightText style={{ marginLeft: '0px' }}>1.9км</LightText>
          </IconWrap>
          <IconWrap>
            <Icon
              styles={{
                color: theme.color.disabled,
                fill: theme.color.disabled,
              }}
              name={IconName.CLOCK}
            />
            {shortDays ? (
              <LightText>{shortDays}</LightText>
            ) : (
              <LightText>-</LightText>
            )}
          </IconWrap>
        </ClubDetail>
        <Button
          testId="details"
          title={t('more_details')}
          style={{
            ...fonts.secondManrope,
            width: '100%',
            padding: theme.pxs.x1_5,
          }}
          onClick={() => navigate(`club/${_id}`)}
        />
      </ClubCardBox>
      {isFavModalOpen && (
        <FavModalIsLogin
          isFavModalOpen={isFavModalOpen}
          setIsFavModalOpen={setIsFavModalOpen}
        />
      )}
    </>
  );
};
