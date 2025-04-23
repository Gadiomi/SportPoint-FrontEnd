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
import { fixEnding } from '@/helpers/fixEnding';
import { fonts } from '@/theme/fonts';

type Props = {
  coachData: ICoachData;
};

const NO_IMAGE = '../../../../public/assets/svg/no_image.svg'; //TEMP!!!

const CoachCard: FC<Props> = ({ coachData }) => {
  const detailsHandler = () => {
    console.log('detailsHandler!!!'); //Temp !!!
  };

  return (
    <CoachCardWrapper>
      <CoachInfoWrapper>
        <CoachImage src={coachData?.avatar || NO_IMAGE} alt="coach image" />
        <CoachInfoBlock>
          <NameBlock>
            <h2>{`${coachData?.firstName} ${coachData?.lastName}`}</h2>
            <Icon
              // name={IconName.HEART_FILL}
              name={IconName.HEART_NONE}
              styles={{
                // fill: '#EC4033',
                color: '#EC4033',
              }}
            />
          </NameBlock>
          <ConditionsBlock>
            <div>
              <h2>{`${coachData?.description?.price[0]?.amount || '-'} грн`}</h2>
              <span>{coachData?.description?.price[0]?.name}</span>
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
            {coachData?.description?.abilities.map(item => (
              <span key={item}>{item}</span>
            ))}
          </SpecializationBlock>
        </CoachInfoBlock>
      </CoachInfoWrapper>
      <Button
        testId="Детальніше"
        title={t('more_details')}
        onClick={detailsHandler}
        style={{
          ...fonts.secondManrope,
          padding: '6px',
        }}
      />
    </CoachCardWrapper>
  );
};

export default CoachCard;
