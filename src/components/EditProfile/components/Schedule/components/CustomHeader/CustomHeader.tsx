import {
  ButtonsContainer,
  ButtonsHiddenText,
  NavContainer,
} from './CustomHeader.styled';
import { View } from 'react-big-calendar';
import { Icon, IconName } from '@/kit';

import { format, startOfWeek, endOfWeek } from 'date-fns';
import { uk } from 'date-fns/locale';

const CustomHeader = ({
  date,
  view,
  onNavigate,
}: {
  date: Date;
  view: View;
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY', date?: Date) => void;
}) => {
  if (view === 'week') {
    const firstDayOfWeek = startOfWeek(date, { locale: uk });
    const lastDayOfWeek = endOfWeek(date, { locale: uk });

    const startOfWeekFormatted = format(firstDayOfWeek, 'd', {
      locale: uk,
    });
    const endOfWeekFormatted = format(lastDayOfWeek, 'd MMMM, yyyy', {
      locale: uk,
    });

    return (
      <NavContainer>
        <span>{`${startOfWeekFormatted} - ${endOfWeekFormatted}`}</span>

        <ButtonsContainer>
          <button type="button" onClick={() => onNavigate('PREV')}>
            <Icon
              height="12px"
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.LEFT_ANGLE_QUOTE}
            />
            <ButtonsHiddenText>Попередня</ButtonsHiddenText>
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}>
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              height="12px"
              name={IconName.RIGHT_ANGLE_QUOTE}
            />
            <ButtonsHiddenText>Наступна</ButtonsHiddenText>
          </button>
        </ButtonsContainer>
      </NavContainer>
    );
  }

  if (view === 'day') {
    const currentDay = format(date, 'd MMMM yyyy', { locale: uk });

    return (
      <NavContainer>
        <span>{currentDay}</span>
        <ButtonsContainer>
          <button type="button" onClick={() => onNavigate('PREV')}>
            <Icon
              height="12px"
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.LEFT_ANGLE_QUOTE}
            />
            <ButtonsHiddenText>Попередня</ButtonsHiddenText>
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}>
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              height="12px"
              name={IconName.RIGHT_ANGLE_QUOTE}
            />
            <ButtonsHiddenText>Наступна</ButtonsHiddenText>
          </button>
        </ButtonsContainer>
      </NavContainer>
    );
  }

  if (view === 'month') {
    const currentMonth = format(date, 'MMMM yyyy', { locale: uk });

    return (
      <NavContainer>
        <span>{currentMonth}</span>
        <ButtonsContainer>
          <button type="button" onClick={() => onNavigate('PREV')}>
            <Icon
              height="12px"
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              name={IconName.LEFT_ANGLE_QUOTE}
            />
            <ButtonsHiddenText>Попередній місяць</ButtonsHiddenText>
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}>
            <Icon
              styles={{
                color: 'currentColor',
                fill: 'transparent',
              }}
              height="12px"
              name={IconName.RIGHT_ANGLE_QUOTE}
            />
            <ButtonsHiddenText>Наступний місяць</ButtonsHiddenText>
          </button>
        </ButtonsContainer>
      </NavContainer>
    );
  }

  return null;
};

export default CustomHeader;
