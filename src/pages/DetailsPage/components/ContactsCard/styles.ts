import styled from 'styled-components';

export const StyledContactsCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.mainTitle};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;

export const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => `${theme.pxs.x8}px`};
`;
