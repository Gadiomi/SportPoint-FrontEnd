import styled from 'styled-components';

export const Link = styled.a`
  color: ${({ theme }) => theme.color.white};
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
  &:hover {
    color: ${({ theme }) => theme.color.mainOrange};
  }
`;
