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
  background-image: url("data:image/svg+xml,%3Csvg fill='white' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  background-size: 32px;
  cursor: pointer;

  option {
    background-color: #ccc;
    color: black;
    padding: 8px 15px;
    font-size: 16px;
    border-radius: 4px;
  }
`;
