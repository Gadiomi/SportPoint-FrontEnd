import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import { useTranslation } from 'react-i18next';
import { IconName, ButtonAppearance } from '@/kit';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import TitleContainer from '../TitleContainer/TitleContainer';
import RatingBox from '../RatingBox/RatingBox';
import ButtonProfileIcon from '../ButtonProfileIcon/ButtonProfileIcon';
import { useFavoritesMap } from '@/hooks/useFavoritesMap';

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
  id: string;
  firstName: string;
  lastName: string;
}

interface WorksInCardProps {
  clubs: Club[];
  _id: string;
  role: string;
  isLogin: boolean;
  iconNames: IconName[];
  labels: string[];
  rating?: number;
  counts?: number[];
}

const WorksInCard: React.FC<WorksInCardProps> = ({
  clubs,
  role,
  isLogin,
  iconNames = [],
  labels = [],
  rating,
  counts,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleMoreDetailsClick = (id: string) => {
    if (id) {
      navigate(`/clubs/club/${id}`);
    }
  };

  const ids = useMemo(() => clubs.map(club => club.id), [clubs]);

  const { favoritesMap, toggleFavorite } = useFavoritesMap({
    ids,
    role,
    isLogin,
  });

  return (
    <StyledWorksInCard>
      <WorksInContainer>
        <TitleContainer titleKey="details_page.works_in" />
        {clubs.map(club => {
          console.log('ID клубу:', club.id);
          return (
            <WorksInWrapper key={club.id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ width: '100px' }}>
                  <Name style={fonts.editButton}>{club.firstName}</Name>
                  <Description
                    style={{
                      ...fonts.descriptionWorkIn,
                      color: theme.color.secWhite,
                    }}
                  >
                    Спортивний клуб
                  </Description>
                </div>
                <div style={{ width: '50px', justifyContent: 'center' }}>
                  <RatingBox
                    iconNames={[IconName.STAR_DEFAULT]}
                    rating={rating}
                    counts={counts}
                    containerStyles={{
                      marginRight: `${theme.pxs.x7}px`,
                    }}
                    iconStyles={{
                      width: `${theme.pxs.x4_5}px`,
                      height: `${theme.pxs.x4_5}px`,
                      justifyContent: 'center',
                    }}
                    spanStyles={fonts.mainManrope}
                  />
                </div>
                <ButtonProfileIcon
                  appearance={ButtonAppearance.UNDERLINED}
                  style={{
                    width: '24px',
                    color: '#EC4033',
                  }}
                  iconName={
                    favoritesMap[club.id]
                      ? IconName.HEART_FILL
                      : IconName.HEART_NONE
                  }
                  text=""
                  onClick={() => toggleFavorite(club.id)}
                  iconStyle={{
                    fill: favoritesMap[club.id] ? '#EC4033' : 'transparent',
                  }}
                />
              </div>

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
                onClick={() => handleMoreDetailsClick(club.id)}
                textStyle={{ ...fonts.spanDetails, color: theme.color.white }}
              />
            </WorksInWrapper>
          );
        })}
      </WorksInContainer>
      <StyledHr style={{ marginBottom: '32px' }} />
    </StyledWorksInCard>
  );
};

export default WorksInCard;
