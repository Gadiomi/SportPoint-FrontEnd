import React from 'react';
import TitleContainer from '../TitleContainer/TitleContainer';
import { StyledGalleryCard } from './styles';

const GalleryCard: React.FC = () => {
  return (
    <StyledGalleryCard>
      <TitleContainer titleKey="details_page.gallery" />
    </StyledGalleryCard>
  );
};

export default GalleryCard;
