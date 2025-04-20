import React from 'react';
import { Avatar, Name } from '@/components/ReviewItem/styles';
import { UserInfoEdit, Badge, StyledDate } from './styles';

interface UserInfoProps {
  avatar?: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  role?: 'coach' | 'adminClub' | 'customer';
  badge?: string;
  createdAt: string;
  updatedAt?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  avatar,
  firstName,
  lastName,
  role,
  badge,
  createdAt,
  updatedAt,
}) => {
  const roleLabel =
    role === 'coach' ? 'Тренер' : role === 'adminClub' ? 'Клуб' : 'Користувач';

  const fullName = `${firstName} ${lastName}`;

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

  return (
    <UserInfoEdit>
      <Avatar src={avatar || generatedAvatar} />
      <div>
        <Name>{`${fullName}`}</Name>
        {badge && <Badge>{badge}</Badge>}
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

// import React, { useEffect, useState } from 'react';
// import { Avatar, Name } from '@/components/ReviewItem/styles';
// import styled from 'styled-components';
// import { UserInfoEdit, Badge, StyledDate } from './styles';

// interface UserInfoProps {
//   userId: string; // ID користувача для запиту даних з бекенду
//   reviewDate: string; // Дата створення або редагування відгуку
// }

// const UserInfo: React.FC<UserInfoProps> = ({ userId }) => {
//   const [userData, setUserData] = useState<any>(null); // Для зберігання даних користувача
//   const [isLoading, setIsLoading] = useState(true); // Для відстеження стану завантаження
//   const [error, setError] = useState<string | null>(null);

//   // Запит на бекенд для отримання даних користувача
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(
//           `https://sportpoint-backend.onrender.com/cards/67cadbb405a41b47ac8ded40`,
//         );

//         if (!response.ok) {
//           throw new Error('Не вдалося отримати дані користувача');
//         }

//         const data = await response.json();

//         setUserData(data.data); // Встановлюємо отримані дані
//       } catch (error) {
//         console.error('Помилка при отриманні даних користувача:', error);
//       } finally {
//         setIsLoading(false); // Завершення завантаження
//       }
//     };

//     fetchUserData();
//   }, [userId]); // Завантажуємо дані один раз після отримання userId

//   if (isLoading) {
//     return <div>Завантаження...</div>; // Показуємо повідомлення про завантаження
//   }

//   if (!userData) {
//     return <div>Не вдалося знайти користувача.</div>; // Якщо дані не завантажені
//   }

//   const { avatar, firstName, lastName, role, badge, createdAt, updatedAt } =
//     userData.data;

//   const roleLabel =
//     role === 'coach'
//       ? 'Тренер'
//       : role === 'adminClub'
//         ? 'Клуб'
//         : 'Не визначено'; // Для визначення ролі
//   const name = role === 'coach' ? `${firstName} ${lastName}` : firstName; // Якщо це тренер, використовуємо ім'я та прізвище, якщо клуб - тільки ім'я.

//   const reviewDateToShow = updatedAt ? updatedAt : createdAt;
//   return (
//     <UserInfoEdit>
//       <Avatar src={avatar} />
//       <div>
//         <Name>{`${name}` ?? `${roleLabel}`}</Name>
//         {badge && <Badge>{badge}</Badge>}
//       </div>
//       <StyledDate>
//         {reviewDateToShow
//           ? new Date(reviewDateToShow as string).toLocaleDateString('en-US', {
//               month: 'short',
//               day: '2-digit',
//               year: 'numeric',
//             })
//           : 'Дата не вказана'}
//       </StyledDate>
//     </UserInfoEdit>
//   );
// };

// export default UserInfo;
