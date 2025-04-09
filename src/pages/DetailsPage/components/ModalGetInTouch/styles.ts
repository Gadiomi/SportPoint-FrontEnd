import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.background};
  padding: 16px;
  border-radius: 6px;
  width: 275px;
  max-width: 100%;
`;

export const ModalHeader = styled.h2`
  width: 168px;
`;

export const ModalContent = styled.div`
  margin: 20px 0;
`;

export const ModalFooter = styled.div`
  text-align: right;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Checkbox_1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Checkbox_2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
