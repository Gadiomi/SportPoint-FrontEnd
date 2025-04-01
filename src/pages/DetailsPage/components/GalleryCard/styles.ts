import styled from 'styled-components';

export const StyledGalleryCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => `${theme.pxs.x2}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
`;

export const SwiperImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;
