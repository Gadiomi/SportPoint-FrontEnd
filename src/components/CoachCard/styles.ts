import { FontFamily, FontSizes, FontWeights, LineHeights } from '@/kit';
import styled from 'styled-components';

export const CoachCardWrapper = styled.li`
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

export const CoachInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  margin-bottom: 8px;
`;

export const CoachImage = styled.img`
  width: 96px;
  min-width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CoachInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  & h2 {
    font-size: ${FontSizes.LARGE};
    font-weight: ${FontWeights.MEDIUM};
    font-family: ${FontFamily};
    line-height: ${LineHeights.X_LARGE};
  }

  & span {
    font-size: ${FontSizes.SMALL};
    font-weight: ${FontWeights.MEDIUM};
    font-family: ${FontFamily};
    line-height: ${LineHeights.X_SMALL};
    color: ${({ theme }) => theme.color.secWhite};
  }
`;

export const NameBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const ConditionsBlock = styled.div`
  display: flex;
  justify-content: start;
  gap: 16px;
  margin-bottom: 10px;
  & div {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  & h2 {
    font-weight: ${FontWeights.BOLD};
  }
`;

export const Rating = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 8px;
  }
`;

export const SpecializationBlock = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 4px;
  & span {
    height: 22px;
    font-size: ${FontSizes.MEDIUM};
    font-weight: ${FontWeights.REGULAR};
    line-height: ${LineHeights.X_LARGE};
    color: ${({ theme }) => theme.color.white};
    padding: 0 10px;
    border: 1px solid ${({ theme }) => theme.color.mainBlue};
    border-radius: 10px;
  }
`;
