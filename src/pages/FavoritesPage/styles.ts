import styled from 'styled-components';

export const FavoritesPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 24px;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
