import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SportName, StyledImage } from './styles';
import { useTranslation } from 'react-i18next';

export const SwiperNav: React.FC = () => {
  const { t } = useTranslation();
  const images = [
    {
      name: t('filters.pool'),
      image: '/assets/images/homePage/pool.png',
      sportType: 'Басейн',
    },
    {
      name: t('filters.yoga'),
      image: '/assets/images/homePage/yoga.png',
      sportType: 'Йога',
    },
    {
      name: t('filters.pilates'),
      image: '/assets/images/homePage/stretch.png',
      sportType: 'Пілатес',
    },
    { name: 'TRX', image: '/assets/images/baseClub.png', sportType: 'TRX' },
  ];

  const navigate = useNavigate();

  const handleClick = (sportType: string) => {
    navigate(`/clubs?abilities=${sportType}`);
  };

  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={'auto'}
      style={{ marginTop: '32px' }}
    >
      {images.map(({ name, image, sportType }) => (
        <SwiperSlide key={name} style={{ width: '112px', marginRight: '8px' }}>
          <StyledImage
            $bgImage2x={image}
            onClick={() => handleClick(sportType)}
          >
            <SportName>{name}</SportName>
          </StyledImage>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
