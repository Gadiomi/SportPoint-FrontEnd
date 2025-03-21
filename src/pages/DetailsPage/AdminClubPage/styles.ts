import styled from 'styled-components';
import { Button } from '@/kit';

export const StyledProfileCard = styled.div`
  margin-bottom: 16px;
`;

export const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.secWhite};
  margin-top: ${({ theme }) => `${theme.pxs.x0}px`};
  margin-bottom: ${({ theme }) => `${theme.pxs.x6}px`};
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: ${({ theme }) => `${theme.pxs.x10}px`};
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 20px;
  margin-bottom: ${({ theme }) => `${theme.pxs.x8}px`};
`;
