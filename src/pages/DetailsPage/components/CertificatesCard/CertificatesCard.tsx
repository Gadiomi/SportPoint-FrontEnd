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

interface CertificatesCardProps {
  certificates: string[];
}

const CertificatesCard: React.FC<CertificatesCardProps> = ({
  certificates,
}) => {
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
    const nextIndex = (currentIndex + 1) % certificates.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(certificates[nextIndex]);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex =
      (currentIndex - 1 + certificates.length) % certificates.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(certificates[prevIndex]);
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
      <StyledGalleryCard
        className={certificates.length === 1 ? 'single-slide' : ''}
      >
        <TitleContainer titleKey="details_page.certificates" />
        <Swiper spaceBetween={8} slidesPerView={2}>
          {certificates.map((src, idx) => (
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

      {selectedImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent>
            <FullScreenImage src={selectedImage} alt="full screen preview" />
            {certificates.length > 1 && (
              <>
                <NavigationButtonPrev onClick={handlePrevImage}>
                  <Icon
                    name={IconName.DOWN_ARROW}
                    styles={{ width: '32px', height: '32px' }}
                  />
                </NavigationButtonPrev>

                <NavigationButtonNext onClick={handleNextImage}>
                  <Icon
                    name={IconName.DOWN_ARROW}
                    styles={{ width: '32px', height: '32px' }}
                  />
                </NavigationButtonNext>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
      <StyledHr style={{ marginBottom: '32px' }} />
    </div>
  );
};

export default CertificatesCard;
