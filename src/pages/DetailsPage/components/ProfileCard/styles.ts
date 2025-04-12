import styled from 'styled-components';

export const StyledProfileCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
`;

export const Avatar = styled.img`
  width: 134px;
  height: 134px;
  border-radius: 50%;
  margin-bottom: 12px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const AvatarNone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 134px;
  height: 134px;
  border-radius: 50%;
  margin-bottom: ${({ theme }) => `${theme.pxs.x3}px`};
  background-color: ${({ theme }) => `${theme.color.mainOrange}`};
  font-size: 64px;
  color: ${({ theme }) => `${theme.color.mainWhite}`};
  font-weight: bold;
  flex-shrink: 0;
`;

export const Sport = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SportEl = styled.div`
  width: auto;
  display: flex;
  border-radius: 20px;
  border: 1px solid rgba(41, 68, 135, 1);
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 6px 12px;
`;
