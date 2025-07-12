import { Button } from '@/kit';
import {
  Backdrop,
  ModalContainer,
} from '@/pages/HomePage/components/FiltersModal/styles';
import styled from 'styled-components';

export const BackdropSetting = styled(Backdrop)(({ theme }) => ({
  alignItems: 'flex-start',
}));

export const ModalContainerSetting = styled(ModalContainer)(({ theme }) => ({
  padding: theme.pxs.x4,
  paddingTop: '82px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x4,
  backgroundColor: theme.color.inputBar,
  borderBottomLeftRadius: theme.pxs.x1_5,
  borderBottomRightRadius: theme.pxs.x1_5,
  boxShadow: '0 8px 10px -5px rgba(43, 54, 149, 0.6)',
  borderBottom: `1px solid ${theme.color.mainBlue}`,
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  padding: `${theme.pxs.x2}px ${theme.pxs.x2_5}px`,
  gap: theme.pxs.x2,
}));
