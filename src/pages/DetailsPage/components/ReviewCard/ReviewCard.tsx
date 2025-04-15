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
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  iconNames,
  counts,
  labels,
}) => {
  const theme = useTheme();
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
              <SpanCounts style={fonts.spanDetails}>{counts[index]}</SpanCounts>
            </IconContainer>
          </IconWrapper>
        ))}
      </StyledReview>

      <StyledHr style={{ marginBottom: '32px' }} />
    </StyledReviewCard>
  );
};

export default ReviewCard;
