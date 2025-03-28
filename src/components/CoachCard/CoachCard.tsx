import { FC } from 'react';
import { Button, Icon, IconName } from '@/kit';
import { t } from 'i18next';
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
import { ICoachData } from '../../types';

type Props = {
  coachData: ICoachData;
};

const CoachCard: FC<Props> = ({ coachData }) => {
  const detailsHandler = () => {
    console.log('detailsHandler!!!'); //Temp !!!
  };

  return (
    <CoachCardWrapper>
      <CoachInfoWrapper>
        <CoachImage src={coachData.avatar} alt="coach image" />
        <CoachInfoBlock>
          <NameBlock>
            <h2>{coachData.firstLastName}</h2>
            <Icon
              name={IconName.HEART_FILL}
              styles={{
                fill: '#EC4033',
                color: '#EC4033',
              }}
            />
          </NameBlock>
          <ConditionsBlock>
            <div>
              <h2>{`${coachData.description.price[0].amount}грн`}</h2>
              <span>{coachData.description.price[0].name}</span>
            </div>
            <Rating>
              <div>
                <h2>{coachData.rating}</h2>
                <Icon
                  name={IconName.STAR_FILL}
                  styles={{
                    width: '18px',
                    height: '18px',
                    fill: 'transparent',
                  }}
                />
              </div>
              <span>{`${coachData.countReview} відгуки`}</span>
            </Rating>
          </ConditionsBlock>
          <SpecializationBlock>
            {/* <span>Йога</span> <span>Фітнес</span> */}
            {coachData.description.abilities.split(',').map(item => (
              <span key={item}>{item}</span>
            ))}
          </SpecializationBlock>
        </CoachInfoBlock>
      </CoachInfoWrapper>
      <Button
        testId="Детальніше"
        title={t('more_details')}
        onClick={detailsHandler}
      />
    </CoachCardWrapper>
  );
};

export default CoachCard;
