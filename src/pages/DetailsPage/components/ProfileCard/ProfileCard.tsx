import React, { useState } from 'react';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';
import { StyledProfileCard, Avatar, AvatarNone } from './styles';

interface ProfileCardProps {
  firstName: string | undefined;
  lastName?:string| undefined;
  avatar: string | undefined;
  address?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  firstName,
  lastName,
  avatar,
  address,
}) => {
  const [avatarError, setAvatarError] = useState(false);

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const theme = useTheme();

  const renderAvatar =
    avatar && !avatarError ? (
      <Avatar src={avatar} alt={firstName} onError={handleAvatarError} />
    ) : (
      <AvatarNone>
        {firstName ? firstName.charAt(0).toUpperCase() : ''}
      </AvatarNone>
    );

  return (
    <StyledProfileCard>
      {renderAvatar}
      <div style={{ display: 'flex', flexDirection: 'row', gap:'4px', justifyContent: 'center', marginBottom: `${theme.pxs.x2}px`}}>
        <h2 style={fonts.nameDetails}>{firstName} </h2>
        <h2 style={fonts.nameDetails}>{lastName} </h2>
      </div>

      <div style={{ ...fonts.addressDetails, color: theme.color.secWhite }}>
        {address}
      </div>
    </StyledProfileCard>
  );
};

export default ProfileCard;
