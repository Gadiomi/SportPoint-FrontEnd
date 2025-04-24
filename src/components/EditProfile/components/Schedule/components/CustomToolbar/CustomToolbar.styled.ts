import styled from 'styled-components';

export const ButtonItem = styled.button<{ $isActive: boolean }>`
  background-color: rgba(41, 68, 135, 1);
  color: #fff;
  border: none;
  padding: 2px 12px;
  cursor: pointer;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ed672f;
  }
`;
