import React from 'react';

interface ProfileCardProps {
  firstLastName: string;
  avatar: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ firstLastName, avatar }) => {
  return (
    <div>
      <img src={avatar} alt={`${firstLastName}`} />
      <h3>{firstLastName}</h3>
    </div>
  );
};

export default ProfileCard;
