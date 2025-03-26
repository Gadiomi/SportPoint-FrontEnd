import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName, ButtonAppearance, ButtonTypogr } from '@/kit';
import {
  StyledWorksInCard,
  WorksInContainer,
  IconContainer,
  Title,
  WorksInWrapper,
  IconTextWrapper,
  IconWrapper,
  StyledIcon,
  StyledButton,
  StyledLink,
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
        <IconContainer>
          <Icon
            name={IconName.ARROW_RIGHT}
            styles={{
              left: '12px',
              fill: 'none',
              width: '32px',
              height: '32px',
            }}
          />
          <Title>{t('details_page.works_in')}</Title>
        </IconContainer>
        <WorksInWrapper>
          <h3>Sport Life</h3>
          <p>Спортивний клуб</p>
          <IconTextWrapper>
            {iconNames.map((iconName, index) => (
              <IconWrapper key={iconName}>
                <IconContainer>
                  <StyledIcon
                    name={iconName}
                    styles={{
                      color: 'currentColor',
                      // fill: 'none',
                      // fill: 'transparent',
                      // stroke: 'transparent',
                    }}
                  />
                  <span>{labels[index]}</span>
                </IconContainer>
              </IconWrapper>
            ))}
          </IconTextWrapper>
        </WorksInWrapper>
        <StyledButton
          testId="details_page.edit_button"
          title={t('details_page.more_details')}
          appearance={ButtonAppearance.PRIMARY}
        >
          <ButtonTypogr>{t('details_page.more_details')}</ButtonTypogr>
        </StyledButton>
      </WorksInContainer>
      <StyledLink href="#">{t('details_page.see_more')}</StyledLink>
    </StyledWorksInCard>
  );
};

export default WorksInCard;
