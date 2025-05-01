import { ButtonAppearance } from './../../../../kit/Button/constants';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`;

export const SelectedItems = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 5px;
`;

export const SelectedItem = styled.span`
  position: relative;
  border: 0.5px solid #b7b7b9;
  border-radius: 6px;
  padding: 6px 12px;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  color: #b7b7b9;
  cursor: pointer;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #ed772f;
    color: black;
  }
  display: flex;
  gap: 6px;
`;

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
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

  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a 1 1 0 010-1.414z" clip-rule="evenodd"/></svg>');
  background-repeat: no-repeat;
  background-size: 26px;
  background-position: right 12px center;

  padding-right: 36px;
`;

export const InputStyled = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const DropdownToggle = styled.div<{ isOpen: boolean }>`
  padding: 8px 12px 8px 12px;
  border: 1px solid #b7b7b9;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
  color: #b7b7b9;

  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a 1 1 0 010-1.414z" clip-rule="evenodd"/></svg>');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  span {
    display: block;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f7f4;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

export const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  background-color: #f8f7f4;
  position: absolute;
  width: 100%;
  z-index: 10;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
`;

export const DropdownContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  max-height: 200px;
  overflow-y: auto;
  background-color: transparent;
`;

export const DropdownLabel = styled.label`
  border-bottom: 1px solid #1c1b2047;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  color: #1c1b20;
  font-size: 14px;
  font-weight: 400;

  input {
    visibility: hidden;
    width: 0;
  }

  input:checked + span {
    color: #ed772f;
  }

  input:checked + svg {
    color: #ed772f;
  }
`;
