import React from 'react';
import { IconName } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import {
  StyledReviewCard,
  StyledReview,
  IconWrapper,
  IconContainer,
  StyledIcon,
  SpanLabel,
  SpanCounts,
} from './styles';

interface ReviewCardProps {
  iconNames: IconName[];
  counts: (number | string | string[])[];
  labels: string[];
  isAdminClubPage?: boolean;
  isClubPage?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  iconNames,
  counts,
  labels,
  isAdminClubPage,
  isClubPage,
}) => {
  const theme = useTheme();

  const getYearWord = (num: number): string => {
    if (num === 0) {
      return 'років';
    }

    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'років';
    }

    if (lastDigit === 1) return 'рік';
    if (lastDigit >= 2 && lastDigit <= 4) return 'роки';

    return 'років';
  };

  return (
    <StyledReviewCard>
      <StyledReview>
        {iconNames.map((iconName, index) => (
          <IconWrapper key={iconName}>
            <SpanLabel
              style={{ ...fonts.addressDetails, color: theme.color.secWhite }}
            >
              {labels[index]}
            </SpanLabel>

            <IconContainer>
              <StyledIcon
                name={iconName}
                styles={{
                  fill: 'none',
                }}
              />
              {!isAdminClubPage && !isClubPage && (
                <SpanCounts style={fonts.spanDetails}>
                  {labels[index] === 'Досвід'
                    ? `${counts[index]} ${getYearWord(Number(counts[index]))}`
                    : String(counts[index])}
                </SpanCounts>
              )}
              {/* <SpanCounts style={fonts.spanDetails}>
                {index === 1 && typeof counts[index] === 'number'
                  ? `${counts[index]} ${getYearWord(counts[index] as number)}`
                  : counts[index]}
              </SpanCounts> */}
            </IconContainer>
          </IconWrapper>
        ))}
      </StyledReview>

      <StyledHr style={{ marginBottom: '32px' }} />
    </StyledReviewCard>
  );
};

export default ReviewCard;
