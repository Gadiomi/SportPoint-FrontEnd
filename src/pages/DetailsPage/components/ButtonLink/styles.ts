import styled from 'styled-components';

export const StyledButtonLink = styled.button`
  color: ${({ theme }) => theme.color.white};
  text-decoration: underline;
  // margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
  &:hover {
    color: ${({ theme }) => theme.color.mainOrange};
  }
`;
