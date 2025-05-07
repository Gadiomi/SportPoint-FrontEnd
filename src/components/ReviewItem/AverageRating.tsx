import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import { Summary, CountReviews } from './styles';
import { useTheme } from 'styled-components';

interface AverageRatingProps {
  averageRating: number;
  totalReviews: number;
}

const AverageRating: React.FC<AverageRatingProps> = ({
  averageRating,
  totalReviews,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const translate: (key: string, options?: Record<string, any>) => string = t;

  return (
    <div>
      <Summary>
        <strong>{averageRating.toFixed(1)}</strong>
        <Icon
          name={IconName.STAR_FILL}
          styles={{ fill: theme.color.mainOrange, color: 'transparent' }}
          size={24}
        />
      </Summary>
      <CountReviews>
        {totalReviews} {translate('home_page.review')}
      </CountReviews>
    </div>
  );
};

export default AverageRating;
