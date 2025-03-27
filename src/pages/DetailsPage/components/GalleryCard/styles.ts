import styled from 'styled-components';

export const StyledGalleryCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => `${theme.pxs.x2}px`};
`;
