import React from 'react';
import { Icon, IconName } from '@/kit';
import { Summary, CountReviews } from './styles';

interface AverageRatingProps {
  averageRating: number;
  totalReviews: number;
}

const AverageRating: React.FC<AverageRatingProps> = ({
  averageRating,
  totalReviews,
}) => {
  return (
    <div>
      <Summary>
        <strong>{averageRating.toFixed(1)}</strong>
        <Icon
          name={IconName.STAR_FILL}
          styles={{ fill: '#ED772F', color: 'transparent' }}
          size={20}
        />
      </Summary>
      <CountReviews>{totalReviews} відгуки</CountReviews>
    </div>
  );
};

export default AverageRating;
