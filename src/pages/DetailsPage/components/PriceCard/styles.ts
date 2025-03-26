import styled from 'styled-components';

export const StyledPriceCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => `${theme.pxs.x2}px`};
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.mainTitle};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.pxs.x4}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;

export const PriceDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PriceName = styled.div`
  display: flex;
  align-items: center;
  min-width: 128px;
  margin-right: ${({ theme }) => `${theme.pxs.x11}px`};
`;

export const PriceAmountContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => `${theme.pxs.x3}px`};
  justify-content: flex-end;
`;

export const PriceAmount = styled.div`
  display: flex;
  width: 54px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.color.secWhite};
  border-radius: ${({ theme }) => `${theme.pxs.x1_5}px`};
  padding: ${({ theme }) => `${theme.pxs.x2}px`};
  margin-top: ${({ theme }) => `${theme.pxs.x1}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x1}px`};
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const RatePerHour = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
