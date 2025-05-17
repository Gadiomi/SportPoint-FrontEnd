import styled from 'styled-components';

export const Image = styled.img`
  margin: auto;
  margin-bottom: 72px;
  margin-top: ${({ theme }) => theme.pxs.x2}px;
`;

export const TextWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x2,
  marginBottom: theme.pxs.x8,
}));

export const Title = styled.h2(({ theme }) => ({
  ...theme.fonts.secondTitle,
  color: theme.color.mainWhite,
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: '22px',
}));

export const Subtitle = styled.p(({ theme }) => ({
  ...theme.fonts.lightManrope,
  fontWeight: 400,
  color: '#B7B7B9',
}));

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 32px;
  margin-bottom: 32px;
  background-color: #303030;
  border-radius: 4px;
`;

export const SocialNetButtonWrapper = styled.div({
  marginBottom: '48px',
});

export const CallToActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  margin-bottom: 64px;
  width: 100%;
`;
