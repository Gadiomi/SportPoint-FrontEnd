import React from 'react';
import { IconName } from './constants';

export interface IconProps {
  name: IconName;
  color?: string;
  width?: string;
  height?: string;
  size?: string | number;
}

export const Icon = React.memo(
  ({
    name,
    color = 'black',
    height = '30px',
    width = '30px',
    size,
  }: IconProps) => {
    const iconLink = `/assets/svg/symbol-defs.svg#${name}`;

    return (
      <svg height={size || height} width={size || width} color={color}>
        {React.createElement('use', {
          href: iconLink,
          xlinkHref: iconLink,
        })}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';
