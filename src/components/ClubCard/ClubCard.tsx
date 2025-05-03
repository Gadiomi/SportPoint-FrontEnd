import { FC } from 'react';
import { Button, Icon, IconName, Main, Small } from '@/kit';
import { t } from 'i18next';
import {
  ClubCardBox,
  ClubDetail,
  ClubImage,
  ClubInfo,
  HeartButton,
  IconWrap,
  IconWrapRating,
  InfoWrap,
  InfoWrapReviews,
  LightText,
  RatingText,
} from './styles';
import { ClubData } from '../../types';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fonts } from '@/theme/fonts';

type Props = {
  clubData: ClubData;
};

export const ClubCard: FC<Props> = ({ clubData }) => {
  const { avatar, _id, firstName, description, countReview, rating } = clubData;

  const shortDays = description?.schedule
    ? description.schedule
        .flatMap(item => item.days.split(','))
        .map(day => day.trim().slice(0, 2))
        .join(', ')
    : '-';
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <ClubCardBox>
      <ClubImage image={avatar} />
      <HeartButton>
        <Icon name={IconName.HEART_NONE} size={24} />
      </HeartButton>
      <ClubInfo>
        <InfoWrap>
          <Main style={{ fontWeight: '500' }}>{firstName}</Main>
          <LightText style={{ fontWeight: '400' }}>{t('gym')}</LightText>
        </InfoWrap>
        <InfoWrapReviews>
          <IconWrapRating>
            <RatingText>{rating}</RatingText>
            <Icon
              styles={{ color: theme.color.white }}
              name={IconName.STAR_FILL}
              size={18}
            />
          </IconWrapRating>
          <Small style={{ color: theme.color.disabled }}>
            {countReview} {t('home_page.reviews')}
          </Small>
        </InfoWrapReviews>
      </ClubInfo>
      <ClubDetail>
        <IconWrap>
          <Icon
            styles={{ color: theme.color.disabled }}
            name={IconName.LOCATION}
          />
          <LightText style={{ marginLeft: '0px' }}>1.9км</LightText>
        </IconWrap>
        <IconWrap>
          <Icon
            styles={{ color: theme.color.disabled, fill: theme.color.disabled }}
            name={IconName.CLOCK}
          />
          {shortDays ? (
            <LightText>{shortDays}</LightText>
          ) : (
            <LightText>-</LightText>
          )}
        </IconWrap>
      </ClubDetail>
      <Button
        testId="details"
        title={t('more_details')}
        style={{
          ...fonts.secondManrope,
          width: '100%',
          padding: theme.pxs.x1_5,
        }}
        onClick={() => navigate(`club/${_id}`)}
      />
    </ClubCardBox>
  );
};
