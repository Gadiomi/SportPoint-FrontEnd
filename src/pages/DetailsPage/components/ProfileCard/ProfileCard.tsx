import React from 'react';
import { StyledProfileCard, Avatar, Name, Address } from './styles';

interface ProfileCardProps {
  firstLastName: string;
  avatar: string;
  address?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  firstLastName,
  avatar,
  address,
}) => {
  return (
    <StyledProfileCard>
      <Avatar src={avatar} alt={firstLastName} />
      <Name>{firstLastName}</Name>
      <Address>{address}</Address>
    </StyledProfileCard>
  );
};

export default ProfileCard;
