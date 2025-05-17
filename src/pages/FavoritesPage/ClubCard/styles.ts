import { FontFamily, FontSizes, FontWeights, LineHeights } from '@/kit';
import styled from 'styled-components';

export const ClubCardWrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 8px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.color.inputBar};
  border-radius: 6px;
  box-shadow: 0 0 10px 0 #2b3695e5;
`;

export const ClubInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  margin-bottom: 8px;
`;

export const ClubImage = styled.img`
  width: 96px;
  min-width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ClubInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
`;

export const ClubNameBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 34px;
  font-family: ${FontFamily};
  & h2 {
    font-size: ${FontSizes.LARGE};
    font-weight: ${FontWeights.MEDIUM};
    line-height: ${LineHeights.X_LARGE};
  }

  & p {
    font-size: ${FontSizes.MEDIUM};
    font-weight: ${FontWeights.REGULAR};
    line-height: ${LineHeights.MEDIUM};
    color: ${({ theme }) => theme.color.secWhite};
  }
`;

export const HeartBlock = styled.div`
  width: fit-content;
`;

export const ClubConditionsBlock = styled.div`
  display: flex;
  justify-content: start;
  gap: 4px;
  & div {
    display: flex;
    align-items: center;
    gap: 2px;
    width: fit-content;

    & span {
      font-size: ${FontSizes.MEDIUM};
      font-weight: ${FontWeights.REGULAR};
      line-height: ${LineHeights.MEDIUM};
      color: ${({ theme }) => theme.color.secWhite};
    }
  }
`;
