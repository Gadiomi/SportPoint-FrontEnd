import React from 'react';
import { FooterContainer, FooterLink, FooterLinks } from './styles';
import { Light, Small } from '@/kit';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="/">
          <Small>{t('footer.confidentiality')}</Small>
        </FooterLink>
        <FooterLink href="/">
          <Small>{t('footer.ruleCookie')}</Small>
        </FooterLink>
        <FooterLink href="/">
          <Small>{t('footer.changeCookie')}</Small>
        </FooterLink>
        <FooterLink href="/">
          <Small>{t('footer.webSite')}</Small>
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
