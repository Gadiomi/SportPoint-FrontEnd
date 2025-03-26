import { StyledHr } from '@/pages/DetailsPage/CoachPage/styles';
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
}));

export const ModalContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.color.background,
  padding: theme.pxs.x2_5,
  paddingTop: theme.pxs.x10,
  width: '400px',
  maxWidth: '100%',
  height: '100vh',
}));
export const ModalHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginBottom: theme.pxs.x5,
}));
export const CloseButton = styled.button(({ theme }) => ({
  position: 'absolute',
  left: theme.pxs.x0,
}));

export const StyleStyledHr = styled(StyledHr)(({ theme }) => ({
  marginBottom: theme.pxs.x8,
}));
export const ModalContent = styled.div(({ theme }) => ({}));
export const ModalFooter = styled.div(({ theme }) => ({}));
