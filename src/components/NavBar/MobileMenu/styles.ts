import styled from 'styled-components';

interface MenuWrapperProps {
  $isOpen: boolean;
}

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 199;
`;

export const MenuWrapper = styled.div<MenuWrapperProps>(({ $isOpen }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  transform: $isOpen ? 'translateY(0)' : 'translateY(100%)',
  transition: 'transform 0.3s ease-in-out',
  maxWidth: '375px',
  margin: '0 auto',
  zIndex: 200,
  marginBottom: '54px',
}));

export const MenuContent = styled.div(({ theme }) => ({
  boxShadow: '0 0 10px 0 rgba(43, 54, 149, 0.9)',
  border: `1px solid ${theme.color.darkGray}`,
  borderBottom: 'none',
  background: theme.color.background,
  padding: theme.pxs.x5,
  borderTopLeftRadius: theme.pxs.x4,
  borderTopRightRadius: theme.pxs.x4,
}));

export const MenuList = styled.ul(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x2,
  marginBottom: theme.pxs.x6,
}));

export const MenuItem = styled.li(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.pxs.x2_5,
  color: theme.color.white,
  border: `0.50px solid ${theme.color.mainOrange}`,
  borderRadius: theme.pxs.x1_5,
  padding: `${theme.pxs.x1}px ${theme.pxs.x2}px`,
}));
export const Descr = styled.p(({ theme }) => ({
  ...theme.fonts.aboutText,
}));
