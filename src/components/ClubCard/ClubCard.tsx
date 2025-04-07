import { FC } from 'react';
import { Button, Icon, IconName, Main, Small } from '@/kit';
import { t } from 'i18next';
import {
  ClubCardBox,
  ClubDetail,
  ClubImage,
  ClubInfo,
  InfoWrap,
} from './styles';
import { ClubData } from '../../types';

type Props = {
  clubData: ClubData;
};

export const ClubCard: FC<Props> = ({ clubData }) => {
  const { avatar, firstName, description } = clubData;
  const shortDays = description.schedule
    .flatMap(item => item.days.split(',')) // ['Monday', ' Wednesday']
    .map(day => day.trim().slice(0, 2)) // ['Mo', 'We']
    .join(', ');
  return (
    <ClubCardBox>
      <ClubImage src={avatar} alt="coach image" />
      <ClubInfo>
        <InfoWrap>
          <Main>{firstName}</Main>
          <Small>Тренажерна зала</Small>
        </InfoWrap>
        <InfoWrap>
          <Small>20 відгуків</Small>
        </InfoWrap>
      </ClubInfo>
      <ClubDetail>
        <Small>
          <Icon name={IconName.LOCATION} /> 1.9км
        </Small>

        <Small>
          <Icon name={IconName.STAR_DEFAULT} />
          {shortDays}
        </Small>
      </ClubDetail>
      <Button testId="Детальніше" title={t('more_details')} />
    </ClubCardBox>
  );
};
