import styled from 'styled-components';

export const StyledReviewDetailsCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => `${theme.pxs.x2}px`};
`;

export const ProgressBarBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
  justify-content: start;
  align-items: center;
`;

export const ProgressSpan = styled.div`
  width: 10px;
`;
