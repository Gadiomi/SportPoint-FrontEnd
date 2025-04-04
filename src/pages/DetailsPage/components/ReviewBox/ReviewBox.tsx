import React from 'react';
import { Icon, IconName, ButtonAppearance } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Card } from '@/kit/Typography';
import {
  StyledReviewsBox,
  ReviewsBoxContainer,
  ReviewsBoxWrapper,
  ReviewsBoxItem,
  Avatar,
  StyledIcon,
  StyledButton,
} from './styles';

interface ReviewsBoxProps {
  avatar?: string;
  firstName: string;
  lastName?: string;
  iconNames: IconName[];
  rating: number;
}

const ReviewsBox: React.FC<ReviewsBoxProps> = ({
  avatar,
  firstName,
  lastName,
  rating,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const roundedRating = Math.floor(rating);
      const isFilled = index < roundedRating;
      return (
        <StyledIcon
          key={index}
          name={IconName.STAR_FILL}
          styles={{
            fill: isFilled ? theme.color.mainOrange : theme.color.secWhite,
            color: isFilled ? theme.color.mainOrange : theme.color.secWhite,
          }}
        />
      );
    });
  };

  return (
    <StyledReviewsBox>
      <ReviewsBoxItem>
        <Avatar src={avatar} alt={firstName} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4px',
            justifyContent: 'flax-start',
          }}
        >
          <h4 style={fonts.secondManrope}>{firstName}</h4>
            <h4 style={fonts.secondManrope}>{lastName}</h4>
        </div>

        {renderStars()}
      </ReviewsBoxItem>
      <ReviewsBoxContainer>
        <Card
          style={{
            color: theme.color.white,
            marginBottom: '16px',
          }}
        >
          Відмінний тренер! 👏 Дуже уважний до деталей, допомагає правильно
          виконувати вправи та мотивує не здаватися. Завдяки його порадам я бачу
          реальні результати вже через кілька тижнів! Рекомендую всім, хто хоче
          ефективні тренування та підтримку. 💪
        </Card>
        <Card
          style={{
            color: theme.color.secWhite,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          Mar 09, 2025
        </Card>
      </ReviewsBoxContainer>
      <ReviewsBoxWrapper>
        <StyledButton
          testId="details_page.edit_button"
          title={t('details_page.complain')}
          appearance={ButtonAppearance.UNDERLINED}
          style={{
            color: theme.color.white,
            textDecoration: 'none',
            border: '0.5px solid rgba(237, 119, 47, 1)',
            ...fonts.secondManrope,
          }}
        ></StyledButton>
        <StyledButton
          testId="details_page.respond"
          title={t('details_page.respond')}
          appearance={ButtonAppearance.PRIMARY}
          prependChild={
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.MAIL}
            />
          }
          style={fonts.secondManrope}
        />
      </ReviewsBoxWrapper>
    </StyledReviewsBox>
  );
};

export default ReviewsBox;
