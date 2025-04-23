import React, { useState, useEffect } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Icon, IconName } from '@/kit';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import TitleContainer from '../TitleContainer/TitleContainer';
import {
  StyledGalleryCard,
  SwiperImg,
  ModalOverlay,
  ModalContent,
  FullScreenImage,
  NavigationButtonPrev,
  NavigationButtonNext,
} from './styles';

interface GalleryCardProps {
  images: string[];
}

const GalleryCard: React.FC<GalleryCardProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleImageClick = (src: string, index: number) => {
    setSelectedImage(src);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  return (
    <div>
      <StyledGalleryCard>
        <TitleContainer titleKey="details_page.gallery" />
        <Swiper spaceBetween={8} slidesPerView={2}>
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <SwiperImg
                src={src}
                alt={`gallery-img-${idx}`}
                onClick={() => handleImageClick(src, idx)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledGalleryCard>
      <StyledHr />

      {selectedImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent>
            <FullScreenImage src={selectedImage} alt="full screen preview" />
            <NavigationButtonPrev onClick={handlePrevImage}>
              <Icon
                name={IconName.DOWN_ARROW}
                styles={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </NavigationButtonPrev>
            <NavigationButtonNext onClick={handleNextImage}>
              <Icon
                name={IconName.DOWN_ARROW}
                styles={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </NavigationButtonNext>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default GalleryCard;
