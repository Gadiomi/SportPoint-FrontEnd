import styled from 'styled-components';

export const FavoritesPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 24px;
  padding: 0 12px;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const NameBlock = styled.div`
  display: flex;
  justify-content: start;
`;

export const ConditionsBlock = styled.div`
  display: flex;
  justify-content: start;
`;

export const SpecializationBlock = styled.div`
  display: flex;
  justify-content: start;
  gap: 4px;
  & span {
    padding: 4px 10px;
    border: 1px solid #294487;
    border-radius: 10px;
  }
`;
