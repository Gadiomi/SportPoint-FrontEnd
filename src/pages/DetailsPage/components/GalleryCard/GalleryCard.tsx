import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import TitleContainer from '../TitleContainer/TitleContainer';
import { StyledGalleryCard, SwiperImg } from './styles';

const GalleryCard: React.FC = () => {
  return (
    <StyledGalleryCard>
      <TitleContainer titleKey="details_page.gallery" />
      <Swiper spaceBetween={8} slidesPerView={2}>
        <SwiperSlide>
          <SwiperImg src="/assets/images/DetailsPage/gallery_01_x1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImg src="/assets/images/DetailsPage/gallery_02_x1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImg src="/assets/images/DetailsPage/gallery_01_x1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImg src="/assets/images/DetailsPage/gallery_02_x1.jpg" />
        </SwiperSlide>
      </Swiper>
    </StyledGalleryCard>
  );
};

export default GalleryCard;
