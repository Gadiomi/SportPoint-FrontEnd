import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Card, CardContent } from "@/components/reviewsPage/cards";
// import { Button } from "@/components/reviewsPage/button";
import EditReviewPage from './EditReviewPage';
import { Container, Section } from '@/components/ContainerAndSection';
import {
  ReviewHeader,
  Header,
  ReviewCard,
  Avatar,
  Name,
  Stars,
  Comment,
  Footer,
  Feedback,
  Date,
  ButtonGroup,
  FeedbackButton,
  ActionButton,
  DeleteButton,
  UserInfo,
} from './styles';
import { IconName } from '@/kit';
import { Icon } from '@/kit';
import { colorsLight, colorsDark } from '@/theme/colors';
import styled, { ThemeConsumer, useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  comment: string;
  likes: number;
  dislikes: number;
  rating: number; // ✅ Додаємо "?" (може бути undefined)
  reviews: { id: number; rating: number }[]; // ✅ Додаємо для середнього рейтингу
}

const getCurrentDate = (): string => {
  const now = new window.Date();
  return `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${now.getFullYear()}`;
};

const initialReviews = [
  {
    id: 1,
    name: 'Андрій М.',
    avatar: '/assets/images/avatar.png',
    rating: 4,
    reviews: [
      { id: 1, rating: 5 },
      { id: 2, rating: 4 },
      { id: 3, rating: 3 },
      { id: 4, rating: 5 },
    ],
    comment:
      'Відмінний тренер! 👋 Дуже уважний до деталей, допомагає правильно виконувати вправи та мотивує не здаватися. Завдяки його порадам я бачу реальні результати вже через кілька тижнів! Рекомендую всім, хто хоче ефективні тренування та підтримку. 💪',
    date: getCurrentDate(), // Використовуємо функцію тут!
    likes: 0,
    dislikes: 0,
  },
  {
    id: 2,
    name: 'Анна М.',
    avatar: '/assets/images/avatar.png',
    rating: 3,
    reviews: [
      { id: 1, rating: 5 },
      { id: 2, rating: 4 },
      { id: 3, rating: 3 },
      { id: 4, rating: 5 },
    ],
    comment:
      'Відмінний тренер! 👋 Дуже уважний до деталей, допомагає правильно виконувати вправи та мотивує не здаватися. Завдяки його порадам я бачу реальні результати вже через кілька тижнів! Рекомендую всім, хто хоче ефективні тренування та підтримку. 💪',
    date: getCurrentDate(), // Використовуємо функцію тут!
    likes: 0,
    dislikes: 0,
  },
  // Можно добавить больше отзывов
];

const ReviewsPage = () => {
  const [reviewsState, setReviewsState] = useState(initialReviews);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);

  const { t } = useTranslation();
  const { theme } = useTheme();

  // Функция для загрузки отзывов с бэкенда
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Review[]>(
        'http://sportpoint-backend.onrender.com/reviews',
      ); // URL Swagger API
      setReviews(response.data); // Сохраняем данные в состояние
    } catch (err) {
      setError('Не вдалося завантажити відгуки');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(); // Загружаем отзывы при монтировании компонента
  }, []);

  // Функція для Так/Ні
  const handleFeedback = (id: number, type: 'like' | 'dislike') => {
    setReviews(prevReviews =>
      prevReviews.map(review => {
        if (review.id === id) {
          if (type === 'like') {
            return {
              ...review,
              likes: review.likes === 0 ? 1 : 0,
              dislikes: 0,
            };
          } else {
            return {
              ...review,
              dislikes: review.dislikes === 0 ? 1 : 0,
              likes: 0,
            };
          }
        }
        return review;
      }),
    );
  };

  // Функція видалення відгуку
  const handleDeleteReview = async (id: number) => {
    console.log('Видаляється відгук з ID:', id);
    const isConfirmed = window.confirm('Ви дійсно хочете видалити цей відгук?');
    if (isConfirmed) {
      setReviewsState(prevReviews => {
        const updatedReviews = [
          ...prevReviews.filter(review => review.id !== id),
        ];
        console.log('Оновлений список відгуків:', updatedReviews);
        return updatedReviews;
      });
    }
  };
  //      if (isConfirmed) {
  //       try {
  //         await axios.delete(`http://sportpoint-backend.onrender.com/reviews/${id}`);
  //          // Оновлюємо список відгуків після видалення
  //       setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  //     } catch (err) {
  //       setError("Не вдалося видалити відгук");
  //       console.error(err);
  //     }
  //   }
  // };

  // Функція видалення редагування
  const handleEdit = (review: Review) => {
    setCurrentReview(review);
    setIsEditing(true);
  };

  return (
    <Section>
      <Container>
        {isEditing ? (
          currentReview && (
            <EditReviewPage
              review={currentReview}
              onCancel={() => setIsEditing(false)}
            />
          )
        ) : (
          <>
            <ReviewHeader>
              <Header>
                <Icon
                  name={IconName.MASSAGE_TYPING}
                  styles={{ fill: 'none' }}
                />
                МОЇ ВІДГУКИ
              </Header>
              <Icon name={IconName.ARROW_LEFT} styles={{ fill: 'none' }} />
            </ReviewHeader>

            {reviews.map(review => (
              <ReviewCard key={review.id}>
                <UserInfo>
                  <Avatar src={review.avatar} />
                  <Name>{review.name}</Name>
                  <Stars>
                    {[...Array(5)].map((_, index) => (
                      <Icon
                        name={IconName.STAR_DEFAULT}
                        styles={{
                          fill:
                            index < review.rating
                              ? colorsLight.mainOrange
                              : colorsLight.secWhite,
                        }}
                      />
                    ))}
                  </Stars>
                </UserInfo>

                <Comment>{review.comment}</Comment>
                <Footer>
                  <Feedback>
                    <Text>Чи корисний цей коментар? </Text>
                    <FeedbackButton
                      onClick={() => handleFeedback(review.id, 'like')}
                    >
                      <Text> Так ({review.likes})</Text>
                    </FeedbackButton>{' '}
                    <FeedbackButton
                      onClick={() => handleFeedback(review.id, 'dislike')}
                    >
                      <Text>Ні ({review.dislikes})</Text>
                    </FeedbackButton>
                  </Feedback>
                  <Text>
                    <Date>{review.date}</Date>
                  </Text>
                </Footer>
                <ButtonGroup>
                  <DeleteButton onClick={() => handleDeleteReview(review.id)}>
                    Видалити
                  </DeleteButton>
                  <ActionButton onClick={() => handleEdit(review)}>
                    <Icon
                      name={IconName.EDIT_CONTAINED}
                      styles={{ fill: 'none' }}
                      size={16}
                    />{' '}
                    Редагувати
                  </ActionButton>
                </ButtonGroup>
              </ReviewCard>
            ))}
          </>
        )}
      </Container>
    </Section>
  );
};

export default ReviewsPage;

const Text = styled.p(({ theme }) => ({
  ...theme.fonts.lightManrope,

  color: theme.color.secWhite,
}));
