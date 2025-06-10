import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { Button, Icon, IconName } from '@/kit';
import { fonts } from '@/theme/fonts';
import {
  ClubCardWrapper,
  ClubConditionsBlock,
  ClubImage,
  ClubInfoBlock,
  ClubInfoWrapper,
  ClubNameBlock,
  HeartBlock,
} from './styles';
import { IClubData } from '../../../types';
// import { handlerFavorites } from '@/components/CoachCard/handlerFavorites';
import { useGetUserProfileQuery } from '@/redux/user/userApi';
import {
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} from '@/redux/details/favoritesApi';

type Props = {
  clubData: IClubData;
  refetchFavorites?: () => void;
};

interface IFavoriteListInfo {
  userId: string;
  role: string;
  _id: string;
}

const NO_IMAGE = '/assets/svg/no_image.svg'; //TEMP!!!

const ClubCard: FC<Props> = ({ clubData, refetchFavorites }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {
    data: userData,
    isSuccess,
    refetch: refechUserProfile,
  } = useGetUserProfileQuery(undefined);
  console.log(' - ClubCard userData -> ', userData?.userProfile?.favorite);

  useEffect(() => {
    refechUserProfile();
  }, []);

  useEffect(() => {
    if (isSuccess && userData?.userProfile?.favorite.length > 0) {
      const favoriteList: IFavoriteListInfo[] = userData?.userProfile?.favorite;
      const isInList = favoriteList.some(el => el?.userId === clubData._id);
      setIsChecked(isInList);
    }
  }, [isSuccess, userData]);

  const handlerFavorite = async () => {
    if (!userRole || !clubData._id) return;
    try {
      let response;
      if (isChecked) {
        response = await removeFromFavorites({ id: clubData._id }).unwrap();
      } else {
        response = await addToFavorites({
          id: clubData._id,
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

  return (
    <ClubCardWrapper>
      <ClubInfoWrapper>
        <ClubImage src={clubData?.avatar || NO_IMAGE} alt="club image" />
        <ClubInfoBlock>
          <ClubNameBlock>
            <div>
              <h2>
                {clubData.firstName} {clubData?.lastName}
              </h2>
              <p>{clubData?.description?.short_desc}</p>
            </div>
            <HeartBlock onClick={() => handlerFavorite()}>
              <Icon
                // name={IconName.HEART_FILL}
                name={IconName.HEART_NONE}
                styles={{
                  // fill: '#EC4033',
                  fill: isChecked ? '#EC4033' : 'transparent',
                  color: '#EC4033',
                }}
              />
            </HeartBlock>
          </ClubNameBlock>
          <ClubConditionsBlock>
            <div>
              <Icon
                name={IconName.LOCATION}
                styles={{
                  color: '#b7b7b9',
                  fill: 'transparent',
                }}
              />
              {/* <span>{clubData.distance}</span> */}
              <span>3 км</span>
            </div>
            <div>
              <Icon
                name={IconName.CLOCK}
                styles={{
                  color: '#b7b7b9',
                  fill: '#b7b7b9',
                }}
              />
              {/* <span>{clubData.workTime}</span> */}
              <span>
                {clubData?.description?.schedule
                  ? clubData?.description?.schedule[0]?.days
                  : '-'}
              </span>
              /
              <span>
                {clubData?.description?.schedule
                  ? clubData?.description?.schedule[0]?.hours
                  : '-'}
              </span>
            </div>
          </ClubConditionsBlock>
        </ClubInfoBlock>
      </ClubInfoWrapper>
      <Button
        testId="Детальніше"
        title={t('more_details')}
        onClick={() => navigate(`/clubs/club/${clubData._id}`)}
        style={{
          ...fonts.secondManrope,
          padding: '6px',
        }}
      />
    </ClubCardWrapper>
  );
};

export default ClubCard;
