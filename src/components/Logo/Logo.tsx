import React from 'react';
import { Container } from '../ContainerAndSection';
import { Icon, IconName } from '@/kit';

interface LogoProps {
  containerStyles?: React.CSSProperties;
}
export const Logo: React.FC<LogoProps> = ({ containerStyles }) => {
  return (
    <Container
      styles={{
        flexDirection: 'row',
        position: 'relative',
        padding: '10px 0px',
        ...containerStyles,
      }}
    >
      <a href="/">
        <img
          srcSet="/assets/images/logo@1.png 1x, /assets/images/logo@2.png 2x"
          src="/assets/images/logo@1.png"
          alt="Logo"
        />
      </a>

      <Icon
        name={IconName.SMS}
        styles={{
          position: 'absolute',
          right: '0',
          fill: 'white',
        }}
      />
    </Container>
  );
};
