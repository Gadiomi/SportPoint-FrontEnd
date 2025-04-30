import React, { useState } from 'react';
import ReviewHeader from './ReviewHeader';
import StyledHr from '../StyledHr/StyledHr';
import ReviewUserInfo from './ReviwUserInfo';
import { IconName, Icon } from '@/kit';
import { TextArea } from '@/pages/ReviewsPage/styles';
import { useTheme } from 'styled-components';
import {
  ButtonGroup,
  DeleteButton,
  ActionButton,
  Overlay,
  ModalContainer,
  Stars,
  Avatar,
  Name,
  StyledDate,
  Div,
  UserInfo,
  UserInfoReply,
} from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (replyText: string) => void;
  createdAt: string;
  avatar: string;
  firstName: string;
  lastName: string;
  rating: number;
}

const ReplyModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  avatar,
  firstName,
  lastName,
  rating,
  createdAt,
}) => {
  const [text, setText] = useState('');

  const handleSave = () => {
    onSubmit(text);
    setText('');
  };

  const theme = useTheme();

  return (
    <Overlay isOpen={isOpen}>
      <ModalContainer>
        <ReviewHeader
          title="Відповісти на відгук"
          leftIcon={IconName.EDIT_CONTAINED}
        />
        <UserInfoReply>
          <UserInfo>
            <Avatar src={avatar} alt={`${firstName} ${lastName}`} />
            <Div>
              <Name>
                {firstName} {lastName}
              </Name>
              <Stars>
                {[1, 2, 3, 4, 5].map(star => (
                  <Icon
                    key={`star-${star}`}
                    name={IconName.STAR_DEFAULT}
                    styles={{
                      fill:
                        star <= Math.round(rating ?? 0)
                          ? theme.colors.mainOrange
                          : theme.colors.darkGray,
                      color: 'transparent',
                    }}
                    size={16}
                  />
                ))}
              </Stars>
            </Div>
            <StyledDate>
              {' '}
              {createdAt
                ? new Date(createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'Дата не вказана'}
            </StyledDate>
          </UserInfo>
        </UserInfoReply>
        <StyledHr />
        <p>Відповісти на відгук</p>
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
