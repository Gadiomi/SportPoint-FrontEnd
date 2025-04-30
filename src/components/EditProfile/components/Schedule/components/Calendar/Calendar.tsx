import React from 'react';
import { View } from 'react-big-calendar';
import { CustomContainer, StyledCalendar } from '../../Schedule.styled';
import uaMessages from '../uaMessages';
import CustomToolbar from '../CustomToolbar/CustomToolbar';
import schedule from '../../../../data/schedule.json';
import CustomHeader from '../CustomHeader/CustomHeader';
import CustomDateCellWrapper from '../CustomDateCellWrapper/CustomDateCellWrapper';

interface CalendarProps {
  handleNavigate: (newDate: Date) => void;
  localizer: any;
  selectedDay: Date | null;
  view: View;
  setView: (view: View) => void;
  handleDrillDown: (date: Date) => void;
  preventViewChange: () => boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  handleNavigate,
  localizer,
  selectedDay,
  view,
  setView,
  handleDrillDown,
  preventViewChange,
}) => {
  return (
    <div>
      <StyledCalendar
        onNavigate={handleNavigate}
        culture="uk"
        localizer={localizer}
        messages={uaMessages}
        date={selectedDay || new Date()}
        view={view}
        onView={setView}
        selectable
        onDrillDown={handleDrillDown}
        onSelecting={preventViewChange}
        dayPropGetter={date => {
          const isSelected =
            selectedDay &&
            date.getDate() === selectedDay.getDate() &&
            date.getMonth() === selectedDay.getMonth() &&
            date.getFullYear() === selectedDay.getFullYear();

          return {
            style: {
              backgroundColor: isSelected ? '#ed772f' : 'transparent',
              borderRadius: isSelected ? '8px' : undefined,
            },
          };
        }}
        components={{
          toolbar: props => (
            <CustomContainer>
              <CustomToolbar
                onView={props.onView}
                schedule={schedule}
                activeView={view}
              />
              <CustomHeader
                date={props.date}
                view={props.view}
                onNavigate={props.onNavigate}
              />
            </CustomContainer>
          ),
          week: {
            header: CustomDateCellWrapper,
          },
        }}
      />
    </div>
  );
};

export default Calendar;
