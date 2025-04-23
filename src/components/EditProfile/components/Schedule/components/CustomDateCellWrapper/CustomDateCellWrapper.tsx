import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import {
  DayContainer,
  StyledDate,
  StyledDateNow,
  StyledWeeksName,
} from './CustomDateCellWrapper.styled';

const CustomDateCell = ({ date }: { date: Date }) => {
  const isToday =
    format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return isToday ? (
    <StyledDateNow>{format(date, 'dd')}</StyledDateNow>
  ) : (
    <StyledDate>{format(date, 'dd')}</StyledDate>
  );
};

const CustomDateCellWrapper = ({ date }: { date: Date }) => {
  const weekday = format(date, 'iii', { locale: uk }).slice(0, 2);
  return (
    <DayContainer>
      <StyledWeeksName>{weekday}</StyledWeeksName>
      <CustomDateCell date={date} />
    </DayContainer>
  );
};

export default CustomDateCellWrapper;
