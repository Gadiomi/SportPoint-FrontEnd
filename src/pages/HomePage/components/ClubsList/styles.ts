import styled from 'styled-components';

export const StyledClubsList = styled.ul(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x4,

  width: '100%',
}));
