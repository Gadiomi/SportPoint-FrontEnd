import styled from 'styled-components';
import { Button } from '@/kit';

export const StyledProfileCard = styled.div`
  margin-bottom: ${({ theme }) => `${theme.pxs.x4}px`};
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: ${({ theme }) => `${theme.pxs.x10}px`};
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
  padding-left: ${({ theme }) => `${theme.pxs.x2_5}px`};
  padding-right: ${({ theme }) => `${theme.pxs.x6_5}px`};
`;

export const StyledReviewCard = styled.hr`
  width: 100%;
  position: relative;
  margin-top: ${({ theme }) => `${theme.pxs.x4}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;
