import styled from 'styled-components';

export const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(28, 27, 32, 0.8);
  z-index: 1200;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 370px;
  max-height: 100%;
  padding: ${({ theme }) => theme.pxs.x2_5}px;
  border: 2px solid #ed772f;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.background};
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: ${({ theme }) => theme.pxs.x2}px;
  margin-bottom: ${({ theme }) => theme.pxs.x5}px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.pxs.x0}px;
  top: ${({ theme }) => theme.pxs.x0}px;
`;

export const ModalContent = styled.div`
  padding: ${({ theme }) => theme.pxs.x2_5}px;
  & p {
    margin-bottom: ${({ theme }) => theme.pxs.x2}px;
    text-align: center;
  }
`;
