import React from 'react';
import { ReviewHeaderContainer, Header } from './styles';
import { Icon } from '@/kit';
import { IconName } from '@/kit';

type ReviewHeaderProps = {
  title?: string;
  leftIcon?: IconName | null;
  rightIcon?: IconName | null;
  onClick?: () => void;
};

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  title = 'МОЇ ВІДГУКИ',
  leftIcon = IconName.MASSAGE_TYPING,
  rightIcon = IconName.ARROW_LEFT,
}) => {
  return (
    <ReviewHeaderContainer>
      <Header>
        {leftIcon && <Icon name={leftIcon} styles={{ fill: 'none' }} />}
        {title}
      </Header>
      {rightIcon && <Icon name={rightIcon} styles={{ fill: 'none' }} />}
    </ReviewHeaderContainer>
  );
};

export default ReviewHeader;
