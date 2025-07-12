import { Box } from '@/components/NavBar/styles';
import styled from 'styled-components';
interface Props {
  $active?: boolean;
}

export const UserChatBox = styled.div<Props>(({ theme, $active }) => ({
  display: 'flex',
  maxHeight: '80px',
  gap: theme.pxs.x2,
  padding: theme.pxs.x2,
  borderRadius: theme.pxs.x1_5,
  cursor: 'pointer',
  alignItems: 'center',
  backgroundColor: $active ? theme.color.inputBar : 'transparent',
  boxShadow: $active ? '0 0 10px 0 rgba(43, 54, 149, 0.9);' : 'none',
}));
export const BoxName = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x2,
  justifyContent: 'center',
}));
export const Avatar = styled.img(({ theme }) => ({
  width: theme.pxs.x12,
  height: theme.pxs.x12,
  borderRadius: '50%',
}));
export const UserName = styled.h2(({ theme }) => ({
  ...theme.fonts.mainManrope,
}));
export const UserMessage = styled.p(({ theme }) => ({
  ...theme.fonts.popUp,
  lineHeight: `${theme.pxs.x4}px`,
  color: theme.color.disabled,
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));
export const TrashIconWrapper = styled.div(({ theme }) => ({
  minWidth: '48px',
  maxWidth: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { stroke: theme.color.mainOrange, color: theme.color.mainOrange },
}));
