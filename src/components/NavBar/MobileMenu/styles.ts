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
  '&:hover': {
    backgroundColor: theme.color.mainOrange,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
}));
export const Descr = styled.p(({ theme }) => ({
  ...theme.fonts.aboutText,
}));
export const ButtonBox = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.pxs.x4,
  paddingTop: theme.pxs.x8,
}));
export const Question = styled.h3(({ theme }) => ({
  ...theme.fonts.secondManrope,
  textAlign: 'center',
}));

export const LangButton = styled.button(({ theme }) => ({
  ...theme.fonts.mainButton,
  color: theme.color.white,
  borderRadius: theme.pxs.x3,
  border: `${theme.pxs.x0_5}px solid ${theme.color.mainOrange}`,
  padding: theme.pxs.x2,
  width: theme.pxs.x11,
  '&:hover': {
    backgroundColor: theme.color.mainOrange,
    color: theme.color.white,

    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
}));
