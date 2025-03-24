import React from 'react';
import { Container } from '../ContainerAndSection';
import { TitleBox } from '@/kit/TitleBox';
import { useTheme } from 'styled-components';
import { Footer } from './Footer';
import { EmailBox, SupportLink } from './styles';
import { Icon, IconName, Light, Small } from '@/kit';
import { SocialCards } from './SocialCards';

export const Contacts: React.FC = () => {
  const theme = useTheme();
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
        title="КОНТАКТИ"
        boxStyle={{ marginBottom: theme.pxs.x6 }}
      />
      <EmailBox>
        <Icon name={IconName.MAIL} size={theme.pxs.x6} />
        <Light>
          <SupportLink href="mailto:support@example.com">
            Надіслати електронного листа
          </SupportLink>
        </Light>
      </EmailBox>
      <Small style={{ marginBottom: theme.pxs.x5 }}>
        Ми надамо відповідь якомога швидше
      </Small>
      <SocialCards />
      <Footer />
    </Container>
  );
};
