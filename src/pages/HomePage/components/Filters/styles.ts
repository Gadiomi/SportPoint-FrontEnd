import { Button } from '@/kit';
import styled from 'styled-components';

export const StyledButton = styled(Button).attrs(({ theme }) => ({
  textStyle: {
    fontSize: theme.pxs.x3_5,
    lineHeight: '20px',
    fontWeight: '400px',
    marginRight: theme.pxs.x2,

    color: theme.color.white,
  },
}))({});
