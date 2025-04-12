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

export const Sport = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SportEl = styled.div`
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
