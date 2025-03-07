import React from 'react';
import styled from 'styled-components';

import { ButtonAppearance } from './constants';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  appendChild?: React.ReactNode;
  prependChild?: React.ReactNode;
  testId: string;
  textStyle?: React.CSSProperties;
  appearance?: ButtonAppearance;
}

export function Button({
  title,
  appendChild,
  prependChild,
  disabled,
  type = 'button',
  testId,
  textStyle,
  appearance = ButtonAppearance.PRIMARY,
  ...rest
}: Props) {
  return (
    <ButtonStyled
      data-test-id={testId}
      disabled={disabled}
      type={type}
      appearance={appearance}
      {...rest}
    >
      {prependChild && prependChild}
      <p style={{ color: 'inherit', ...textStyle }}>{title}</p>
      {appendChild && appendChild}
    </ButtonStyled>
  );
}

// TODO: use theme parameters for the component instead of example values
const ButtonStyled = styled.button<{
  disabled?: boolean;
  appearance: ButtonAppearance;
}>(({ theme, appearance }) => {
  const backgroundColor = {
    [ButtonAppearance.PRIMARY]: 'rgba(237, 119, 47, 1)',
    [ButtonAppearance.UNDERLINED]: 'transparent',
    [ButtonAppearance.SECONDARY]: 'rgba(28, 27, 32, 1)',
  };
  const color = {
    [ButtonAppearance.PRIMARY]: 'rgba(248, 247, 244, 1)',
    [ButtonAppearance.UNDERLINED]: 'rgba(237, 119, 47, 1)',
    [ButtonAppearance.SECONDARY]: 'rgba(248, 247, 244, 1)',
  };

  const textDecoration = {
    [ButtonAppearance.PRIMARY]: 'none',
    [ButtonAppearance.UNDERLINED]: 'underline',
    [ButtonAppearance.SECONDARY]: 'none',
  };

  const border = {
    [ButtonAppearance.PRIMARY]: '1px solid transparent',
    [ButtonAppearance.UNDERLINED]: '1px solid transparent',
    [ButtonAppearance.SECONDARY]: '1px solid rgba(73, 73, 73, 1)',
  };

  const colorHover = {
    [ButtonAppearance.PRIMARY]: 'rgba(248, 247, 244, 1)',
    [ButtonAppearance.UNDERLINED]: 'rgba(189, 81, 14, 1)',
    [ButtonAppearance.SECONDARY]: 'rgba(248, 247, 244, 1)',
  };

  const backgroundHover = {
    [ButtonAppearance.PRIMARY]: 'rgba(189, 81, 14, 1)',
    [ButtonAppearance.UNDERLINED]: 'transparent',
    [ButtonAppearance.SECONDARY]: 'rgba(237, 119, 47, 1)',
  };

  const borderHover = {
    [ButtonAppearance.PRIMARY]: '1px solid transparent',
    [ButtonAppearance.UNDERLINED]: '1px solid transparent',
    [ButtonAppearance.SECONDARY]: '1px solid transparent',
  };

  const transitionElements = ['background-color', 'color'];

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.pxs.x1}px ${theme.pxs.x2}px`,
    backgroundColor: backgroundColor[appearance],
    color: color[appearance],
    textDecoration: textDecoration[appearance],
    border: border[appearance],
    borderRadius: '6px',
    transition: transitionElements
      .map(prop => `${prop} ${theme.transitions.base}`)
      .join(', '),

    ['&:hover,&:focus']: {
      color: colorHover[appearance],
      backgroundColor: backgroundHover[appearance],
      border: borderHover[appearance],
    },

    ['&:disabled']: {
      cursor: 'auto',
      backgroundColor: 'rgba(183, 183, 185, 1)',
      color: 'rgba(28, 27, 32, 1)',
    },
  };
});
