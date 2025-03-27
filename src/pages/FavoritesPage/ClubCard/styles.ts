import { FontFamily, FontSizes, FontWeights, LineHeights } from '@/kit';
import styled from 'styled-components';

export const ClubCardWrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 9px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.color.inputBar};
  border-radius: 6px;
  box-shadow: 0 0 10px 0 #2b3695e5;
`;

export const ClubInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 8px;
  width: 100%;
  margin-bottom: 8px;
`;

export const ClubNameBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: ${FontFamily};
  & h2 {
    font-size: ${FontSizes.LARGE};
    font-weight: ${FontWeights.MEDIUM};
    line-height: ${LineHeights.X_LARGE};
  }

  & p {
    font-size: ${FontSizes.MEDIUM};
    font-weight: ${FontWeights.REGULAR};
    line-height: ${LineHeights.LARGE};
    color: ${({ theme }) => theme.color.secWhite};
  }
`;

export const ClubConditionsBlock = styled.div`
  display: flex;
  justify-content: start;
  gap: 8px;
  & div {
    display: flex;
    align-items: center;
    gap: 2px;

    & span {
      font-size: ${FontSizes.MEDIUM};
      font-weight: ${FontWeights.LIGHT};
      line-height: ${LineHeights.LARGE};
      color: ${({ theme }) => theme.color.secWhite};
    }
  }
`;
