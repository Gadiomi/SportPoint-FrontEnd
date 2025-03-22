import { Button } from '@/kit';
import { CoachCardWrapper, CoachImage, CoachInfoWrapper } from './styles';
import { ConditionsBlock, NameBlock, SpecializationBlock } from '../styles';

const CoachCard = () => {
  const detailsHandler = () => {
    console.log('detailsHandler!!!');
  };
  return (
    <CoachCardWrapper>
      <CoachInfoWrapper>
        <CoachImage />
        <div>
          <NameBlock>
            <h2>Андрій К.</h2>
          </NameBlock>
          <ConditionsBlock>
            <div>
              <p>550грн</p>
              <span>60-хв заняття</span>
            </div>
            <div>
              <p>4.9</p>
              <span>26 відгуки</span>
            </div>
          </ConditionsBlock>
          <SpecializationBlock>
            <span>Йога</span> <span>Фітнес</span>
          </SpecializationBlock>
        </div>
      </CoachInfoWrapper>
      <Button
        testId="Детальніше"
        title={'Детальніше'}
        onClick={detailsHandler}
      />
    </CoachCardWrapper>
  );
};

export default CoachCard;
