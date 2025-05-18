import Select from 'react-select';
import styled from 'styled-components';

export const SelectedService = styled.select`
  background-color: transparent;
  color: white;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 10px 40px 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  cursor: pointer;

  option {
    background-color: #ccc;
    color: black;
    padding: 8px 15px;
    font-size: 16px;
    border-radius: 4px;
  }
`;

export const ServicesSelect = styled(Select)`
  display: flex;
`;

export const ServicesSelectContainer = styled.div`
  position: relative;
  z-index: 1;

  svg {
    width: 24px;
    height: 24px;
  }
`;
