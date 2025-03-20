import React from 'react';
import { IconName } from '@/kit';
import {
  StyledReviewCard,
  IconWrapper,
  IconContainer,
  StyledIcon,
} from './styles';

interface ReviewCardProps {
  iconNames: IconName[];
  counts: number[];
  labels: string[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  iconNames,
  counts,
  labels,
}) => {
  return (
    <StyledReviewCard>
      {iconNames.map((iconName, index) => (
        <IconWrapper key={iconName}>
          <span>{labels[index]}</span>
          <IconContainer>
            <StyledIcon
              name={iconName}
              styles={{
                fill: 'none',
              }}
            />
            <span>{counts[index]}</span>
          </IconContainer>
        </IconWrapper>
      ))}
    </StyledReviewCard>
  );
};

export default ReviewCard;
