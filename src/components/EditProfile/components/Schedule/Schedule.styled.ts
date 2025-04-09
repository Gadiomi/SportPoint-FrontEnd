import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';

export const ScheduleContainer = styled.div`
  padding: 20px;
  background-color: transparent;
  border-radius: 8px;
  height: auto;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ButtonList = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ButtonListItem = styled.li`
  margin: 0;
`;

export const StyledCalendar = styled(Calendar)`
  border-radius: 8px;
  background-color: transparent;

  .rbc-time-header-content {
    border: none;
    position: absolute;
  }
  .rbc-calendar {
    position: relative;
  }
  .rbc-time-view {
    display: flex;
    flex-direction: column;
    height: max-content;
    border: none;
  }

  .rbc-time-content {
    display: none;
  }

  .rbc-header {
    border: none;
    width: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px 0;
  }

  .rbc-time-view .rbc-allday-cell {
    display: none;
  }
`;
