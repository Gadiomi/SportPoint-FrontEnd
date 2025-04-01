import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { IconName, ButtonAppearance, ButtonTypogr } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTranslation } from 'react-i18next';
import TitleContainer from '../TitleContainer/TitleContainer';
import RatingBox from '../RatingBox/RatingBox';

import {
  StyledOurCoachCard,
  OurCoachContainer,
  OurCoachWrapper,
  OurCoachBox,
  PriceRatingBox,
  Text,
  StyledButton,
  Avatar,
  Name,
  Equipment,
  EquipmentEl,
  InfoContainer,
  PriceBox,
  Price,
} from './styles';

interface OurCoachCardProps {
  avatar?: string;
  firstLastName?: string;
  price: string[];
  equipment: string[];
  iconNames: IconName[];
  rating: number;
  counts: number[];
}

const OurCoachCard: React.FC<OurCoachCardProps> = ({
  avatar,
  firstLastName,
  equipment,
  price,
  rating,
  counts,
}) =>
  // const OurCoachCard: React.FC = ()
  {
    //   const navigate = useNavigate();

    // const handleMoreDetailsClick = () => {
    //   if (coachId) {
    //     navigate(`/club/${coachId}`);
    //   }
    // };

    const { t } = useTranslation();

    return (
      <StyledOurCoachCard>
        <OurCoachContainer>
          <TitleContainer titleKey="details_page.our_coach" />
          <OurCoachWrapper>
            <OurCoachBox>
              <Avatar src={avatar} alt={firstLastName} />
              <InfoContainer>
                <Name style={fonts.secondManrope}>{firstLastName}</Name>
                <PriceRatingBox>
                  <PriceBox>
                    <Price style={fonts.mainManrope}> {price}</Price>
                    <Text style={fonts.smallText}>60-хв заняття</Text>
                  </PriceBox>
                  <RatingBox
                    iconNames={[IconName.STAR_DEFAULT]}
                    rating={rating}
                    counts={counts}
                    containerStyles={{
                      marginRight: '28px',
                    }}
                    iconStyles={{
                      width: '18px',
                      height: '18px',
                    }}
                    spanStyles={fonts.mainManrope}
                  />
                </PriceRatingBox>
                <Equipment style={fonts.popUp}>
                  {equipment.map((item, index) => (
                    <EquipmentEl key={index}>{item}</EquipmentEl>
                  ))}
                </Equipment>
              </InfoContainer>
            </OurCoachBox>
            <StyledButton
              testId="details_page.edit_button"
              title={t('details_page.more_details')}
              appearance={ButtonAppearance.PRIMARY}
              style={fonts.secondManrope}
            >
              <ButtonTypogr>{t('details_page.more_details')}</ButtonTypogr>
            </StyledButton>
          </OurCoachWrapper>
        </OurCoachContainer>
      </StyledOurCoachCard>
    );
  };

export default OurCoachCard;
