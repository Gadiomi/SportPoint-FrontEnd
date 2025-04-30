import React from 'react';
import { Avatar, Name } from '@/components/ReviewItem/styles';
import {
  UserInfoEdit,
  Badge,
  StyledDate,
  SportListEdit,
  SportTagEdit,
} from './styles';

interface UserInfoProps {
  avatar: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  role?: 'coach' | 'adminClub' | 'customer';
  sport?: string | string[];
  createdAt: string;
  updatedAt?: string;
  rating?: number;
}

const UserInfo: React.FC<UserInfoProps> = ({
  avatar,
  firstName,
  lastName,
  role,
  sport,
  createdAt,
  updatedAt,
  rating,
}) => {
  const roleLabel =
    role === 'coach' ? 'Тренер' : role === 'adminClub' ? 'Клуб' : 'Користувач';

  const fullName = `${firstName} ${lastName}`;
  console.log('sport', sport);

  // Створення ініціалів
  const initials = fullName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  // Колір для аватара в залежності від ролі
  const backgroundColor =
    role === 'customer' ? '0D8ABC' : role === 'coach' ? 'FF6347' : '2E8B57';

  // Генерація URL до аватарки
  const generatedAvatar = `https://ui-avatars.com/api/?name=${initials}&background=${backgroundColor}&color=fff`;
  const reviewDateToShow = updatedAt || createdAt || new Date().toISOString();
  console.log(
    'UserInfo sport:',
    sport,
    'Тип:',
    typeof sport,
    'isArray:',
    Array.isArray(sport),
  );

  return (
    <UserInfoEdit>
      <Avatar src={avatar || generatedAvatar} />
      <div>
        <Name>{`${fullName}`}</Name>
        {sport && Array.isArray(sport) ? (
          <SportListEdit>
            {sport.map(s => (
              <SportTagEdit key={s}>{s}</SportTagEdit>
            ))}
          </SportListEdit>
        ) : (
          sport && <Badge>{sport}</Badge>
        )}
      </div>
      <StyledDate>
        {reviewDateToShow
          ? new Date(reviewDateToShow).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : 'Дата не вказана'}
      </StyledDate>
    </UserInfoEdit>
  );
};

export default UserInfo;
