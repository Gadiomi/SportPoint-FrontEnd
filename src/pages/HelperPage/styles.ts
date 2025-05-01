import styled from 'styled-components';

export const IconList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 210px;
  padding: 6px;
  border: 1px solid #777;
  border-radius: 6px;
  & p {
    font-size: 12px;
    & span {
      text-decoration: underline;
    }
  }
`;
