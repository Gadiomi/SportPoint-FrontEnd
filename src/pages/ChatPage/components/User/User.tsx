import { FC } from 'react';
import {
  Avatar,
  BoxName,
  StyledBox,
  TrashIconWrapper,
  UserChatBox,
  UserMessage,
  UserName,
} from './styles';
import { ChatProps } from '../AllChats/AllChats';
import { Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';

export const User: FC<ChatProps> = ({ isChangeActive }) => {
  const navigate = useNavigate();
  return (
    <UserChatBox $active={isChangeActive} onClick={() => navigate(`chat`)}>
      <Avatar
        src="../../../../../public/assets/images/baseClub.png"
        alt="userAvatar"
      />
      <StyledBox>
        <BoxName>
          <UserName>Максим Бондаренко</UserName>
          {isChangeActive || <UserMessage>16:46</UserMessage>}
        </BoxName>
        <UserMessage>
          Добрий день Ксенія, Ваш запит на отримання сертифікату опрацьовано
          чекаемо на вас за адесою
        </UserMessage>
      </StyledBox>
      {!isChangeActive || (
        <TrashIconWrapper>
          <Icon name={IconName.TRASH} size={24} />
        </TrashIconWrapper>
      )}
    </UserChatBox>
  );
};
