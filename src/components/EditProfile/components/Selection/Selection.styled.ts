import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 16px;
`;

export const SelectedItems = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 5px;
`;

export const SelectedItem = styled.span`
  border: 0.5px solid #b7b7b9;
  border-radius: 6px;
  padding: 6px 12px;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  color: #b7b7b9;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    background-color: #0056b3;
  }
  display: flex;
  justify-content: space-between;
`;

export const SelectStyled = styled.select`
  width: 100%;
  padding: 6px 12px;
  border-radius: 6px;
  border: 0.5px solid #b7b7b9;
  background-color: transparent;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  color: #b7b7b9;
  height: 36px;
  text-transform: capitalize;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 24px;

  &::-ms-expand {
    display: none;
  }
`;
