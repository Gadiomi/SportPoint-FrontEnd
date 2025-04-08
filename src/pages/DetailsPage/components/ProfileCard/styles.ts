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
`;
