import styled from 'styled-components';
import { Icon } from '@/kit';

export const StyledReviewCard = styled.div`
  width: 100%;
`;

export const StyledReview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => `${theme.pxs.x4}px`};
  background: ${({ theme }) => theme.color.inputBar};
  padding: ${({ theme }) => `${theme.pxs.x3}px ${theme.pxs.x6}px`};
  gap: ${({ theme }) => `${theme.pxs.x8}px`};
  border-radius: ${({ theme }) => `${theme.pxs.x1_5}px`};
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: ${({ theme }) => `${theme.pxs.x0_5}px`};
  width: auto;

  span {
    font-size: 14px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => `${theme.pxs.x0_5}px`};
`;

export const StyledIcon = styled(Icon)`
  top: 10px;
  left: 10px;
`;

export const SpanLabel = styled.span``;

export const SpanCounts = styled.span``;
