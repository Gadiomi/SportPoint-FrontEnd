import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SportName, StyledImage } from './styles';

export const SwiperNav: React.FC = () => {
  const images = [
    {
      name: 'Басейн',
      image: '/assets/images/homePage/pool.png',
      sportType: 'pool',
    },
    {
      name: 'Йога',
      image: '/assets/images/homePage/yoga.png',
      sportType: 'yoga',
    },
    {
      name: 'Стрейчинг',
      image: '/assets/images/homePage/stretch.png',
      sportType: 'stretching',
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
