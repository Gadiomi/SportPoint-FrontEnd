import React from 'react';
import { Container } from '../ContainerAndSection';
import { Icon, IconName } from '@/kit';

export const Logo: React.FC = () => {
  return (
    <Container
      styles={{
        flexDirection: 'row',
        position: 'relative',
        padding: '10.5px 0px',
      }}
    >
      <img
        srcSet="/public/assets/images/logo@1.png 1x, /public/assets/images/logo@2.png 2x"
        src="/public/assets/images/logo@1.png"
        alt="Logo"
      />

      <Icon
        name={IconName.SMS}
        styles={{
          position: 'absolute',
          right: '0',
        }}
      />
    </Container>
  );
};
