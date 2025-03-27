import styled from 'styled-components';

export const StyledProfileCard = styled.div`
  margin-bottom: 16px;
`;

export const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.secWhite};
  margin-top: ${({ theme }) => `${theme.pxs.x0}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;
