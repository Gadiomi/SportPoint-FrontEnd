import React from 'react';
import TitleContainer from '../TitleContainer/TitleContainer';
import StyledLink from '../StyledLink/StyledLink';
import { StyledReviewDetailsCard, ReviewDetailsContainer } from './styles';

const ReviewDetailsCard: React.FC = () => {
  return (
    <StyledReviewDetailsCard>
      <TitleContainer titleKey="details_page.reviews" />
      <ReviewDetailsContainer>add</ReviewDetailsContainer>
      <StyledLink />
    </StyledReviewDetailsCard>
  );
};

export default ReviewDetailsCard;
