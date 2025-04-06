import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  //   background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  //   background-color: rgba(0, 0, 0, 0.5);
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;
