import React from 'react';
import TitleContainer from '../TitleContainer/TitleContainer';
import { StyledLocationCard, ImageContainer, StyledImage } from './styles';

const LocationCard: React.FC = () => {
  const imageSrc = '/public/assets/images/map_maker_test.jpg';

  return (
    <StyledLocationCard>
      <TitleContainer titleKey="details_page.location" />
      <ImageContainer>
        <StyledImage src={imageSrc} alt="Location" />
      </ImageContainer>
    </StyledLocationCard>
  );
};

export default LocationCard;
