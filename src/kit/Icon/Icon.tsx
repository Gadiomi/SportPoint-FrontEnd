import React from 'react';
import { IconName } from './constants';
import styled, { CSSObject } from 'styled-components';
export interface IconProps {
  name: IconName;
  width?: string;
  height?: string;
  size?: string | number;
  styles?: CSSObject;
}

export const Icon = React.memo(
  ({ name, height = '24px', width = '24px', size, styles }: IconProps) => {
    const iconLink = `/assets/svg/symbol-defs.svg#${name}`;

    return (
      <StyledIcon style={styles} height={size || height} width={size || width}>
        {React.createElement('use', {
          href: iconLink,
          xlinkHref: iconLink,
        })}
      </StyledIcon>
    );
  },
);

const StyledIcon = styled.svg(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.color.white,
  stroke: theme.color.white,
}));

Icon.displayName = 'Icon';
