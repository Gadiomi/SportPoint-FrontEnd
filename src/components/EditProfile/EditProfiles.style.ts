import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 32px;

  li:nth-of-type(3n + 2):not(:last-child) {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 0.5px;
      background-color: rgba(183, 183, 185, 0.6);
    }
  }
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
  text-transform: capitalize;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #b7b7b9;
    margin-top: 12px;
  }
`;

export const SectionStyled = styled.div`
  @media screen and (min-width: 320px) {
    padding: 0 12px;
  }
`;
