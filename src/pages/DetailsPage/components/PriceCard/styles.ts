import styled from 'styled-components';

export const StyledPriceCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PriceContainer = styled.div`
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.pxs.x4}px`};
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // gap: ${({ theme }) => `${theme.pxs.x1}px`};
`;

export const PriceDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
  border-radius: ${({ theme }) => `${theme.pxs.x1_5}px`};
  box-shadow: 0 0 10px rgba(43, 54, 149, 0.9);
  padding: ${({ theme }) => `${theme.pxs.x2}px`};
`;

export const PricePhoto = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
`;

export const PriceNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.pxs.x0_5}px`};
  justify-content: flex-end;
`;

export const PriceName = styled.div``;

export const PriceDescription = styled.div`
  display: flex;
  align-items: center;
`;

export const PriceAmountContainer = styled.div``;

export const PriceAmount = styled.div``;

export const RatePerHour = styled.span``;
