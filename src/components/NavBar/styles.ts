import { fonts } from '@/theme/fonts';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Box = styled.div(({ theme }) => ({}));
export const NavBox = styled.div(({ theme }) => ({
  position: 'fixed',
  zIndex: 501,
  bottom: theme.pxs.x0,
  left: theme.pxs.x0,
  width: '100%',
}));
export const Nav = styled.nav(({ theme }) => ({
  backgroundColor: theme.color.inputBar,
  borderRadius: '8px 8px 0 0',
  margin: '0 auto',
  maxWidth: '375px',
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
export const Descr = styled.p(({ theme }) => ({
  ...fonts.smallText,
  lineHeight: `${theme.pxs.x3_5}px`,
}));
export const StyledBtnLink = styled.button({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
