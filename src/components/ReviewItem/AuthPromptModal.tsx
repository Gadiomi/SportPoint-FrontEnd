import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #1a1a1d;
  color: white;
  padding: 24px 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px #007bff;
  width: 90%;
  max-width: 320px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 14px;
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const Message = styled.p`
  margin-bottom: 12px;
  color: #cccccc;
  font-size: 14px;
`;

const BoldText = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 10px 0;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  background: ${({ primary }) => (primary ? '#ff7a00' : '#2e2e2e')};
  color: ${({ primary }) => (primary ? '#fff' : '#ccc')};

  &:hover {
    opacity: 0.9;
  }
`;

type Props = {
  onClose: () => void;
  // onConfirm?: () => void;
};

const AuthPromptModal: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose(); // Закриваємо модалку (опційно)
    navigate('/login'); // Або '/signup', якщо така у тебе сторінка
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>×</CloseButton>
        <Message>
          Тільки авторизовані користувачі можуть залишати відгуки
        </Message>
        <BoldText>Бажаєте авторизуватись?</BoldText>
        <ButtonGroup>
          <Button onClick={onClose}>Ні</Button>
          <Button primary onClick={handleConfirm}>
            Так
          </Button>
        </ButtonGroup>
      </ModalBox>
    </Overlay>
  );
};

export default AuthPromptModal;
