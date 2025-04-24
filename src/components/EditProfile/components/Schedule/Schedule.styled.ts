import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 12px;
  background-color: transparent;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: max-content;
  padding-bottom: 80px;
  @media screen and (min-width: 320px) {
    width: 320px;
  }
`;

export const ScheduleContainer = styled.div`
  background-color: transparent;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: max-content;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  align-items: center;
  margin-bottom: 34px;
`;

export const ButtonList = styled.ul`
  display: flex;
  background-color: #303030;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const ButtonListItem = styled.li`
  margin: 0;
  border-radius: 4px;
`;

export const StyledCalendar = styled(Calendar)<{ view: string }>`
  border-radius: 8px;
  background-color: transparent;

  .rbc-time-view .rbc-row {
    @media screen and (min-width: 320px) {
      width: 100%;
      display: flex;
      gap: 4px;
      justify-content: center;
    }
  }

  .rbc-time-header-content {
    border: none;
  }

  .rbc-time-view {
    display: flex;
    flex-direction: column;
    border: none;
    position: ${({ view }) => (view === 'day' ? 'relative' : 'static')};

    @media screen and (min-width: 320px) {
      width: 100%;
    }
  }

  .rbc-time-content {
    display: ${({ view }) => (view === 'week' ? 'none' : 'flex')};
    width: 100%;
  }
  .rbc-label {
    width: ${({ view }) => (view === 'week' ? '0' : '100%')};
    display: ${({ view }) => (view === 'week' ? 'none' : 'block')};
  }
  .rbc-month-view {
    border: none;
  }

  .rbc-month-header {
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 14px;
    color: #b7b7b9;
  }
  .rbc-month-row {
    overflow: visible;
    border: none;
  }

  .rbc-header {
    border: none;
    max-width: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    padding: 6px 0;
  }

  .rbc-time-view .rbc-allday-cell {
    display: ${({ view }) => (view === 'week' ? 'none' : 'flex')};
  }
  .rbc-header.rbc-today {
    position: ${({ view }) => (view === 'day' ? 'absolute' : 'static')};
    top: ${({ view }) => (view === 'day' ? '0' : 'auto')};
    left: ${({ view }) => (view === 'day' ? '40%' : 'auto')};
  }
  .rbc-time-header {
    display: ${({ view }) => (view === 'day' ? 'none' : 'block')};
  }

  .rbc-today {
    background-color: ${({ view }) =>
      view === 'month' ? '#ed772f' : 'transparent'};
    border-radius: 100%;
    color: #f8f7f4;
  }
  .rbc-row {
    gap: 12px;
  }

  .rbc-date-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 32px;
    height: 32px;
    flex: none;
    color: #b7b7b9;
    font-weight: 400;
    font-size: 14px;
  }

  .rbc-now {
    background-color: #ed772f;
    border-radius: 100%;
    color: #f8f7f4;
  }
  .rbc-day-slot .rbc-events-container {
    width: 40%;
  }
  .rbc-row-bg {
    display: none;
  }
`;

export const InputsBeginEnd = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const FormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DayCell = styled.div<{ isSelected?: boolean }>`
  background-color: ${({ isSelected }) =>
    isSelected ? '#E0F7FA' : 'transparent'};
  border-radius: ${({ isSelected }) => (isSelected ? '8px' : '0')};
  width: 100%;
  height: 100%;
  border: ${({ isSelected }) => (isSelected ? '2px solid #00796B' : 'none')};
`;
