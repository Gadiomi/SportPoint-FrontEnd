import styled from 'styled-components';
// --- for example ! ---
export const ExampleBlock = styled.div`
  position: relative;
  & div {
    position: absolute;
    top: 11px;
    right: 6px;
    cursor: pointer;
  }
`;

export const LogoBox = styled.div(({ theme }) => ({
  margin: ' 0 auto',
  marginBottom: theme.pxs.x5,
}));
