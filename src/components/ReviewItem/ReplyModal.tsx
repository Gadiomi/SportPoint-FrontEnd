import React, { useState, useEffect } from 'react';
import ReviewHeader from './ReviewHeader';
import StyledHr from '../StyledHr/StyledHr';
import ReviewUserInfo from './ReviwUserInfo';
import { IconName, Icon, formatDate } from '@/kit';
import { TextArea } from '@/pages/ReviewsPage/styles';
import { useAppSelector } from '@/redux/reviews/reviewsSelector';
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
  _id: string;
  createdAt: string;
  avatar: string;
  firstName: string;
  lastName: string;
  rating: number;
  commentId?: string;
  adminReply?: string;
  isEditMode?: boolean;
}

const ReplyModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  _id,
  avatar,
  firstName,
  lastName,
  rating,
  createdAt,
  commentId,
  adminReply,
  isEditMode = false,
}) => {
  const { t } = useTranslation();
  const translate: (key: string, options?: Record<string, any>) => string = t;
  const user = useAppSelector(state => state.user.user);
  const editingComment = user?.user_comments?.find(
    comment => comment._id === commentId,
  );
  const [text, setText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setText(editingComment?.adminReply || '');
    }
  }, [isOpen, editingComment]);

  const handleSave = () => {
    onSubmit(text.trim());
    setText('');
  };

  const theme = useTheme();
  const headerTitle =
    editingComment?.adminReply !== ''
      ? translate('details_page.edit-reply') // або 'details_page.edit-reply'
      : translate('details_page.reply-to-review');

  return (
    <Overlay isOpen={isOpen}>
      <ModalContainer>
        <ReviewHeader
          title={headerTitle}
          leftIcon={
            editingComment?.adminReply !== ''
              ? IconName.EDIT_CONTAINED
              : IconName.Icon_send_02
          }
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
            <StyledDate>{formatDate(createdAt)}</StyledDate>
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
