import React from 'react';
import { ReviewHeaderContainer, Header } from './styles';
import { Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconDiv } from './styles';

type ReviewHeaderProps = {
  title?: string;
  leftIcon?: IconName | null;
  rightIcon?: IconName | null;
  leftIconStyles?: React.CSSProperties;
  rightIconStyles?: React.CSSProperties;
  onClick?: () => void;
  onCancel?: () => void;
  userRole?: string;
};

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  onCancel,
  title,
  leftIcon = IconName.Icon_message_chat_01,
  rightIcon = IconName.ARROW_LEFT,
  leftIconStyles = {},
  rightIconStyles = {},
  userRole,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const translate: (key: string, options?: Record<string, any>) => string = t;

  const handleRightIconClick = () => {
    if (rightIcon === IconName.ARROW_LEFT) {
      if (onCancel) {
        onCancel();
      } else {
        navigate('/profile'); // Інакше — на профіль
      }
    }
  };

  const finalTitle =
    title ??
    (userRole === 'сustomer'
      ? translate('account_page.reviews')
      : translate('details_page.reviews'));
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
          <Icon
            name={rightIcon}
            styles={{ fill: 'none', ...rightIconStyles }}
          />
        </IconDiv>
      )}
    </ReviewHeaderContainer>
  );
};

export default ReviewHeader;
