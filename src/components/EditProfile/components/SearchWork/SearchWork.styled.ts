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
