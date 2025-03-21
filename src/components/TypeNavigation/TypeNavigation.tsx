import React from 'react';
import { Container } from '../ContainerAndSection';
import { Icon, IconName, Light, Title } from '@/kit';
import css from './TypeNavigation.module.css';
import { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';

export const TypeNavigation: React.FC = () => {
  const theme = useTheme();
  return (
    <Container
      styles={{
        alignItems: 'flex-start',
        padding: '10.5px 0px',
      }}
    >
      <div className={css.titleBox}>
        <Icon
          name={IconName.ARROW_RIGHT}
          size={theme.pxs.x8}
          styles={{
            color: theme.color.mainOrange,
          }}
        />
        <Title>БУДЬ СПОРТИВНИМ</Title>
      </div>
      <Light>
        Відкрийте для себе найкращі спортивні клуби та професійних тренерів у
        вашому регіоні.
      </Light>
      <ul className={css.linkList}>
        <li>
          <Link to="/trainers">
            <img
              src="/public/assets/images/homePage/trainer@1.jpg"
              alt="Тренери"
              width="296"
              height="152"
              className={css.imgCard}
            />
            <Title>ТРЕНЕРИ</Title>
            <Icon name={IconName.ARROW_RIGHT} size={theme.pxs.x6} />
          </Link>
        </li>
        <li>
          <Link to="/clubs">
            <img
              src="/public/assets/images/homePage/gym@1.jpg"
              alt="Спортклуби"
              width="296"
              height="152"
              className={css.imgCard}
            />
            <Title>СПОРТКЛУБИ</Title>
            <Icon name={IconName.ARROW_RIGHT} size={theme.pxs.x6} />
          </Link>
        </li>
      </ul>
    </Container>
  );
};
