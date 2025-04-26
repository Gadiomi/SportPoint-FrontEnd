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

export const AccountCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-bottom: 74px;
  padding-top: 6px;
`;

export const AccountName = styled.div<{ paddingTop?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${({ paddingTop }) => paddingTop ?? '13px'};
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

export const AccountButton = styled(Button)`
  width: 100%;
  height: 40px;
  & p {
    flex-grow: 1;
    text-align: left;
    line-height: 24px;
  }
`;

export const AccountDeleteCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 94px;
  text-align: center;
  & h4 {
    color: #b7b7b9;
    font-size: 12px;
    font-weight: 300;
  }
  & button {
    color: #b7b7b9;
  }
`;
