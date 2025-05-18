import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const ListItem = styled.li`
  background-color: rgba(48, 48, 48, 1);
  box-shadow: 0px 0px 6px 1px rgba(43, 54, 149, 0.9);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
`;
export const TitleAndButtons = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  div {
    display: flex;
    width: max-content;
  }
`;

export const TimeAndDateStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;

  div {
    display: flex;
    gap: 4px;
  }
`;
export const AccentSpan = styled.span`
  color: #b7b7b9;
`;

export const GymStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 8px;
  img {
    border-radius: 100%;
    width: 48px;
    height: 48px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;

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
