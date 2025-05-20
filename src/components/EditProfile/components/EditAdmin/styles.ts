import styled from 'styled-components';

// --- Copy from AccountPage/styles.ts ---
export const AccountWrapper = styled.div`
  width: 100%;
  padding-bottom: 85px;
`;

export const AccountCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-bottom: 74px;
  padding-top: 6px;
`;

export const AccountName = styled.div<{ $paddingTop?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${({ $paddingTop }) => $paddingTop ?? '13px'};
  padding-bottom: 16px;
  border-bottom: 1px solid #b7b7b9;
  & img {
    width: 134px;
    height: 134px;
    border-radius: 50%;
    object-fit: cover;
  }
  & h3 {
    padding-top: 8px;
    font-size: 18px;
    font-weight: 700;
  }
  & button {
    display: flex;
    gap: 8px;
    height: 32px;
    padding: 0px 32px;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 400;
  }
`;
// --- / Copy from AccountPage/styles.ts ---
