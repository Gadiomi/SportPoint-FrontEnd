import React from 'react';
import { IconName } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';
import TitleContainer from '../TitleContainer/TitleContainer';
import {
  StyledReviewDetailsCard,
  ProgressBarContainer,
  ProgressBarWrapper,
  ProgressBarBox,
  ProgressSpan,
} from './styles';
import RatingBox from '../RatingBox/RatingBox';
import ReviewsBox from '../ReviewBox/ReviewBox';
import { ProgressBar } from '@/kit/ProgressBar';

interface ReviewDetailsCardProps {
  iconNames: IconName[];
  rating: number;
  counts: number[];
  clientService: number;
  serviceQuality: number;
  priceQuality: number;
  location: number;
  cleanliness: number;
  avatar: string;

  firstName: string;
  containerStyles?: React.CSSProperties;
  progressBarStyles?: React.CSSProperties;
}

const ReviewDetailsCard: React.FC<ReviewDetailsCardProps> = ({
  rating,
  counts,
  clientService,
  serviceQuality,
  priceQuality,
  cleanliness,
  avatar,

  firstName,
}) => {
  const totalSteps = 5;

  const theme = useTheme();

  return (
    <StyledReviewDetailsCard>
      <TitleContainer titleKey="details_page.reviews" />
      <ProgressBarBox>
        <ProgressBarContainer>
          <ProgressBarWrapper>
            <ProgressSpan style={fonts.mainManrope}>4</ProgressSpan>
            <ProgressBar
              progressBarStyles={{
                background: theme.color.mainOrange,
              }}
              containerStyles={{
                background: theme.color.darkGray,
                margin: theme.pxs.x0,
                height: theme.pxs.x2,
                borderRadius: theme.pxs.x1,
                width: '194px',
              }}
              step={clientService}
              totalSteps={totalSteps}
            />
          </ProgressBarWrapper>

          <ProgressBarWrapper>
            <ProgressSpan style={fonts.mainManrope}>3</ProgressSpan>
            <ProgressBar
              progressBarStyles={{
                background: theme.color.mainOrange,
              }}
              containerStyles={{
                background: theme.color.darkGray,
                margin: theme.pxs.x0,
                height: theme.pxs.x2,
                borderRadius: theme.pxs.x1,
                width: '194px',
              }}
              step={serviceQuality}
              totalSteps={totalSteps}
            />
          </ProgressBarWrapper>

          <ProgressBarWrapper>
            <ProgressSpan style={fonts.mainManrope}>2</ProgressSpan>
            <ProgressBar
              progressBarStyles={{
                background: theme.color.mainOrange,
              }}
              containerStyles={{
                background: theme.color.darkGray,
                margin: theme.pxs.x0,
                height: theme.pxs.x2,
                borderRadius: theme.pxs.x1,
                width: '194px',
              }}
              step={priceQuality}
              totalSteps={totalSteps}
            />
          </ProgressBarWrapper>

          <ProgressBarWrapper>
            <ProgressSpan style={fonts.mainManrope}>1</ProgressSpan>
            <ProgressBar
              progressBarStyles={{
                background: theme.color.mainOrange,
              }}
              containerStyles={{
                background: theme.color.darkGray,
                marginTop: theme.pxs.x2,
                marginBottom: theme.pxs.x2,
                height: theme.pxs.x2,
                borderRadius: theme.pxs.x1,
                width: '194px',
              }}
              step={cleanliness}
              totalSteps={totalSteps}
            />
          </ProgressBarWrapper>
        </ProgressBarContainer>
        <RatingBox
          counts={counts}
          iconNames={[IconName.STAR_FILL]}
          rating={rating}
          iconStyles={{
            width: '24px',
            height: '24px',
            fill: theme.color.mainOrange,
            color: theme.color.mainOrange,
          }}
          spanStyles={fonts.mainTitle}
        />
      </ProgressBarBox>
      <ReviewsBox
        avatar={avatar}
        firstName={firstName}
        iconNames={[IconName.STAR_FILL]}
        rating={rating}
      />
    </StyledReviewDetailsCard>
  );
};

export default ReviewDetailsCard;
