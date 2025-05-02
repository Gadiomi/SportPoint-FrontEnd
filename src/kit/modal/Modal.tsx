import React from 'react';
import styled from 'styled-components';
import { ModalEnum, ModalType } from './constants';
import { Icon, IconName } from '../Icon';

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
        <CloseButton onClick={onClose}>
          <Icon name={IconName.X} size="24px" />
        </CloseButton>
      </ModalContainer>
    </Backdrop>
  );
};

const getModalTitle = (type: ModalType) => {
  switch (type) {
    case ModalEnum.CONFIRMATION:
      return 'Confirmation';
    case ModalEnum.INFO:
      return 'Information';
    case ModalEnum.ERROR:
      return 'Error';
    default:
      return type;
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
  z-index: 1000;
`;

const ModalContainer = styled.div(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.color.background,
  padding: theme.pxs.x5,
  borderRadius: theme.pxs.x2,
  width: '70%',
  maxWidth: '375px',
  minHeight: '200px',
}));

const ModalHeader = styled.h2(({ theme }) => ({
  ...theme.fonts.names,
  paddingRight: theme.pxs.x8,
}));
const ModalContent = styled.div`
  margin: 20px 0;
`;

const CloseButton = styled.button(({ theme }) => ({
  position: 'absolute',
  top: theme.pxs.x5,
  right: theme.pxs.x5,
  transition: 'transform 0.6s ease',

  '&:hover': {
    transform: 'rotate(180deg)',
  },
}));
