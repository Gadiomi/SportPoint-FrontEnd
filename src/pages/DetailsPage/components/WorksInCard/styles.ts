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

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
`;

export const WorksInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.inputBar};
  padding: ${({ theme }) => `${theme.pxs.x2}px`};
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
  border-radius: ${({ theme }) => `${theme.pxs.x1_5}px`};
  box-shadow: 0 0 10px rgba(43, 54, 149, 0.9);
`;

export const Name = styled.div`
  width: 100%;
`;

export const Description = styled.div`
  width: 100%;
`;

export const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: auto;
`;

export const StyledIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`;
export const SpanWorkIn = styled.span`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: ${({ theme }) => `${theme.pxs.x10}px`};
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 20px;
`;
