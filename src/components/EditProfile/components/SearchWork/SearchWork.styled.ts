import styled from 'styled-components';

export const SearchWorkList = styled.ul`
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
`;

export const SearchWorkItems = styled.li`
  cursor: pointer;
  padding: 5px;
  list-style: none;
`;

export const CitySpan = styled.span`
  display: flex;
  gap: 4px;
  overflow-x: auto;
  white-space: nowrap;
  align-items: center;
  span {
    flex-shrink: 0;
  }
`;

export const NameSpan = styled.span`
  flex-shrink: 0;
  width: max-content;
`;

export const DescSpan = styled.span`
  display: flex;
  flex-grow: 1;
  white-space: nowrap;
  overflow: scroll;
  text-overflow: ellipsis;
  gap: 4px;
`;

export const ContainerDropdown = styled.div`
  position: relative;
  width: 100%;
`;

export const IconDown = styled.span`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 12px;
`;
