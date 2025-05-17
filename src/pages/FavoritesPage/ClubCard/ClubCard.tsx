import { FC } from 'react';
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
} from './styles';
import { IClubData } from '../../../types';

type Props = {
  clubData: IClubData;
};

const NO_IMAGE = '/assets/svg/no_image.svg'; //TEMP!!!

const ClubCard: FC<Props> = ({ clubData }) => {
  const navigate = useNavigate();

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
            <Icon
              // name={IconName.HEART_FILL}
              name={IconName.HEART_NONE}
              styles={{
                // fill: '#EC4033',
                color: '#EC4033',
              }}
            />
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
