import React, { useState } from 'react';
import ReviewHeader from './ReviewHeader';
import StyledHr from '../StyledHr/StyledHr';
import ReviewUserInfo from './ReviwUserInfo';
import styled from 'styled-components';
import { IconName } from '@/kit';
import { Icon } from '@/kit';
import { TextArea } from '@/pages/ReviewsPage/styles';
import { ButtonGroup, DeleteButton, ActionButton } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (replyText: string) => void;
  reviewId: string;
  createdAt: string;
}

const Overlay = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #1c1b20;
  border-radius: 12px;
  padding: 12px;
`;

const ReplyModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  reviewId,
  createdAt,
}) => {
  const [text, setText] = useState('');

  const handleSave = () => {
    onSubmit(text);
    setText('');
  };

  return (
    <Overlay isOpen={isOpen}>
      <ModalContainer>
        <ReviewHeader
          title="Відповісти на відгук"
          leftIcon={IconName.EDIT_CONTAINED}
        />
        <ReviewUserInfo userId={reviewId} createdAt={createdAt} />
        <StyledHr />
        <TextArea
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          placeholder="Дякую за відгук, чекаю знов на занятті"
          style={{
            minHeight: '51px',
            padding: '16px 8px',
            fontSize: '12px',
          }}
        />
        <ButtonGroup>
          <DeleteButton onClick={onClose}>Назад</DeleteButton>
          <ActionButton onClick={handleSave}>
            <Icon
              name={IconName.CHECK_CONTAINED}
              styles={{ fill: 'none', stroke: 'none' }}
              size={24}
            />
            Зберегти
          </ActionButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default ReplyModal;
