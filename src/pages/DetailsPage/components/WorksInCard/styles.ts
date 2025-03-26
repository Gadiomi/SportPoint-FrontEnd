import styled from 'styled-components';
import { Icon } from '@/kit';

import { Button } from '@/kit';

export const StyledWorksInCard = styled.div`
  width: 100%;
`;

export const WorksInContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.mainTitle};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
`;

export const WorksInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.pxs.x0_5}px`};
  justify-content: space-between;
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
  background: ${({ theme }) => theme.color.inputBar};
  padding: ${({ theme }) => `${theme.pxs.x2}px`};
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
  border-radius: ${({ theme }) => `${theme.pxs.x1_5}px`};
`;

export const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: auto;
`;

export const StyledIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  // fill: none;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: ${({ theme }) => `${theme.pxs.x10}px`};
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 20px;
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.color.white};
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
  &:hover {
    color: ${({ theme }) => theme.color.mainOrange};
  }
`;
