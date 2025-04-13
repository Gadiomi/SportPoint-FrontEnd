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

export const StyledCalendar = styled(Calendar)<{ view: string }>`
  border-radius: 8px;
  background-color: transparent;

  .rbc-time-header-content {
    border: none;
    position: absolute;
  }

  .rbc-time-view {
    display: flex;
    flex-direction: column;
    height: max-content;
    border: none;
  }

  .rbc-time-content {
    display: ${({ view }) => (view === 'week' ? 'none' : 'flex')};
  }
  .rbc-month-view {
    border: none;
  }
  .rbc-month-row {
    overflow: visible;
  }

  .rbc-header {
    border: none;
    width: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6px 0;
  }

  .rbc-time-view .rbc-allday-cell {
    display: ${({ view }) => (view === 'week' ? 'none' : 'flex')};
  }

  .rbc-date-cell.rbc-now {
    background-color: transparent;
    color: #000;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
