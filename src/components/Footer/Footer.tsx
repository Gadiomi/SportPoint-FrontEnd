import React from 'react';
import { FooterContainer, FooterLink, FooterLinks, FooterText } from './styles';
import { Light, Small } from '@/kit';

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="/">
          <Small>Політика конфіденційності</Small>
        </FooterLink>
        <FooterLink href="/">
          <Small>Політика використання cookie</Small>
        </FooterLink>
        <FooterLink href="/">
          <Small>Змінити налаштування cookie</Small>
        </FooterLink>
        <FooterLink href="/">
          <Small>Структура веб-сайту</Small>
        </FooterLink>
      </FooterLinks>
      <Light
        style={{
          color: '#f3f3e7',
          letterSpacing: '-0.01em',
          width: '100%',
          textAlign: 'center',
          padding: '10px 0px',
        }}
      >
        &copy; 2025 SportPoint
      </Light>
    </FooterContainer>
  );
};
