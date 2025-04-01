import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import { useTranslation } from 'react-i18next';
import { IconName, ButtonAppearance } from '@/kit';
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

interface WorksInCardProps {
  clubsName: string | null;
  clubId: string | null;
  iconNames: IconName[];
  labels: string[];
}

const WorksInCard: React.FC<WorksInCardProps> = ({
  clubsName,
  clubId,
  iconNames = [],
  labels = [],
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleMoreDetailsClick = () => {
    if (clubId) {
      navigate(`/club/${clubId}`);
    }
  };

  return (
    <StyledWorksInCard>
      <WorksInContainer>
        <TitleContainer titleKey="details_page.works_in" />
        <WorksInWrapper>
          <Name style={fonts.editButton}>{clubsName}</Name>
          <Description
            style={{ ...fonts.descriptionWorkIn, color: theme.color.secWhite }}
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
            onClick={handleMoreDetailsClick}
            textStyle={{ ...fonts.spanDetails, color: theme.color.white }}
          ></StyledButton>
        </WorksInWrapper>
      </WorksInContainer>
    </StyledWorksInCard>
  );
};

export default WorksInCard;
