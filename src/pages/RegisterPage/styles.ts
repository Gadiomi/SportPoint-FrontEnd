import styled from 'styled-components';

// export const AbilitiesWrapper = styled.div`
//   padding-top: 10px;
//   & > div {
//     margin-bottom: ${({ theme }) => theme.pxs.x2_5}px;
//   }
// `;

export const SportsListWrapper = styled.ul`
  padding-top: 10px;
  background-color: #f8f7f4;
  border-radius: 5px;
  transition: 'all 0.3s ease';
  & label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    padding-bottom: 1px;
    margin: 0 6px 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: #1c1b20;
    border-bottom: 1px solid rgba(28, 27, 32, 0.28);
    cursor: pointer;
  }

  & input {
    width: 0;
    height: 0;

    &:checked + label {
      color: rgba(237, 119, 47, 1);
    }
  }
`;

export const SimpleInput = styled.input`
  padding: 6px 22px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.secWhite};
  border: 1px solid ${({ theme }) => theme.color.secWhite};
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    color: ${({ theme }) => theme.color.writing};
    border-color: ${({ theme }) => theme.color.writing};
  }
`;
