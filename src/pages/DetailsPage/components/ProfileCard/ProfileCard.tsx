import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { fonts } from '@/theme/fonts';
import { IconName } from '@/kit';
import ButtonProfileIcon from '../ButtonProfileIcon/ButtonProfileIcon';
import {
  StyledProfileCard,
  Avatar,
  AvatarNone,
  Sport,
  SportEl,
} from './styles';

interface ProfileCardProps {
  iconNames: IconName[];
  firstName: string | undefined;
  lastName?: string | undefined;
  avatar: string | undefined;
  address: string | undefined;
  age?: number;
  sport?: string[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  firstName,
  lastName,
  avatar,
  address,
  age,
  sport,
}) => {
  const [avatarError, setAvatarError] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.includes('account-trainer') ||
      location.pathname.includes('account-admin-club')
    ) {
      setShowButtons(false);
    } else {
      setShowButtons(true);
    }
  }, [location.pathname]);

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const renderAvatar =
    avatar && !avatarError ? (
      <Avatar src={avatar} alt={firstName} onError={handleAvatarError} />
    ) : (
      <AvatarNone>
        {firstName ? firstName.charAt(0).toUpperCase() : ''}
      </AvatarNone>
    );

  const handleClick = () => {
    console.log('Icon clicked');
  };

  return (
    <StyledProfileCard>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showButtons && (
          <ButtonProfileIcon
            iconName={IconName.MASSAGE_TYPING}
            text={t('details_page.comment')}
            onClick={handleClick}
          />
        )}

        {renderAvatar}

        {showButtons && (
          <ButtonProfileIcon
            iconName={IconName.HEART_NONE}
            text={t('details_page.choose')}
            onClick={handleClick}
          />
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: `${theme.pxs.x1}px`,
          justifyContent: 'center',
          marginBottom: `${theme.pxs.x2}px`,
        }}
      >
        <h3 style={fonts.nameDetails}>{firstName} </h3>
        <h3 style={fonts.nameDetails}>{lastName} </h3>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: `${theme.pxs.x1}px`,
          justifyContent: 'center',
          marginBottom: `${theme.pxs.x2}px`,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <p style={{ ...fonts.addressDetails, color: theme.color.secWhite }}>
          {address}
        </p>
        {age && (
          <p style={{ ...fonts.addressDetails, color: theme.color.secWhite }}>
            {age}
            <span
              style={{ ...fonts.addressDetails, color: theme.color.secWhite }}
            >
              років
            </span>
          </p>
        )}
      </div>
      <Sport style={fonts.popUp}>
        {(sport || []).map((item, index) => (
          <SportEl key={index}>{item}</SportEl>
        ))}
      </Sport>
    </StyledProfileCard>
  );
};

export default ProfileCard;
