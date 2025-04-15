import React from 'react';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import TitleContainer from '../TitleContainer/TitleContainer';
import { OurHallsCardContainer } from './styles';

const OurHallsCard: React.FC = () => {
  return (
    <OurHallsCardContainer>
      <TitleContainer titleKey="details_page.our_halls" />
      <StyledHr style={{ marginBottom: '32px' }} />
    </OurHallsCardContainer>
  );
};

export default OurHallsCard;
