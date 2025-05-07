import React, { useState } from 'react';
import ReviewHeader from './ReviewHeader';
import StyledHr from '../StyledHr/StyledHr';
import ReviewUserInfo from './ReviwUserInfo';
import { IconName, Icon } from '@/kit';
import { TextArea } from '@/pages/ReviewsPage/styles';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const translate: (key: string, options?: Record<string, any>) => string = t;
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
          title={translate('details_page.reply-to-review')}
          leftIcon={IconName.Icon_send_02}
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
                          ? theme.color.mainOrange
                          : theme.color.darkGray,
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
                : ''}
            </StyledDate>
          </UserInfo>
        </UserInfoReply>
        <StyledHr />
        <p>{translate('details_page.reply-to-review')}</p>
        <TextArea
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          placeholder={translate('details_page.thanks-for-feedback')}
          style={{
            minHeight: '51px',
            padding: '16px 8px',
            fontSize: '12px',
          }}
        />
        <ButtonGroup>
          <DeleteButton onClick={onClose}>
            {translate('account_page.back')}
          </DeleteButton>
          <ActionButton onClick={handleSave}>
            <Icon
              name={IconName.CHECK_CONTAINED}
              styles={{ fill: 'none', stroke: 'none' }}
              size={24}
            />
            {translate('account_page.save')}
          </ActionButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default ReplyModal;
