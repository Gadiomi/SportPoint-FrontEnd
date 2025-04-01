import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconName, ButtonAppearance, ButtonTypogr } from '@/kit';
import TitleContainer from '../TitleContainer/TitleContainer';
import StyledLink from '../StyledLink/StyledLink';

import {
  StyledWorksInCard,
  WorksInContainer,
  IconContainer,
  WorksInWrapper,
  IconTextWrapper,
  IconWrapper,
  StyledIcon,
  StyledButton,
} from './styles';

interface WorksInCardProps {
  iconNames: IconName[];
  labels: string[];
}

const WorksInCard: React.FC<WorksInCardProps> = ({
  iconNames = [],
  labels = [],
}) => {
  const { t } = useTranslation();
  return (
    <StyledWorksInCard>
      <WorksInContainer>
        <TitleContainer titleKey="details_page.works_in" />
        <WorksInWrapper>
          <h3>Sport Life</h3>
          <p>Спортивний клуб</p>
          <IconTextWrapper>
            {iconNames.map((iconName, index) => {
              const iconStyles = index === 1 ? { fill: '#F8F7F4' } : {};

              return (
                <IconWrapper key={iconName}>
                  <IconContainer>
                    <StyledIcon name={iconName} styles={iconStyles} />
                    <span>{labels[index]}</span>
                  </IconContainer>
                </IconWrapper>
              );
            })}
          </IconTextWrapper>
          <StyledButton
            testId="details_page.edit_button"
            title={t('details_page.more_details')}
            appearance={ButtonAppearance.PRIMARY}
          >
            <ButtonTypogr>{t('details_page.more_details')}</ButtonTypogr>
          </StyledButton>
        </WorksInWrapper>
      </WorksInContainer>
      <StyledLink />
    </StyledWorksInCard>
  );
};

export default WorksInCard;
