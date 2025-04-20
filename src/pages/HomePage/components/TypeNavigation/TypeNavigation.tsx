import React from 'react';
import { Container } from '../../../../components/ContainerAndSection';
import { Icon, IconName, Light, Title } from '@/kit';
import { useTheme } from 'styled-components';
import { LinkItem, LinkList, StyledLink } from './styles';
import { TitleBox } from '@/kit/TitleBox';
import { t } from 'i18next';
import { SwiperNav } from './SwiperNav';

export const TypeNavigation: React.FC = () => {
  const theme = useTheme();
  return (
    <Container
      styles={{
        alignItems: 'flex-start',
        padding: '10.5px 0px',
        paddingBottom: '122px',
      }}
    >
      <LinkList>
        <LinkItem>
          <StyledLink
            to="/trainers"
            $bgImage1x="/assets/images/homePage/trainer@1.jpg"
            $bgImage2x="/assets/images/homePage/trainer@2.jpg"
          >
            <Title style={{ textTransform: 'uppercase' }}>{t('coachs')}</Title>
            <Icon name={IconName.ARROW_RIGHT} size={theme.pxs.x6} />
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink
            to="/clubs"
            $bgImage1x="/assets/images/homePage/gym@1.jpg"
            $bgImage2x="/assets/images/homePage/gym@2.jpg"
          >
            <Title style={{ textTransform: 'uppercase' }}>
              {t('clubs-list')}
            </Title>
            <Icon name={IconName.ARROW_RIGHT} size={theme.pxs.x6} />
          </StyledLink>
        </LinkItem>
      </LinkList>
      <TitleBox
        iconStyles={{
          color: theme.color.mainOrange,
        }}
        title={t('home_page.motivation')}
        boxStyle={{ marginBottom: theme.pxs.x2 }}
      />
      <Light>{t('home_page.homeDescr')}</Light>

      <SwiperNav />
    </Container>
  );
};
