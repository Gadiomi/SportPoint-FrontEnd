import styled from 'styled-components';

export const StyledGalleryCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};

  &.single-slide .swiper-wrapper {
    justify-content: center;
  }
`;

export const SwiperImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  max-width: 100%;
  max-height: 100%;
`;

export const FullScreenImage = styled.img`
  width: 70%;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  border-radius: 12px;
`;

export const NavigationButtonPrev = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%) rotate(90deg);
  border: none;
  cursor: pointer;
  z-index: 1001;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const NavigationButtonNext = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%) rotate(270deg);
  border: none;
  cursor: pointer;
  z-index: 1001;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;
