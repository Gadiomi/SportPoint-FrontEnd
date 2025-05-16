import styled from 'styled-components';
export const TextAreaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextArea = styled.textarea`
  border: 1px solid #b7b7b9;
  border-radius: 6px;
  padding: 6px 12px;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  color: #b7b7b9;
  overflow: scroll;
  display: flex;
  background-color: transparent;
  height: 92px;
  resize: none;
`;

export const TextAreaSymbol = styled.div`
  font-weight: 500;
  font-size: 10px;
  color: #b7b7b9;
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;
  padding-top: 2px;
`;
