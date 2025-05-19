import React from 'react';
import styled, { CSSObject } from 'styled-components';

import { ButtonAppearance } from './constants';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  appendChild?: React.ReactNode;
  prependChild?: React.ReactNode;
  testId: string;
  textStyle?: React.CSSProperties;
  appearance?: ButtonAppearance;
  styles?: CSSObject;
}

export function Button({
  title,
  appendChild,
  prependChild,
  disabled,
  type = 'button',
  testId,
  textStyle,
  styles,
  appearance = ButtonAppearance.PRIMARY,
  ...rest
}: Props) {
  return (
    <ButtonStyled
      data-test-id={testId}
      disabled={disabled}
      type={type}
      appearance={appearance}
      $styles={styles}
      {...rest}
    >
      {prependChild && prependChild}
      <p style={{ color: 'inherit', ...textStyle }}>{title}</p>
      {appendChild && appendChild}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button<{
  disabled?: boolean;
  appearance: ButtonAppearance;
  $styles?: React.CSSProperties;
}>(({ theme, appearance, $styles }) => {
  const backgroundColor = {
    [ButtonAppearance.PRIMARY]: theme.color.mainOrange,
    [ButtonAppearance.UNDERLINED]: 'transparent',
    [ButtonAppearance.SECONDARY]: theme.color.background,
    [ButtonAppearance.BORDER]: 'transparent',
  };
  const color = {
    [ButtonAppearance.PRIMARY]: theme.color.mainWhite,
    [ButtonAppearance.UNDERLINED]: theme.color.mainOrange,
    [ButtonAppearance.SECONDARY]: theme.color.mainWhite,
    [ButtonAppearance.BORDER]: '#F8F7F4',
  };

  const textDecoration = {
    [ButtonAppearance.PRIMARY]: 'none',
    [ButtonAppearance.UNDERLINED]: 'underline',
    [ButtonAppearance.SECONDARY]: 'none',
    [ButtonAppearance.BORDER]: 'none',
  };

  const border = {
    [ButtonAppearance.PRIMARY]: '0.5px solid transparent',
    [ButtonAppearance.UNDERLINED]: '0.5px solid transparent',
    [ButtonAppearance.SECONDARY]: `0.5px solid ${theme.color.darkGray}`,
    [ButtonAppearance.BORDER]: '1px solid rgba(237, 119, 47, 1)',
  };

  const colorHover = {
    [ButtonAppearance.PRIMARY]: theme.color.mainWhite,
    [ButtonAppearance.UNDERLINED]: 'rgba(189, 81, 14, 1)',
    [ButtonAppearance.SECONDARY]: theme.color.mainWhite,
    [ButtonAppearance.BORDER]: ' rgba(237, 119, 47, 1)',
  };

  const backgroundHover = {
    [ButtonAppearance.PRIMARY]: 'rgba(189, 81, 14, 1)',
    [ButtonAppearance.UNDERLINED]: 'transparent',
    [ButtonAppearance.SECONDARY]: theme.color.mainOrange,
    [ButtonAppearance.BORDER]: 'transparent',
  };

  const borderHover = {
    [ButtonAppearance.PRIMARY]: '0.5px solid transparent',
    [ButtonAppearance.UNDERLINED]: '0.5px solid transparent',
    [ButtonAppearance.SECONDARY]: '0.5px solid transparent',
    [ButtonAppearance.BORDER]: '1px solid rgba(237, 119, 47, 1)',
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
      backgroundColor: theme.color.disabled,
      color: theme.color.background,
    },
    ...$styles,
  };
});
