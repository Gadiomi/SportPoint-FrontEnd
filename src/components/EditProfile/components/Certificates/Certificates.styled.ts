import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CertificatesItem = styled.p`
  position: relative;
  border: 1px solid #b7b7b9;
  border-radius: 6px;
  padding: 6px 12px;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  color: #b7b7b9;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;

  &:hover {
    background-color: #ed772f;
    color: black;
  }
  display: flex;
  justify-content: space-between;
`;

export const CertificatesItemText = styled.span`
  width: 90%;
  font-weight: 400;
  font-size: 14px;
  color: #b7b7b9;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CertificatesIcon = styled.span`
  position: absolute;
  right: 12px;
`;
