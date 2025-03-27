import styled from 'styled-components';
import { Button } from '@/kit';

export const StyledHrButton = styled.div`
  width: 100%;
  height: 52px;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 76px;
  margin-bottom: 80px;
`;

export const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.secWhite};
`;

export const StyledButton = styled(Button)`
  width: 52px;
  height: 52px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
