import styled from 'styled-components';

export const StyledReviewDetailsCard = styled.div`
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

export const ReviewDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;
