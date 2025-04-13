import {
  ButtonListItem,
  ButtonList,
  ToolbarContainer,
} from '../../Schedule.styled';
import { View } from 'react-big-calendar';
import { ButtonItem } from './CustomToolbar.styled';

interface Schedule {
  buttons: {
    day: string;
    week: string;
    month: string;
  };
}

const CustomToolbar = ({
  onNavigate,
  onView,
  schedule,
  activeView,
}: {
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY', date?: Date) => void;
  onView: (view: View) => void;
  schedule: Schedule;
  activeView: View;
}) => (
  <ToolbarContainer>
    <ButtonList>
      {Object.entries(schedule.buttons).map(([key, value], index) => (
        <ButtonListItem key={index}>
          <ButtonItem
            isActive={activeView === key}
            type="button"
            onClick={() => {
              if (key === 'day') {
                onNavigate('TODAY');
                onView('day');
              } else if (key === 'week') {
                onView('week');
              } else if (key === 'month') {
                onView('month');
              }
            }}
          >
            {value}
          </ButtonItem>
        </ButtonListItem>
      ))}
    </ButtonList>
  </ToolbarContainer>
);

export default CustomToolbar;
