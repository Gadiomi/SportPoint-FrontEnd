import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleDate = styled.div`
  display: flex;
  width: max-content;
  gap: 8px;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    width: max-content;
  }

  &::after {
    content: '';
    width: 2px;
    height: 100%;
    background-color: #294487;
    transition: background-color linear 250ms;
  }
`;

export const ListItem = styled.li`
  background-color: rgba(48, 48, 48, 1);
  box-shadow: 0px 0px 6px 1px rgba(43, 54, 149, 0.9);
  border-radius: 6px;
  display: flex;
  padding: 8px;
  gap: 8px;
  transition: background-color linear 250ms;

  &:hover {
    background-color: #494949;
  }

  &:hover ${TitleDate}::after {
    background-color: #ed772f;
  }
`;

export const GymAndButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TimeAndDateStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export const WeekDay = styled.span`
  color: #b7b7b9;
`;

export const DateAndMonthContainer = styled.span`
  display: flex;
  flex-direction: column;
`;

export const AccentSpan = styled.span`
  color: #b7b7b9;
  display: flex;
`;

export const GymStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 6px;
  span {
    text-transform: capitalize;
  }
  div {
    margin-top: 2px;
  }
`;

export const ServiceStyle = styled.span`
  text-align: start;
  color: #f8f7f4;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  gap: 8px;
  align-items: center;
  span {
    text-transform: lowercase;
    color: #b7b7b9;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    align-items: center;
  }
`;

export const GymNameAndPlaceStyle = styled.span`
  display: flex;
  flex-direction: column;
  color: #b7b7b9;
  font-size: 14px;
  font-weight: 400;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  width: max-content;

  button {
    display: flex;
    align-items: center;
    gap: 4px;
    background: transparent;
    border: none;
    cursor: pointer;

    svg {
      transition: stroke linear 250ms;
    }

    &:hover svg {
      stroke: #ed772f;
    }

    &:hover span {
      color: #ed772f;
    }
  }
`;
