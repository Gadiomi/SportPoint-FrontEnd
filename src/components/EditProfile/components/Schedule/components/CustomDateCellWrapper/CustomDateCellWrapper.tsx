import moment from 'moment';
import {
  DayContainer,
  StyledDate,
  StyledDateNow,
  StyledWeeksName,
} from './CustomDateCellWrapper.styled';

const CustomDateCell = ({ date }: { date: Date }) => {
  const isToday = moment(date).isSame(new Date(), 'day');

  return isToday ? (
    <StyledDateNow>{moment(date).format('DD')}</StyledDateNow>
  ) : (
    <StyledDate>{moment(date).format('DD')}</StyledDate>
  );
};
const CustomDateCellWrapper = ({ date }: { date: Date }) => {
  return (
    <DayContainer>
      <StyledWeeksName>{moment(date).format('ddd')}</StyledWeeksName>
      <CustomDateCell date={date} />
    </DayContainer>
  );
};
export default CustomDateCellWrapper;
