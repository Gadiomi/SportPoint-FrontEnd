import styled from 'styled-components';

export const StyledSocialLinksCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => `${theme.pxs.x8}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;
