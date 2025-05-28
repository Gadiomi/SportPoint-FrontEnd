import React from 'react';
import { Container } from '../ContainerAndSection';
import { TitleBox } from '@/kit/TitleBox';
import { useTheme } from 'styled-components';
import { Footer } from './Footer';
import { EmailBox, SupportLink } from './styles';
import { Icon, IconName, Light, Small } from '@/kit';
import { SocialCards } from './SocialCards';
import { useTranslation } from 'react-i18next';

export const Contacts: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Container
      styles={{
        alignItems: 'flex-start',
      }}
    >
      <TitleBox
        iconStyles={{
          color: theme.color.mainOrange,
        }}
        title={t('contacts')}
        boxStyle={{ marginBottom: theme.pxs.x6 }}
      />
      <EmailBox>
        <Icon name={IconName.MAIL} size={theme.pxs.x6} />
        <Light>
          <SupportLink href="mailto:support@example.com">
            {t('footer.sendEmail')}
          </SupportLink>
        </Light>
      </EmailBox>
      <Small style={{ marginBottom: theme.pxs.x5 }}>
        {t('footer.provideAnswer')}
      </Small>
      <SocialCards />
      <Footer />
    </Container>
  );
};
