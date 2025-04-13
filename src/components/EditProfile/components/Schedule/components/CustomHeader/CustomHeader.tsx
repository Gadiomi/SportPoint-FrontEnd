import moment from 'moment';
import { ButtonsContainer, NavContainer } from './CustomHeader.styled';
import { View } from 'react-big-calendar';

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
    const startOfWeek = moment(date).startOf('week').format('MMMM D');
    const endOfWeek = moment(date).endOf('week').format('D, YYYY');

    return (
      <NavContainer>
        {`${startOfWeek} - ${endOfWeek}`}
        <ButtonsContainer>
          <button type="button" onClick={() => onNavigate('PREV')}>
            ◀︎
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}>
            ▶︎
          </button>
        </ButtonsContainer>
      </NavContainer>
    );
  }

  if (view === 'day') {
    const currentDay = moment(date).format('MMMM D, YYYY');

    return (
      <NavContainer>
        {currentDay}
        <ButtonsContainer>
          <button type="button" onClick={() => onNavigate('PREV')}>
            ◀︎
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}>
            ▶︎
          </button>
        </ButtonsContainer>
      </NavContainer>
    );
  }

  return null;
};
export default CustomHeader;
