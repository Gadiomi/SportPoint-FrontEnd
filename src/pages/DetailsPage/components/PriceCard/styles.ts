import styled from 'styled-components';

export const StyledPriceCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.pxs.x4}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
`;

export const PriceDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PriceNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.pxs.x0_5}px`};
  justify-content: flex-end;
`;

export const PriceName = styled.div`
  display: flex;
  align-items: center;
  min-width: 128px;
  margin-right: ${({ theme }) => `${theme.pxs.x4}px`};
  height: 100%;
`;

export const PriceDescription = styled.div`
  display: flex;
  align-items: center;
  min-width: 128px;
  margin-right: ${({ theme }) => `${theme.pxs.x4}px`};
`;

export const PriceAmountContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => `${theme.pxs.x3}px`};
  justify-content: flex-end;
  margin-right: ${({ theme }) => `${theme.pxs.x1_5}px`};
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
