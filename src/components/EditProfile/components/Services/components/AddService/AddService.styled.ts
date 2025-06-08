import styled from 'styled-components';

export const AddServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100vh;
  form {
    display: flex;
    flex-direction: column;
    gap: 174px;
    justify-content: space-between;
  }
`;

export const AddServiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  h4 {
    color: #f8f7f4;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const AddServiceImgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  div {
    width: 72px;
    height: 72px;
  }
`;

export const AddServiceBackButton = styled.div`
  &::after {
    content: '';
    background-color: #b7b7b9;
    display: block;
    width: 100%;
    height: 0.5px;
  }
`;
export const AddServiceImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const AddServiceAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }
  select {
    background-color: transparent;
    color: #f8f7f4;
    border: none;
  }
`;

export const AddServiceDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  textarea {
    background-color: transparent;
    color: #f8f7f4;
    border-radius: 6px;
  }
`;
