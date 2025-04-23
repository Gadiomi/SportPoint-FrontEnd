import { Button, Medium } from '@/kit';
import { fonts } from '@/theme/fonts';
import styled from 'styled-components';

export const StyledTrainersList = styled.ul(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x4,
  width: '100%',
  marginTop: theme.pxs.x4,
}));

export const StyledButtonBack = styled(Button).attrs(({ theme }) => ({
  textStyle: {
    ...fonts.mainTitle,
    fontWeight: '600',
    color: theme.color.white,
    textTransform: 'uppercase',
  },
  style: {
    textDecoration: 'none',
    width: '100%',
    padding: ` ${theme.pxs.x5}px ${theme.pxs.x3}px`,
    backgroundColor: theme.color.mainBlue,
    justifyContent: 'space-between',
    marginBottom: theme.pxs.x4,
  },
}))({});
export const Loading = styled(Medium)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  padding: `${theme.pxs.x12}px 0px`,
}));
