import styled from 'styled-components';

export const ButtonBackStyle = styled.button`
  width: 100%;
  height: ${({ theme }) => `${theme.pxs.x10}px`};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${({ theme }) => `${theme.pxs.x4}px`};
  padding-left: ${({ theme }) => `${theme.pxs.x2_5}px`};
  padding-right: ${({ theme }) => `${theme.pxs.x6_5}px`};
`;
