import styled from 'styled-components';

export const SearchWorkList = styled.ul`
  /* position: absolute; */
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  /* z-index: 9999;
  left: 50%;
  transform: translateX(-50%);
  top: 84%; */
  background-color: rgba(248, 247, 244, 1);
  border-radius: 6px;
`;

export const SearchWorkItems = styled.li`
  cursor: pointer;
  padding: 10px;
  list-style: none;
  border-bottom: 1px solid rgba(28, 27, 32, 0.28);
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

export const WorksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
