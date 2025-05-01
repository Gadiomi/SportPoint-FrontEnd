import styled from 'styled-components';

export const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #ed772f;

  & button {
    color: #ed772f;
  }

  & svg {
    margin-right: 8px;
  }
`;

export const FirstWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & h2 {
    margin-bottom: 8px;
    padding-top: 26px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #f8f7f4;
  }

  & > p {
    margin-bottom: 64px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #b7b7b9;
  }

  & > div {
    margin-bottom: 176px;
  }
`;
