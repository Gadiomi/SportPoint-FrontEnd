import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { Button, Icon, IconName } from '@/kit';
import { ICoachData } from '../../types';
import { fixEnding } from '@/helpers/fixEnding';
import { fonts } from '@/theme/fonts';
import {
  useAddToFavoritesMutation,
  useGetFavoritesQuery,
  useRemoveFromFavoritesMutation,
} from '@/redux/details/favoritesApi';
import {
  CoachCardWrapper,
  CoachImage,
  CoachInfoBlock,
  CoachInfoWrapper,
  Rating,
  ConditionsBlock,
  NameBlock,
  SpecializationBlock,
} from './styles';
import { useGetUserProfileQuery } from '@/redux/user/userApi';

type Props = {
  coachData: ICoachData;
  refetchD?: () => void;
};

interface IFavoriteListInfo {
  userId: string;
  role: string;
  _id: string;
}

const NO_IMAGE = 'assets/svg/no_image.svg'; //TEMP!!!

const CoachCard: FC<Props> = ({ coachData, refetchD }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  // --- - ---
  const {
    data: userData,
    isSuccess,
    refetch,
  } = useGetUserProfileQuery(undefined);
  console.log(' - userData -> ', userData?.userProfile?.favorite);
  useEffect(() => {
    if (isSuccess && userData?.userProfile?.favorite.length > 0) {
      const favoriteList: IFavoriteListInfo[] = userData?.userProfile?.favorite;
      const isInList = favoriteList.some(el => el?.userId === coachData._id);
      setIsChecked(isInList);
    }
  }, [isSuccess, userData]);
  // --- --- -----
  // const { data: favoritesData, refetch } = useGetFavoritesQuery({
  //   role: 'coach',
  // });
  // console.log('favoritesData: ', favoritesData);
  // --- / - ---
  console.log('userRole: ', userRole, ', coachData._id: ', coachData._id);

  const handlerFavorite = async () => {
    if (!userRole || !coachData._id) return;
    try {
      let response;
      if (isChecked) {
        response = await removeFromFavorites({ id: coachData._id }).unwrap();
      } else {
        response = await addToFavorites({
          id: coachData._id,
          data: { userRole },
        }).unwrap();
      }
      console.log(' - response -> ', response);
      refetchD && (await refetchD());
    } catch (error) {
      console.error('Помилка при додаванні/видаленні з обраного:', error);
    }
  };

  return (
    <CoachCardWrapper>
      <CoachInfoWrapper>
        <CoachImage src={coachData?.avatar || NO_IMAGE} alt="coach image" />
        <CoachInfoBlock>
          <NameBlock>
            <h2>{`${coachData?.firstName ?? 'No name'} ${coachData?.lastName ?? 'No name'}`}</h2>
            <div onClick={() => handlerFavorite()}>
              <Icon
                // name={IconName.HEART_FILL}
                name={IconName.HEART_NONE}
                styles={{
                  // isChecked
                  // fill: '#EC4033',
                  fill: isChecked ? '#EC4033' : 'transparent',
                  color: '#EC4033',
                }}
              />
            </div>
          </NameBlock>
          <ConditionsBlock>
            <div>
              <h2>{`${coachData?.description?.price?.amount ?? '-'} грн`}</h2>
              <span>{coachData?.description?.price?.name}</span>
            </div>
            <Rating>
              <div>
                <h2>{coachData?.rating}</h2>
                <Icon
                  name={IconName.STAR_FILL}
                  styles={{
                    width: '18px',
                    height: '18px',
                    fill: 'transparent',
                  }}
                />
              </div>
              <span>{`${coachData?.countReview} ${fixEnding(coachData?.countReview)}`}</span>
            </Rating>
          </ConditionsBlock>
          <SpecializationBlock>
            {/* {coachData?.description?.abilities.map(item => ( */}
            {coachData?.sport.map(item => <span key={item}>{item}</span>)}
          </SpecializationBlock>
        </CoachInfoBlock>
      </CoachInfoWrapper>
      <Button
        testId="Детальніше"
        title={t('more_details')}
        onClick={() => navigate(`/trainers/trainer/${coachData._id}`)}
        style={{
          ...fonts.secondManrope,
          padding: '6px',
        }}
      />
    </CoachCardWrapper>
  );
};

export default CoachCard;
