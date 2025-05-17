import StyledHr from '@/components/StyledHr/StyledHr';
import { Button } from '@/kit';
import styled from 'styled-components';

export const Backdrop = styled.div(({ theme }) => ({
  position: 'fixed',
  top: theme.pxs.x0,
  left: theme.pxs.x0,
  right: theme.pxs.x0,
  bottom: theme.pxs.x0,
  backgroundColor: theme.color.background,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1200',
}));

export const ModalContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.color.background,
  padding: theme.pxs.x2_5,
  paddingTop: theme.pxs.x0,
  width: '400px',
  maxWidth: '100%',
  maxHeight: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}));
export const ModalHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  paddingTop: theme.pxs.x2,
  marginBottom: theme.pxs.x5,
}));
export const CloseButton = styled.button(({ theme }) => ({
  position: 'absolute',
  left: theme.pxs.x0,
}));

export const StyleStyledHr = styled(StyledHr)(({ theme }) => ({
  marginBottom: theme.pxs.x8,
}));
export const ModalContent = styled.div({});
export const ModalFooter = styled.div({
  display: 'flex',
  justifyContent: 'center',
});
export const StyledButton = styled(Button)(({ theme }) => ({
  padding: `${theme.pxs.x2}px 0px`,
  width: '100%',
  p: { ...theme.fonts.secondManrope },
}));
