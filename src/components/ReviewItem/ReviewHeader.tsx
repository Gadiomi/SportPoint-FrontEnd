import React from 'react';
import { ReviewHeaderContainer, Header } from './styles';
import { Icon } from '@/kit';
import { IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { IconDiv } from './styles';

type ReviewHeaderProps = {
  title?: string;
  leftIcon?: IconName | null;
  rightIcon?: IconName | null;
  leftIconStyles?: React.CSSProperties;
  onClick?: () => void;
  onCancel?: () => void;
};

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  onCancel,
  title = 'МОЇ ВІДГУКИ',
  leftIcon = IconName.MASSAGE_TYPING,
  rightIcon = IconName.ARROW_LEFT,
  leftIconStyles = {},
}) => {
  const navigate = useNavigate();

  const handleRightIconClick = () => {
    if (rightIcon === IconName.ARROW_LEFT) {
      // if (onCancel) onCancel();
      navigate('/profile'); // Temp!!!
    }
  };

  return (
    <ReviewHeaderContainer>
      <Header>
        {leftIcon && (
          <Icon name={leftIcon} styles={{ fill: 'none', ...leftIconStyles }} />
        )}
        {title}
      </Header>
      {rightIcon && (
        <IconDiv onClick={handleRightIconClick}>
          {' '}
          {/* Wrapping the Icon in a div */}
          <Icon name={rightIcon} styles={{ fill: 'none' }} />
        </IconDiv>
      )}
    </ReviewHeaderContainer>
  );
};

export default ReviewHeader;
