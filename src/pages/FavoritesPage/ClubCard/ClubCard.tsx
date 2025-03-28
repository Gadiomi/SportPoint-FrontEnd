import { FC } from 'react';
import { Button, Icon, IconName } from '@/kit';
import { t } from 'i18next';
import {
  ClubCardWrapper,
  ClubConditionsBlock,
  ClubInfoWrapper,
  ClubNameBlock,
} from './styles';
import { IClubData } from '../../../types';

type Props = {
  clubData: IClubData;
};

const ClubCard: FC<Props> = ({ clubData }) => {
  const detailsHandler = () => {
    console.log('detailsHandler!!!'); //Temp !!!
  };

  return (
    <ClubCardWrapper>
      <ClubInfoWrapper>
        <ClubNameBlock>
          <div>
            <h2>{clubData.name}</h2>
            <p>{clubData.description}</p>
          </div>
          <Icon
            name={IconName.HEART_FILL}
            styles={{
              fill: '#EC4033',
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
            <span>{clubData.distance}</span>
          </div>
          <div>
            <Icon
              name={IconName.CLOCK}
              styles={{
                color: '#b7b7b9',
                fill: '#b7b7b9',
              }}
            />
            <span>{clubData.workTime}</span>
          </div>
        </ClubConditionsBlock>
      </ClubInfoWrapper>
      <Button
        testId="Детальніше"
        title={t('more_details')}
        onClick={detailsHandler}
      />
    </ClubCardWrapper>
  );
};

export default ClubCard;
