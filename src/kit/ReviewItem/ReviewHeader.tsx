import React from 'react';
import { ReviewHeaderContainer, Header } from './styles';
import { Icon } from '@/kit';
import { IconName } from '@/kit';

const ReviewHeader: React.FC = () => {
  return (
    <ReviewHeaderContainer>
      {/* <Header>
        <Icon name={IconName.MASSAGE_TYPING} styles={{ fill: "none" }} />
        МОЇ ВІДГУКИ
      </Header>
      <Icon name={IconName.ARROW_LEFT} styles={{ fill: "none" }} /> */}
    </ReviewHeaderContainer>
  );
};

export default ReviewHeader;
