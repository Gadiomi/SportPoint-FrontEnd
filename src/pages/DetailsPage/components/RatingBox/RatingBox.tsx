import React from 'react';
import { Icon, IconName } from '@/kit';
import { fonts } from '@/theme/fonts';
import {
  StyledRatingBox,
  RatingBoxContainer,
  Rating,
  IconWrapper,
  CountReview,
  SpanCountReview,
  RatingSpan,
} from './styles';

interface RatingBoxProps {
  iconNames: IconName[];
  rating: number | undefined;
  counts: number[] | undefined;
  containerStyles?: React.CSSProperties;
  ratingStyles?: React.CSSProperties;
  iconWrapperStyles?: React.CSSProperties;
  textStyles?: React.CSSProperties;
  spanStyles?: React.CSSProperties;
  iconStyles?: React.CSSProperties;
}

const RatingBox: React.FC<RatingBoxProps> = ({
  iconNames,
  rating,
  counts,
  containerStyles,
  ratingStyles,
  iconWrapperStyles,
  spanStyles,
  iconStyles,
}) => {
  return (
    <StyledRatingBox style={containerStyles}>
      <RatingBoxContainer>
        <Rating style={ratingStyles}>
          {iconNames.map(iconName => (
            <IconWrapper key={iconName} style={iconWrapperStyles}>
              <RatingSpan style={spanStyles}>{rating}</RatingSpan>
              <Icon
                name={iconName}
                styles={{
                  width: iconStyles?.width,
                  height: iconStyles?.height,
                  fill: iconStyles?.fill,
                  color: iconStyles?.color,
                }}
              />
            </IconWrapper>
          ))}
        </Rating>
        <CountReview style={fonts.smallText}>
          {counts}
          <SpanCountReview>відгуки</SpanCountReview>
        </CountReview>
      </RatingBoxContainer>
    </StyledRatingBox>
  );
};

export default RatingBox;
