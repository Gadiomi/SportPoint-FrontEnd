import { Button } from '@/kit';
import styled from 'styled-components';

export const AccountButton = styled(Button)`
  width: 100%;
  height: 40px;
  & p {
    flex-grow: 1;
    text-align: left;
    line-height: 24px;
  }
`;
