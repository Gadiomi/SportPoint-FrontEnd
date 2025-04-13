import styled from 'styled-components';

export const ButtonItem = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#ED772F' : '#303030')};
  width: ${({ isActive }) => (isActive ? '84px' : '102px')};
  color: #fff;
  border: none;
  padding: ${({ isActive }) => (isActive ? '4px 8px' : '6px 16px')};
  cursor: pointer;
  border-radius: ${({ isActive }) => (isActive ? '4px' : '4px')};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#ED672F' : '#303030')};
  }
`;
