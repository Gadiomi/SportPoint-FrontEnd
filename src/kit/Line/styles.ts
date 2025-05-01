import styled from 'styled-components';

export const LineDiv = styled.div<{ $bottom?: string; $top?: string }>`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.pxs.x8}px;
  border-bottom: 1px solid ${({ theme }) => theme.color.secWhite};
  margin-bottom: ${({ $bottom }) => $bottom};
  padding-top: ${({ $top }) => $top};
`;
