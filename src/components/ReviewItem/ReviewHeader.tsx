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
  userRole?: string;
};

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  onCancel,
  title,
  leftIcon = IconName.MASSAGE_TYPING,
  rightIcon = IconName.ARROW_LEFT,
  leftIconStyles = {},
  userRole = 'Customer',
}) => {
  const navigate = useNavigate();

  const handleRightIconClick = () => {
    if (rightIcon === IconName.ARROW_LEFT) {
      if (onCancel) onCancel();
    }
  };

  const finalTitle =
    title ?? (userRole === 'Customer' ? 'ВІДГУКИ' : 'МОЇ ВІДГУКИ');
  return (
    <ReviewHeaderContainer>
      <Header>
        {leftIcon && (
          <Icon name={leftIcon} styles={{ fill: 'none', ...leftIconStyles }} />
        )}
        {finalTitle}
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
