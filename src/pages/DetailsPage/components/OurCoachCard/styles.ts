import styled from 'styled-components';

import { Button } from '@/kit';

export const StyledOurCoachCard = styled.div`
  width: 100%;
`;
export const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`;
export const Name = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 4px;
`;

export const PriceRatingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 8px;
  gap: 16px;
`;

export const Price = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 2px;
`;

export const Equipment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

export const EquipmentEl = styled.div`
  width: auto;
  display: flex;
  border-radius: 20px;
  border: 1px solid rgba(41, 68, 135, 1);
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 6px 12px;
`;

export const OurCoachBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  gap: 8px;
`;

export const InfoContainer = styled.div`
  width: 100%;
`;

export const PriceBox = styled.div`
  width: 100%;
`;

export const Text = styled.div`
  width: 100%;
  font-size: 10px;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
`;

export const OurCoachContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
`;

export const OurCoachWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.inputBar};
  padding: ${({ theme }) => `${theme.pxs.x2}px`};
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
  border-radius: ${({ theme }) => `${theme.pxs.x1_5}px`};
  box-shadow: 0 0 10px rgba(43, 54, 149, 0.9);
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: ${({ theme }) => `${theme.pxs.x10}px`};
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 20px;
`;
