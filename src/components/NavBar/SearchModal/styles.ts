import styled from 'styled-components';

export const ModalContent = styled.div(({ theme }) => ({
  border: `1px solid ${theme.color.darkGray}`,
  borderBottom: 'none',
  background: theme.color.background,
  padding: theme.pxs.x5,
  borderTopLeftRadius: theme.pxs.x4,
  borderTopRightRadius: theme.pxs.x4,
}));
export const Input = styled.input(({ theme }) => ({
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '16px',
}));
