import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import { useTranslation } from 'react-i18next';
import { IconName, ButtonAppearance } from '@/kit';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import TitleContainer from '../TitleContainer/TitleContainer';

import {
  StyledWorksInCard,
  WorksInContainer,
  IconContainer,
  WorksInWrapper,
  Name,
  Description,
  IconTextWrapper,
  IconWrapper,
  StyledIcon,
  SpanWorkIn,
  StyledButton,
} from './styles';

interface Club {
  _id: string;
  firstName: string;
  lastName: string;
}

interface WorksInCardProps {
  clubs: Club[];
  iconNames: IconName[];
  labels: string[];
}

const WorksInCard: React.FC<WorksInCardProps> = ({
  clubs,
  iconNames = [],
  labels = [],
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  // const handleMoreDetailsClick = () => {
  //   if (club._id) {
  //     navigate(`/club/${club._id}`);
  //   }
  // };

  return (
    <StyledWorksInCard>
      <WorksInContainer>
        <TitleContainer titleKey="details_page.works_in" />
        {clubs.map(club => (
          <WorksInWrapper key={club._id}>
            <Name style={fonts.editButton}>{club.firstName}</Name>
            <Description
              style={{
                ...fonts.descriptionWorkIn,
                color: theme.color.secWhite,
              }}
            >
              Спортивний клуб
            </Description>

            <IconTextWrapper>
              {iconNames.map((iconName, index) => {
                const iconStyles = index === 1 ? { fill: '#F8F7F4' } : {};

                return (
                  <IconWrapper key={iconName}>
                    <IconContainer>
                      <StyledIcon name={iconName} styles={iconStyles} />
                      <SpanWorkIn
                        style={{
                          ...fonts.spanWorkIn,
                          color: theme.color.secWhite,
                        }}
                      >
                        {labels[index]}
                      </SpanWorkIn>
                    </IconContainer>
                  </IconWrapper>
                );
              })}
            </IconTextWrapper>

            <StyledButton
              testId="details_page.edit_button"
              title={t('details_page.more_details')}
              appearance={ButtonAppearance.PRIMARY}
              // onClick={handleMoreDetailsClick}
              textStyle={{ ...fonts.spanDetails, color: theme.color.white }}
            />
          </WorksInWrapper>
        ))}
      </WorksInContainer>
      <StyledHr style={{ marginBottom: '32px' }} />
    </StyledWorksInCard>
  );
};

export default WorksInCard;
