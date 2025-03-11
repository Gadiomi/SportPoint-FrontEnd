import React from 'react';
import styled from 'styled-components';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  placeholder?: string;
  containerStyles?: React.CSSProperties;
  textAreaStyles?: React.CSSProperties;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  containerStyles,
  textAreaStyles,
  disabled,
  ...rest
}: Props) {
  return (
    <TextAreaContainer style={containerStyles}>
      <StyledTextArea
        style={textAreaStyles}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        value={value}
        {...rest}
      />
    </TextAreaContainer>
  );
}
const TextAreaContainer = styled.div(({ theme }) => ({
  marginTop: '30px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '296px',
  height: '125px',
  background: theme.color.background,
  border: `1px solid ${theme.color.secWhite}`,
  borderRadius: '6px',
  padding: theme.pxs.x2,

  [theme.mediaRules.up(768)]: {},
  [theme.mediaRules.up(1440)]: {},
}));

const StyledTextArea = styled.textarea(({ theme }) => ({
  all: 'unset',
  width: '100%',
  height: '100%',
  resize: 'none',
  overflow: 'auto',
  color: theme.color.white,
  background: theme.color.background,
  boxSizing: 'border-box',
  wordWrap: 'break-word',
  '::placeholder': {
    color: theme.color.secWhite,
  },
  '::-webkit-scrollbar': {
    width: '6px',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.color.secWhite,
    borderRadius: '4px',
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: theme.color.white,
  },
  scrollbarColor: `${theme.color.secWhite} transparent`,
}));
