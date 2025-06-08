import styled from 'styled-components';

export const PlaceWrapper = styled.div<{ $marginBottom?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: ${({ $marginBottom }) => $marginBottom ?? '16px'};
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: ${({ theme }) => theme.color.secWhite};
  border: 0.5px solid #ed772f;
  border-radius: 8px;
  background-color: #303030;

  & > div:first-of-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const AddressWrapper = styled.div`
  padding-top: 10px;
  overflow: hidden;
  transition: height 0.3s ease;

  & > div {
    margin-bottom: ${({ theme }) => theme.pxs.x2_5}px;
  }
`;
