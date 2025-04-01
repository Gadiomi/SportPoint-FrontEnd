import styled from 'styled-components';
import { Icon } from '@/kit';
import { Button } from '@/kit';

export const StyledReviewsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.inputBar};
  padding: ${({ theme }) => `${theme.pxs.x3}px ${theme.pxs.x4}px`};
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
  border-radius: ${({ theme }) => `${theme.pxs.x1_5}px`};
  box-shadow: 0 0 10px rgba(43, 54, 149, 0.9);
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
`;

export const ReviewsBoxContainer = styled.div`
  width: 100%;
`;

export const ReviewsBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
`;

export const ReviewsBoxBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  gap: ${({ theme }) => `${theme.pxs.x2}px`};
`;

export const Avatar = styled.img`
  width: ${({ theme }) => `${theme.pxs.x8}px`};
  height: ${({ theme }) => `${theme.pxs.x8}px`};
  border-radius: 50%;
  margin-bottom: ${({ theme }) => `${theme.pxs.x2_5}px`};
  object-fit: cover;
`;

export const StyledIcon = styled(Icon)`
  top: ${({ theme }) => `${theme.pxs.x2_5}px`};
  left: ${({ theme }) => `${theme.pxs.x2_5}px`};
`;

export const Name = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: ${({ theme }) => `${theme.pxs.x10}px`};
  display: flex;
  position: relative;
  flex-direction: row;
  gap: ${({ theme }) => `${theme.pxs.x2_5}px`};
`;
