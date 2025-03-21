import React from 'react';
import { Container } from '../ContainerAndSection';
import { Icon, IconName, Light, Title } from '@/kit';
import { useTheme } from 'styled-components';
import { LinkItem, LinkList, StyledLink } from './styles';
import { TitleBox } from '@/kit/TitleBox';

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
      <TitleBox
        iconStyles={{
          color: theme.color.mainOrange,
        }}
        title="БУДЬ СПОРТИВНИМ"
        boxStyle={{ marginBottom: theme.pxs.x2 }}
      />

      <Light>
        Відкрийте для себе найкращі спортивні клуби та професійних тренерів у
        вашому регіоні.
      </Light>
      <LinkList>
        <LinkItem>
          <StyledLink
            to="/trainers"
            $bgImage1x="/assets/images/homePage/trainer@1.jpg"
            $bgImage2x="/assets/images/homePage/trainer@2.jpg"
          >
            <Title>ТРЕНЕРИ</Title>
            <Icon name={IconName.ARROW_RIGHT} size={theme.pxs.x6} />
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink
            to="/clubs"
            $bgImage1x="/assets/images/homePage/gym@1.jpg"
            $bgImage2x="/assets/images/homePage/gym@2.jpg"
          >
            <Title>СПОРТКЛУБИ</Title>
            <Icon name={IconName.ARROW_RIGHT} size={theme.pxs.x6} />
          </StyledLink>
        </LinkItem>
      </LinkList>
    </Container>
  );
};
