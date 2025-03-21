import React from 'react';
import { FooterContainer, FooterLink, FooterLinks, FooterText } from './styles';

import { useTheme } from 'styled-components';
import { TitleBox } from '@/kit/TitleBox';

export const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <FooterContainer>
      <TitleBox
        iconStyles={{
          color: theme.color.mainOrange,
        }}
        title="КОНТАКТИ"
        boxStyle={{ marginBottom: theme.pxs.x6 }}
      />
      <FooterLinks>
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
        <FooterLink href="/privacy">Privacy</FooterLink>
      </FooterLinks>
      <FooterText>&copy; 2025 SportPoint</FooterText>
    </FooterContainer>
  );
};
