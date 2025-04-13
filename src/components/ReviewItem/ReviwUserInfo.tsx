import React, { useEffect, useState } from 'react';
import { Avatar, Name } from '@/components/ReviewItem/styles';
import styled from 'styled-components';
import { UserInfoEdit, Badge, StyledDate } from './styles';

interface UserInfoProps {
  userId: string; // ID користувача для запиту даних з бекенду
  reviewDate: string; // Дата створення або редагування відгуку
}

const UserInfo: React.FC<UserInfoProps> = ({ userId }) => {
  const [userData, setUserData] = useState<any>(null); // Для зберігання даних користувача
  const [isLoading, setIsLoading] = useState(true); // Для відстеження стану завантаження
  const [error, setError] = useState<string | null>(null);

  // Запит на бекенд для отримання даних користувача
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://sportpoint-backend.onrender.com/cards/67cadbb405a41b47ac8ded40`,
        );

        if (!response.ok) {
          throw new Error('Не вдалося отримати дані користувача');
        }

        const data = await response.json();

        setUserData(data.data); // Встановлюємо отримані дані
      } catch (error) {
        console.error('Помилка при отриманні даних користувача:', error);
      } finally {
        setIsLoading(false); // Завершення завантаження
      }
    };

    fetchUserData();
  }, [userId]); // Завантажуємо дані один раз після отримання userId

  if (isLoading) {
    return <div>Завантаження...</div>; // Показуємо повідомлення про завантаження
  }

  if (!userData) {
    return <div>Не вдалося знайти користувача.</div>; // Якщо дані не завантажені
  }

  const { avatar, firstName, lastName, role, badge, createdAt, updatedAt } =
    userData.data;

  const roleLabel =
    role === 'coach'
      ? 'Тренер'
      : role === 'adminClub'
        ? 'Клуб'
        : 'Не визначено'; // Для визначення ролі
  const name = role === 'coach' ? `${firstName} ${lastName}` : firstName; // Якщо це тренер, використовуємо ім'я та прізвище, якщо клуб - тільки ім'я.

  const reviewDateToShow = updatedAt ? updatedAt : createdAt;
  return (
    <UserInfoEdit>
      <Avatar src={avatar} />
      <div>
        <Name>{`${name}` ?? `${roleLabel}`}</Name>
        {badge && <Badge>{badge}</Badge>}
      </div>
      <StyledDate>
        {reviewDateToShow
          ? new Date(reviewDateToShow as string).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })
          : 'Дата не вказана'}
      </StyledDate>
    </UserInfoEdit>
  );
};

export default UserInfo;
