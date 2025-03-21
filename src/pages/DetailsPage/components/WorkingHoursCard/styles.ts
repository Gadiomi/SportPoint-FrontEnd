import styled from 'styled-components';

export const StyledWorkingHoursCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => `${theme.pxs.x2}px`};
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.mainTitle};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;

export const WorkingHoursContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;

export const WorkingHoursDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const WorkingHoursDays = styled.div`
  display: flex;
  align-items: center;
  width: 92px;
  margin-right: ${({ theme }) => `${theme.pxs.x11}px`};
`;

export const WorkingHoursHours = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-left: auto;
  justify-content: flex-end;
  text-align: right;
`;
