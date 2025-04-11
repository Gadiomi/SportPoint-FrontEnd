import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: ${({ theme }) => `${theme.pxs.x0}px`};
  left: ${({ theme }) => `${theme.pxs.x0}px`};
  right: ${({ theme }) => `${theme.pxs.x0}px`};
  bottom: ${({ theme }) => `${theme.pxs.x0}px`};
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.background};
  padding: ${({ theme }) => `${theme.pxs.x4}px`};
  border-radius: ${({ theme }) => `${theme.pxs.x1_5}px`};
  width: 275px;
`;

export const ModalHeader = styled.h2`
  width: 168px;
  color: ${({ theme }) => theme.color.secWhite};
`;

export const ModalContent = styled.div`
  margin: ${({ theme }) => `${theme.pxs.x6}px ${theme.pxs.x0}px`};
  text-align: center;
`;

export const ModalFooter = styled.div`
  text-align: center;
  display: flex;
  gap: ${({ theme }) => `${theme.pxs.x6}px`};
`;
