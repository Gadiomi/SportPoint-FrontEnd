import React from 'react';
import styled from 'styled-components';
import { ModalType } from './constants';

interface ModalProps {
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ type, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>{getModalTitle(type)}</ModalHeader>
        <ModalContent>{children}</ModalContent>
        <ModalFooter>
          <button onClick={onClose}>Close</button>
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};

const getModalTitle = (type: ModalType) => {
  switch (type) {
    case ModalType.CONFIRMATION:
      return 'Confirmation';
    case ModalType.INFO:
      return 'Information';
    case ModalType.ERROR:
      return 'Error';
    default:
      return 'Modal';
  }
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
`;

const ModalHeader = styled.h2``;

const ModalContent = styled.div`
  margin: 20px 0;
`;

const ModalFooter = styled.div`
  text-align: right;
`;
