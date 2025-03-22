import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import {
  StyledContactsCard,
  IconContainer,
  Title,
  ImgContainer,
} from './styles';

const ContactsCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledContactsCard>
      <IconContainer>
        <Icon
          name={IconName.ARROW_RIGHT}
          styles={{
            left: '12px',
            fill: 'none',
            width: '32px',
            height: '32px',
          }}
        />
        <Title>{t('details_page.contacts_text')}</Title>
      </IconContainer>
      <ImgContainer>
        <img
          style={{ width: 32, height: 32 }}
          src="/assets/images/icon_instagram.png"
          alt="Facebook Icon"
        />
        <img
          style={{ width: 32, height: 32 }}
          src="/assets/images/icon_facebook.png"
          alt="Facebook Icon"
        />
        <img
          style={{ width: 32, height: 32 }}
          src="/assets/images/icon_messenger.png"
          alt="Facebook Icon"
        />
      </ImgContainer>
    </StyledContactsCard>
  );
};

export default ContactsCard;
