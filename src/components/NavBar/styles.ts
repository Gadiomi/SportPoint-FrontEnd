import { fonts } from '@/theme/fonts';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Box = styled.div(({ theme }) => ({}));
export const Nav = styled.nav(({ theme }) => ({
  position: 'fixed',
  bottom: theme.pxs.x0,
  left: theme.pxs.x0,
  width: '100%',
  backgroundColor: theme.color.background,
  boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
  zIndex: '50',
}));
export const NavList = styled.ul(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.pxs.x2,
  gap: theme.pxs.x3,
  width: '100%',
}));
export const NavItem = styled.li(({ theme }) => ({
  color: theme.color.mainOrange,
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
export const Descr = styled.li(({ theme }) => ({
  // export const Descr = styled.p(({ theme }) => ({
  ...fonts.smallText,
  lineHeight: `${theme.pxs.x3_5}px`,
}));
