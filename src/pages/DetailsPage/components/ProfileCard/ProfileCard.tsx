import React, { useState } from 'react';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';
import { StyledProfileCard, Avatar, Name, AvatarNone, Address } from './styles';

interface ProfileCardProps {
  firstLastName: string | undefined;
  avatar: string | undefined;
  address?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  firstLastName,
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
      <Avatar src={avatar} alt={firstLastName} onError={handleAvatarError} />
    ) : (
      <AvatarNone>
        {firstLastName ? firstLastName.charAt(0).toUpperCase() : ''}
      </AvatarNone>
    );

  return (
    <StyledProfileCard>
      {renderAvatar}
      <Name style={fonts.nameDetails}>{firstLastName}</Name>
      <Address style={{ ...fonts.addressDetails, color: theme.color.secWhite }}>
        {address}
      </Address>
    </StyledProfileCard>
  );
};

export default ProfileCard;
