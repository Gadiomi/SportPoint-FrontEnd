import styled from 'styled-components';

export const Image = styled.img`
  margin: auto;
  margin-bottom: ${({ theme }) => theme.pxs.x5}px;
  margin-top: ${({ theme }) => theme.pxs.x2}px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.pxs.x2}px;
  margin-bottom: ${({ theme }) => theme.pxs.x3}px;
`;

export const Title = styled.h2(({ theme }) => ({
  ...theme.fonts.secondTitle,
  color: theme.color.mainWhite,
}));

export const Subtitle = styled.p(({ theme }) => ({
  ...theme.fonts.lightManrope,
  color: theme.color.secWhite,
}));

export const TabsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.pxs.x1_5}px;
  margin-bottom: ${({ theme }) => theme.pxs.x4}px;
`;

export const Form = styled.form`
  margin-bottom: ${({ theme }) => theme.pxs.x8}px;
  width: 100%;
`;

export const CallToActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
