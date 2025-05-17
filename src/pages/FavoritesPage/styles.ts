import styled from 'styled-components';

export const FavoritesPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 32px;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #b7b7b9;

  & p {
    weight: 500;
    size: 16px;
    line-height: 22px;
    margin-bottom: 8px;
  }

  & > div {
    display: flex;
    justify-content: space-between;

    & div {
      display: flex;
      justify-content: start;
    }

    & div:last-of-type {
      justify-content: end;
    }

    & span {
      margin-right: 8px;
      color: #b7b7b9;
    }
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & button {
    height: 36px;
    font-weight: 500;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & ul {
    margin-bottom: 16px;
  }

  & > p {
    align-self: flex-end;
    color: #fff;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.color.secWhite};
  }
`;
