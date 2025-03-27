import styled from 'styled-components';

export const StyledProfileCard = styled.div`
  margin-bottom: ${({ theme }) => `${theme.pxs.x4}px`};
`;

export const StyledReviewCard = styled.hr`
  width: 100%;
  position: relative;
  margin-top: ${({ theme }) => `${theme.pxs.x4}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;
