import styled from 'styled-components';

export const ModalContent = styled.div(({ theme }) => ({
  boxShadow: '0 0 10px 0 rgba(43, 54, 149, 0.9)',
  border: `1px solid ${theme.color.darkGray}`,
  borderBottom: 'none',
  background: theme.color.background,
  padding: theme.pxs.x5,
  borderTopLeftRadius: theme.pxs.x4,
  borderTopRightRadius: theme.pxs.x4,
}));
export const CustomLabel = styled.span(({ theme }) => ({
  color: theme.color.white,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}));

export const LabelHistory = styled.div(({ theme }) => ({
  display: 'flex',
  marginTop: theme.pxs.x6,
  justifyContent: 'space-between',
  marginBottom: theme.pxs.x6,
}));

export const History = styled.p(({ theme }) => ({
  ...theme.fonts.mainButton,
  color: theme.color.disabled,
}));

export const Rubbish = styled.button(({ theme }) => ({}));

export const HistoryBox = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.pxs.x2,
  flexWrap: 'wrap',
  marginBottom: theme.pxs.x12,
}));

export const NameHistory = styled.p(({ theme }) => ({
  cursor: 'pointer',
  padding: `${theme.pxs.x2}px ${theme.pxs.x4}px`,
  color: theme.color.disabled,
  width: 'auto',
  backgroundColor: theme.color.darkGray,
  borderRadius: '60px',
}));
