import React from 'react';
import { useTheme } from 'styled-components';
import {
  UserInfo,
  Avatar,
  Name,
  Stars,
  Comment,
  Footer,
  StyledDate,
  Div,
} from './styles';
import { Icon, IconName } from '@/kit';
import styled from 'styled-components';

interface Review {
  id: string;
  name: string;
  surname: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  comment: string;
  rating: number;
  userRole: 'customer' | 'coach' | 'adminClub';
  isFirst?: boolean; // Додаємо isFirstReview, якщо він приходить з бекенду
}

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const theme = useTheme();
  // Вибір аватара залежно від того, чи є він на сервері і ролі
  const getAvatar = (
    avatar: string | null,
    name: string,
    role: 'customer' | 'coach' | 'adminClub',
  ) => {
    // Якщо аватар є, використовуємо його
    if (avatar) {
      return avatar;
    }

    // Якщо аватар відсутній, генеруємо аватар з перших літер імені
    const initials = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');

    // Генерація аватара з літер, з можливістю зміни фону в залежності від ролі
    const backgroundColor =
      role === 'customer' ? '0D8ABC' : role === 'coach' ? 'FF6347' : '2E8B57'; // Колір фону для кожної ролі
    return `https://ui-avatars.com/api/?name=${initials}&background=${backgroundColor}&color=fff`; // Генерація аватара з літер
  };

  const reviewDateToShow = review.updatedAt || review.createdAt;

  return (
    <Div key={review.id}>
      <UserInfo>
        <Avatar src={getAvatar(review.avatar, review.name, review.userRole)} />
        <div>
          <Name>
            {review.name && review.surname
              ? `${review.name} ${review.surname}`
              : 'Анонімний користувач'}
          </Name>

          <Stars>
            {[...Array(5)].map((_, index) => (
              <Icon
                key={`${review.id}-star-${index}`}
                name={IconName.STAR_DEFAULT}
                styles={{
                  fill:
                    index < Number(review.rating ?? 0) // Перевірка на undefined
                      ? theme.color.mainOrange
                      : theme.color.secWhite,
                  color: 'transparent',
                }}
                size={16}
              />
            ))}
          </Stars>
        </div>
        <StyledDate>
          {' '}
          {reviewDateToShow
            ? new Date(reviewDateToShow).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
            : 'Дата не вказана'}
        </StyledDate>
      </UserInfo>
      <Comment>{review.comment ?? 'Немає коментаря'}</Comment>
      <Footer></Footer>
    </Div>
  );
};

export default ReviewItem;
