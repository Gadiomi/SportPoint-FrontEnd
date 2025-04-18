import styled from 'styled-components';

export const EmailBox = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.pxs.x1_5,
  marginBottom: theme.pxs.x0_5,
}));
export const SupportLink = styled.a(({ theme }) => ({
  color: theme.color.white,
}));
export const SocialContainer = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.pxs.x4,
  marginBottom: theme.pxs.x8_5,
  justifyContent: 'center',
}));
export const SocialLink = styled.a(({ theme }) => ({
  '& img': {
    width: theme.pxs.x6,
    height: theme.pxs.x6,
  },
}));

export const FooterContainer = styled.footer(({ theme }) => ({
  width: '100%',
  marginBottom: '20px',
}));
export const FooterLinks = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x2,
  marginBottom: theme.pxs.x4,
}));
export const FooterLink = styled.a(({ theme }) => ({
  color: theme.color.white,
}));

export const FooterText = styled.p({});
