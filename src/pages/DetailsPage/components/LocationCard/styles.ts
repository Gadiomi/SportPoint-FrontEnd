import styled from 'styled-components';

export const StyledLocationCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => `${theme.pxs.x2}px`};
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

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
`;

export const StyledImage = styled.img`
  border-radius: ${({ theme }) => `${theme.pxs.x1_5}px`};
  width: 225px;
  height: 256px;
`;
