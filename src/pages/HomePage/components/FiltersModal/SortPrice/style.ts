import StyledHr from '@/components/StyledHr/StyledHr';

import styled from 'styled-components';

export const PriceFilterWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.pxs.x3,
}));
export const InputWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
export const Label = styled.label(({ theme }) => ({
  ...theme.fonts.smallText,
  marginBottom: theme.pxs.x0_5,
  color: theme.color.disabled,
}));
export const InputContainer = styled.div(({ theme }) => ({
  position: 'relative',
}));

export const StyledInput = styled.input(({ theme }) => ({
  ...theme.fonts.mainButton,
  color: theme.color.white,
  width: '100%',
  background: theme.color.background,
  appearance: 'textfield',
  padding: `${theme.pxs.x2}px ${theme.pxs.x4}px`,
  border: `1px solid ${theme.color.mainBlue}`,
  borderRadius: theme.pxs.x1_5,
  paddingRight: theme.pxs.x7_5,
  outline: 'none',
  transition: 'border-color 0.3s',

  '&:focus': {
    borderColor: theme.color.mainBlue,
  },
}));
export const Currency = styled.span(({ theme }) => ({
  ...theme.fonts.mainButton,
  position: 'absolute',
  right: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: theme.color.disabled,
  pointerEvents: 'none',
}));
export const StyleStyledHr = styled(StyledHr)(({ theme }) => ({
  marginTop: theme.pxs.x8,
  marginBottom: theme.pxs.x8,
}));
export const ErrorText = styled.p(({ theme }) => ({
  ...theme.fonts.mainButton,
  color: 'red',
  marginTop: '8px',
}));
