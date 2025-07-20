import styled from 'styled-components';

export const ComplaintModalBox = styled.div(({ theme }) => ({
  marginTop: theme.pxs.x8,
}));
export const BackBox = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.pxs.x1,
  marginBottom: theme.pxs.x4,
}));
export const BackTitle = styled.h2(({ theme }) => ({
  ...theme.fonts.mainTitle,
}));
export const ButtonBack = styled.button(({ theme }) => ({}));
export const ComplaintTitle = styled.h3(({ theme }) => ({
  backgroundColor: theme.color.background,
}));
export const RadioWrapper = styled.label(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
  gap: '8px',
  cursor: 'pointer',
}));
export const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  z-index: -1;
`;
export const CustomRadio = styled.span<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.color.mainOrange};
  border-radius: 50%;
  background-color: ${({ checked, theme }) =>
    checked ? theme.color.mainOrange : 'transparent'};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    display: ${({ checked }) => (checked ? 'block' : 'none')};
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  resize: none;
  margin-top: 12px;
  height: 80px;
  border: 1px solid #ccc;
`;
