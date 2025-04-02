import styled from 'styled-components';

export const ListItem = styled.li``;
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const AccountName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  & img {
    width: 134px;
    height: 134px;
    border-radius: 50%;
  }
  & h3 {
    font-size: 18px;
    font-weight: 700;
  }
`;

export const NameTitle = styled.h3`
  font-weight: 700;
  font-size: 18px;
  width: 100%;
  text-align: center;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #b7b7b9;
    margin-top: 12px;
  }
`;
