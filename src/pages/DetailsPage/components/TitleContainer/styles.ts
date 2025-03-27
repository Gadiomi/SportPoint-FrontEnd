import styled from 'styled-components';

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
`;
