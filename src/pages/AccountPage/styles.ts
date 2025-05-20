import { Button } from '@/kit';
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

export const AccountWrapper = styled.div`
  width: 100%;
  padding-bottom: 85px;
`;

export const AccountCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-bottom: 74px;
  padding-top: 6px;
`;

export const AccountName = styled.div<{ $paddingTop?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${({ $paddingTop }) => $paddingTop ?? '13px'};
  padding-bottom: 16px;
  border-bottom: 1px solid #b7b7b9;
  & img {
    width: 134px;
    height: 134px;
    border-radius: 50%;
    object-fit: cover;
  }
  & h3 {
    padding-top: 8px;
    font-size: 18px;
    font-weight: 700;
  }
  & button {
    display: flex;
    gap: 8px;
    height: 32px;
    padding: 0px 32px;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 400;
  }
`;

// export const AccountButton = styled(Button)`
//   width: 100%;
//   height: 40px;
//   & p {
//     flex-grow: 1;
//     text-align: left;
//     line-height: 24px;
//   }
// `;

export const SportButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  margin-bottom: 64px;
  border: 1px solid #b7b7b9;
  border-radius: 6px;
`;

export const SportButton = styled.button<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#494949' : 'transparent'};
  color: #b7b7b9;
  border: 1px solid #494949;
  border-radius: 60px;
  font-size: 14px;
  padding: 6px 12px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? '#494949' : 'transparent'};
  }
`;

export const ChangePasswCont = styled.div`
  padding-top: 8px;
`;

export const FormContPassw = styled.div`
  padding-top: 32px;
  padding-bottom: 78px;
  & form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  & h4 {
    padding-bottom: 32px;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    color: #f8f7f4;
  }
`;

export const RestoreCont = styled.div`
  display: flex;
  padding-top: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;

  & h5 {
    font-size: 12px;
    font-weight: 300;
    line-height: 30px;
    color: #b7b7b9;
  }
`;

export const GeneralBtnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  & button {
    width: 50%;
    height: 36px;
    font-size: 16px;
    font-weight: 600;
  }

  & button:first-of-type {
    border: 1px solid #ed772f;
  }

  & button:last-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;

export const GeneralWrapper = styled(AccountWrapper)`
  padding-top: 8px;
`;

export const GeneralInFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const GeneralSports = styled.p`
  padding-top: 32px;
  font-weight: 400;
`;
