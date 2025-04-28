import {
  ButtonListItem,
  ButtonList,
  ToolbarContainer,
} from '../../Schedule.styled';
import { View } from 'react-big-calendar';
import { ButtonItem } from './CustomToolbar.styled';

interface Schedule {
  buttons: {
    week: string;
    month: string;
  };
}

const CustomToolbar = ({
  onView,
  schedule,
  activeView,
}: {
  onView: (view: View) => void;
  schedule: Schedule;
  activeView: View;
}) => (
  <ToolbarContainer>
    <ButtonList>
      {Object.entries(schedule.buttons)
        .filter(([key]) => key !== activeView)
        .map(([key, value], index) => (
          <ButtonListItem key={index}>
            <ButtonItem
              $isActive={false}
              type="button"
              onClick={() => onView(key as View)}
            >
              {value}
            </ButtonItem>
          </ButtonListItem>
        ))}
    </ButtonList>
  </ToolbarContainer>
);

export default CustomToolbar;
